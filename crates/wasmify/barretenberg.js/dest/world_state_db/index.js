"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldStateDb = exports.RollupTreeId = void 0;
const fifo_1 = require("../fifo");
const fs_extra_1 = require("fs-extra");
const merkle_tree_1 = require("../merkle_tree");
const bigint_buffer_1 = require("../bigint_buffer");
const child_process_1 = require("child_process");
const promise_readable_1 = require("promise-readable");
const serialize_1 = require("../serialize");
var Command;
(function (Command) {
    Command[Command["GET"] = 0] = "GET";
    Command[Command["PUT"] = 1] = "PUT";
    Command[Command["COMMIT"] = 2] = "COMMIT";
    Command[Command["ROLLBACK"] = 3] = "ROLLBACK";
    Command[Command["GET_PATH"] = 4] = "GET_PATH";
    Command[Command["BATCH_PUT"] = 5] = "BATCH_PUT";
})(Command || (Command = {}));
var RollupTreeId;
(function (RollupTreeId) {
    RollupTreeId[RollupTreeId["DATA"] = 0] = "DATA";
    RollupTreeId[RollupTreeId["NULL"] = 1] = "NULL";
    RollupTreeId[RollupTreeId["ROOT"] = 2] = "ROOT";
    RollupTreeId[RollupTreeId["DEFI"] = 3] = "DEFI";
})(RollupTreeId = exports.RollupTreeId || (exports.RollupTreeId = {}));
class WorldStateDb {
    constructor(dbPath = "./data/world_state.db") {
        this.dbPath = dbPath;
        this.stdioQueue = new fifo_1.MemoryFifo();
        this.roots = [];
        this.sizes = [];
        this.binPath = "../barretenberg/build/bin/db_cli";
    }
    async start() {
        await this.launch();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.processStdioQueue();
    }
    stop() {
        this.stdioQueue.cancel();
        if (this.proc) {
            this.proc.kill("SIGINT");
        }
    }
    getRoot(treeId) {
        return this.roots[treeId];
    }
    getSize(treeId) {
        return this.sizes[treeId];
    }
    async getSubtreeRoot(treeId, index, depth) {
        const path = await this.getHashPath(treeId, index);
        const hashPair = path.data[depth];
        // figure out whether our root is the lhs or rhs of the hash pair
        const isLeft = (index >> BigInt(depth)) % BigInt(2) == BigInt(0);
        const subTreeRoot = hashPair[isLeft ? 0 : 1];
        return subTreeRoot;
    }
    get(treeId, index) {
        return new Promise((resolve) => this.stdioQueue.put(async () => resolve(await this.get_(treeId, index))));
    }
    async get_(treeId, index) {
        const buffer = Buffer.concat([
            Buffer.from([Command.GET, treeId]),
            (0, bigint_buffer_1.toBufferBE)(index, 32),
        ]);
        this.proc.stdin.write(buffer);
        const result = await this.stdout.read(32);
        return result;
    }
    getHashPath(treeId, index) {
        return new Promise((resolve) => this.stdioQueue.put(async () => resolve(await this.getHashPath_(treeId, index))));
    }
    async getHashPath_(treeId, index) {
        const buffer = Buffer.concat([
            Buffer.from([Command.GET_PATH, treeId]),
            (0, bigint_buffer_1.toBufferBE)(index, 32),
        ]);
        this.proc.stdin.write(buffer);
        const depth = (await this.stdout.read(4)).readUInt32BE(0);
        const result = await this.stdout.read(depth * 64);
        const path = new merkle_tree_1.HashPath();
        for (let i = 0; i < depth; ++i) {
            const lhs = result.slice(i * 64, i * 64 + 32);
            const rhs = result.slice(i * 64 + 32, i * 64 + 64);
            path.data.push([lhs, rhs]);
        }
        return path;
    }
    put(treeId, index, value) {
        if (value.length !== 32) {
            throw Error("Values must be 32 bytes.");
        }
        return new Promise((resolve) => this.stdioQueue.put(async () => resolve(await this.put_(treeId, index, value))));
    }
    async put_(treeId, index, value) {
        const buffer = Buffer.concat([
            Buffer.from([Command.PUT, treeId]),
            (0, bigint_buffer_1.toBufferBE)(index, 32),
            value,
        ]);
        this.proc.stdin.write(buffer);
        this.roots[treeId] = await this.stdout.read(32);
        if (index + BigInt(1) > this.sizes[treeId]) {
            this.sizes[treeId] = index + BigInt(1);
        }
        return this.roots[treeId];
    }
    batchPut(entries) {
        return new Promise((resolve) => this.stdioQueue.put(async () => resolve(await this.batchPut_(entries))));
    }
    async batchPut_(entries) {
        const bufs = entries.map((e) => Buffer.concat([Buffer.from([e.treeId]), (0, bigint_buffer_1.toBufferBE)(e.index, 32), e.value]));
        const buffer = Buffer.concat([
            Buffer.from([Command.BATCH_PUT]),
            (0, serialize_1.serializeBufferArrayToVector)(bufs),
        ]);
        this.proc.stdin.write(buffer);
        await this.readMetadata();
    }
    async commit() {
        await new Promise((resolve) => {
            this.stdioQueue.put(async () => {
                const buffer = Buffer.from([Command.COMMIT]);
                this.proc.stdin.write(buffer);
                await this.readMetadata();
                resolve();
            });
        });
    }
    async rollback() {
        await new Promise((resolve) => {
            this.stdioQueue.put(async () => {
                const buffer = Buffer.from([Command.ROLLBACK]);
                this.proc.stdin.write(buffer);
                await this.readMetadata();
                resolve();
            });
        });
    }
    destroy() {
        (0, child_process_1.execSync)(`${this.binPath} reset ${this.dbPath}`);
    }
    async launch() {
        await (0, fs_extra_1.mkdirp)("./data");
        const proc = (this.proc = (0, child_process_1.spawn)(this.binPath, [this.dbPath]));
        proc.stderr.on("data", () => { });
        proc.on("close", (code) => {
            this.proc = undefined;
            if (code) {
                console.log(`db_cli exited with unexpected code ${code}.`);
                // Should never happen, so process termination is the only sensible response.
                process.exit(1);
            }
        });
        proc.on("error", console.log);
        this.stdout = new promise_readable_1.PromiseReadable(this.proc.stdout);
        await this.readMetadata();
    }
    async readMetadata() {
        this.roots[0] = await this.stdout.read(32);
        this.roots[1] = await this.stdout.read(32);
        this.roots[2] = await this.stdout.read(32);
        this.roots[3] = await this.stdout.read(32);
        const dataSize = await this.stdout.read(32);
        const nullifierSize = await this.stdout.read(32);
        const rootSize = await this.stdout.read(32);
        const defiSize = await this.stdout.read(32);
        this.sizes[0] = (0, bigint_buffer_1.toBigIntBE)(dataSize);
        this.sizes[1] = (0, bigint_buffer_1.toBigIntBE)(nullifierSize);
        this.sizes[2] = (0, bigint_buffer_1.toBigIntBE)(rootSize);
        this.sizes[3] = (0, bigint_buffer_1.toBigIntBE)(defiSize);
    }
    async processStdioQueue() {
        while (true) {
            const fn = await this.stdioQueue.get();
            if (!fn) {
                break;
            }
            await fn();
        }
    }
}
exports.WorldStateDb = WorldStateDb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd29ybGRfc3RhdGVfZGIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBQXFDO0FBQ3JDLHVDQUFrQztBQUNsQyxnREFBMEM7QUFDMUMsb0RBQTBEO0FBQzFELGlEQUE4RDtBQUM5RCx1REFBbUQ7QUFDbkQsNENBQTREO0FBRTVELElBQUssT0FPSjtBQVBELFdBQUssT0FBTztJQUNWLG1DQUFHLENBQUE7SUFDSCxtQ0FBRyxDQUFBO0lBQ0gseUNBQU0sQ0FBQTtJQUNOLDZDQUFRLENBQUE7SUFDUiw2Q0FBUSxDQUFBO0lBQ1IsK0NBQVMsQ0FBQTtBQUNYLENBQUMsRUFQSSxPQUFPLEtBQVAsT0FBTyxRQU9YO0FBRUQsSUFBWSxZQUtYO0FBTEQsV0FBWSxZQUFZO0lBQ3RCLCtDQUFJLENBQUE7SUFDSiwrQ0FBSSxDQUFBO0lBQ0osK0NBQUksQ0FBQTtJQUNKLCtDQUFJLENBQUE7QUFDTixDQUFDLEVBTFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFLdkI7QUFRRCxNQUFhLFlBQVk7SUFRdkIsWUFBb0IsU0FBaUIsdUJBQXVCO1FBQXhDLFdBQU0sR0FBTixNQUFNLENBQWtDO1FBTHBELGVBQVUsR0FBRyxJQUFJLGlCQUFVLEVBQXVCLENBQUM7UUFDbkQsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUNyQixVQUFLLEdBQWEsRUFBRSxDQUFDO1FBQ3JCLFlBQU8sR0FBRyxrQ0FBa0MsQ0FBQztJQUVVLENBQUM7SUFFekQsS0FBSyxDQUFDLEtBQUs7UUFDaEIsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEIsbUVBQW1FO1FBQ25FLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxJQUFJ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