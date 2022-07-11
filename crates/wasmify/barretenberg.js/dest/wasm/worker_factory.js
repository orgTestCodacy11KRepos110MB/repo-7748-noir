"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyWorker = exports.createWorker = void 0;
const threads_1 = require("threads");
const log_1 = require("../log");
async function createWorker(id, module, initial, timeout = 5 * 60 * 1000) {
    const debug = (0, log_1.createDebugLogger)(`bb:wasm${id ? ":" + id : ""}`);
    const thread = await (0, threads_1.spawn)(new threads_1.Worker("./worker.js"), {
        timeout,
    });
    thread.logs().subscribe(debug);
    await thread.init(module, initial);
    return thread;
}
exports.createWorker = createWorker;
async function destroyWorker(worker) {
    await threads_1.Thread.terminate(worker);
}
exports.destroyWorker = destroyWorker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd2FzbS93b3JrZXJfZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBZ0Q7QUFDaEQsZ0NBQTJDO0FBRXBDLEtBQUssVUFBVSxZQUFZLENBQ2hDLEVBQVcsRUFDWCxNQUEyQixFQUMzQixPQUFnQixFQUNoQixPQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJO0lBRXZCLE1BQU0sS0FBSyxHQUFHLElBQUEsdUJBQWlCLEVBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGVBQUssRUFBcUIsSUFBSSxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ3hFLE9BQU87S0FDUixDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkMsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQWJELG9DQWFDO0FBRU0sS0FBSyxVQUFVLGFBQWEsQ0FBQyxNQUEwQjtJQUM1RCxNQUFNLGdCQUFNLENBQUMsU0FBUyxDQUFDLE1BQWEsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFGRCxzQ0FFQyJ9