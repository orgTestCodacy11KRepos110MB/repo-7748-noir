"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldState = void 0;
const merkle_tree_1 = require("../merkle_tree");
const world_state_constants_1 = require("./world_state_constants");
const log_1 = require("../log");
const debug = (0, log_1.createDebugLogger)("bb:world_state");
class WorldState {
    constructor(db, pedersen) {
        this.db = db;
        this.pedersen = pedersen;
        this.subTreeDepth = 0;
    }
    async init(subTreeDepth) {
        const subTreeSize = 1 << subTreeDepth;
        this.subTreeDepth = subTreeDepth;
        const zeroNotes = Array(subTreeSize).fill(merkle_tree_1.MemoryMerkleTree.ZERO_ELEMENT);
        const subTree = await merkle_tree_1.MemoryMerkleTree.new(zeroNotes, this.pedersen);
        const treeSize = world_state_constants_1.WorldStateConstants.DATA_TREE_DEPTH - subTreeDepth;
        const subTreeRoot = subTree.getRoot();
        debug(`initialising data tree with depth ${treeSize} and zero element of ${subTreeRoot.toString("hex")}`);
        try {
            this.tree = await merkle_tree_1.MerkleTree.fromName(this.db, this.pedersen, "data", subTreeRoot);
        }
        catch (e) {
            this.tree = await merkle_tree_1.MerkleTree.new(this.db, this.pedersen, "data", treeSize, subTreeRoot);
        }
        this.logTreeStats();
    }
    // builds a hash path at index 0 for a 'zero' tree of the given depth
    buildZeroHashPath(depth = world_state_constants_1.WorldStateConstants.DATA_TREE_DEPTH) {
        let current = merkle_tree_1.MemoryMerkleTree.ZERO_ELEMENT;
        const bufs = [];
        for (let i = 0; i < depth; i++) {
            bufs.push([current, current]);
            current = this.pedersen.compress(current, current);
        }
        return new merkle_tree_1.HashPath(bufs);
    }
    convertNoteIndexToSubTreeIndex(noteIndex) {
        return noteIndex >> this.subTreeDepth;
    }
    async buildFullHashPath(noteIndex, immutableHashPath) {
        const noteSubTreeIndex = this.convertNoteIndexToSubTreeIndex(noteIndex);
        const mutablePath = await this.getHashPath(noteSubTreeIndex);
        const fullHashPath = new merkle_tree_1.HashPath(immutableHashPath.data.concat(mutablePath.data));
        return fullHashPath;
    }
    async insertElement(index, element) {
        const subRootIndex = this.convertNoteIndexToSubTreeIndex(index);
        await this.tree.updateElement(subRootIndex, element);
        this.logTreeStats();
    }
    async insertElements(startIndex, elements) {
        const subRootIndex = this.convertNoteIndexToSubTreeIndex(startIndex);
        await this.tree.updateElements(subRootIndex, elements);
        this.logTreeStats();
    }
    logTreeStats() {
        debug(`data size: ${this.tree.getSize()}`);
        debug(`data root: ${this.tree.getRoot().toString("hex")}`);
    }
    async syncFromDb() {
        await this.tree.syncFromDb();
    }
    async getHashPath(index) {
        return await this.tree.getHashPath(index);
    }
    getRoot() {
        return this.tree.getRoot();
    }
    getSize() {
        return this.tree.getSize();
    }
}
exports.WorldState = WorldState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ybGRfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd29ybGRfc3RhdGUvd29ybGRfc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBQXdFO0FBQ3hFLG1FQUE4RDtBQUc5RCxnQ0FBMkM7QUFFM0MsTUFBTSxLQUFLLEdBQUcsSUFBQSx1QkFBaUIsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRWxELE1BQWEsVUFBVTtJQUlyQixZQUFvQixFQUFXLEVBQVUsUUFBa0I7UUFBdkMsT0FBRSxHQUFGLEVBQUUsQ0FBUztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFGbkQsaUJBQVksR0FBRyxDQUFDLENBQUM7SUFFcUMsQ0FBQztJQUV4RCxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQW9CO1FBQ3BDLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBSSxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyw4QkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RSxNQUFNLE9BQU8sR0FBRyxNQUFNLDhCQUFnQixDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sUUFBUSxHQUFHLDJDQUFtQixDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUM7UUFDcEUsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RDLEtBQUssQ0FDSCxxQ0FBcUMsUUFBUSx3QkFBd0IsV0FBVyxDQUFDLFFBQVEsQ0FDdkYsS0FBSyxDQUNOLEVBQUUsQ0FDSixDQUFDO1FBQ0YsSUFBSTtZQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFFBQVEsQ0FDbkMsSUFBSSxDQUFDLEVBQUUsRUFDUCxJQUFJLENB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