"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerPool = void 0;
const log_1 = require("../log");
const worker_factory_1 = require("./worker_factory");
const debug = (0, log_1.createDebugLogger)("bb:worker_pool");
class WorkerPool {
    constructor() {
        this.workers = [];
    }
    static async new(barretenberg, poolSize) {
        const pool = new WorkerPool();
        await pool.init(barretenberg.module, poolSize);
        return pool;
    }
    async init(module, poolSize) {
        debug(`creating ${poolSize} workers...`);
        const start = new Date().getTime();
        this.workers = await Promise.all(Array(poolSize)
            .fill(0)
            .map((_, i) => (0, worker_factory_1.createWorker)(`${i}`, module, i === 0 ? 10000 : 256)));
        debug(`created workers: ${new Date().getTime() - start}ms`);
    }
    async destroy() {
        await Promise.all(this.workers.map(worker_factory_1.destroyWorker));
    }
}
exports.WorkerPool = WorkerPool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3Bvb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd2FzbS93b3JrZXJfcG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnQ0FBMkM7QUFHM0MscURBQStEO0FBRS9ELE1BQU0sS0FBSyxHQUFHLElBQUEsdUJBQWlCLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUVsRCxNQUFhLFVBQVU7SUFBdkI7UUFDUyxZQUFPLEdBQXlCLEVBQUUsQ0FBQztJQXNCNUMsQ0FBQztJQXBCQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUE4QixFQUFFLFFBQWdCO1FBQy9ELE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDOUIsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUEwQixFQUFFLFFBQWdCO1FBQzVELEtBQUssQ0FBQyxZQUFZLFFBQVEsYUFBYSxDQUFDLENBQUM7UUFDekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDOUIsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNaLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDUCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFBLDZCQUFZLEVBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUN0RSxDQUFDO1FBQ0YsS0FBSyxDQUFDLG9CQUFvQixJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBYSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0Y7QUF2QkQsZ0NBdUJDIn0=