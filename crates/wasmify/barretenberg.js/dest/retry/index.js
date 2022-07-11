"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryUntil = exports.retry = exports.backoffGenerator = void 0;
const sleep_1 = require("../sleep");
const timer_1 = require("../timer");
function* backoffGenerator() {
    const v = [1, 1, 1, 2, 4, 8, 16, 32, 64];
    let i = 0;
    while (true) {
        yield v[Math.min(i++, v.length - 1)];
    }
}
exports.backoffGenerator = backoffGenerator;
async function retry(fn, name = "Operation", backoff = backoffGenerator()) {
    while (true) {
        try {
            return await fn();
        }
        catch (err) {
            const s = backoff.next().value;
            if (s === undefined) {
                throw err;
            }
            console.log(`${name} failed. Will retry in ${s}s...`);
            console.log(err);
            await (0, sleep_1.sleep)(s * 1000);
            continue;
        }
    }
}
exports.retry = retry;
// Call `fn` repeatedly until it returns true or timeout.
// Both `interval` and `timeout` are seconds.
// Will never timeout if the value is 0.
async function retryUntil(fn, name = "", timeout = 0, interval = 1) {
    const timer = new timer_1.Timer();
    while (true) {
        if (await fn()) {
            return;
        }
        await (0, sleep_1.sleep)(interval * 1000);
        if (timeout && timer.s() > timeout) {
            throw new Error(name ? `Timeout awaiting ${name}` : "Timeout");
        }
    }
}
exports.retryUntil = retryUntil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmV0cnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBQWlDO0FBQ2pDLG9DQUFpQztBQUVqQyxRQUFlLENBQUMsQ0FBQyxnQkFBZ0I7SUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLE9BQU8sSUFBSSxFQUFFO1FBQ1gsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEM7QUFDSCxDQUFDO0FBTkQsNENBTUM7QUFFTSxLQUFLLFVBQVUsS0FBSyxDQUN6QixFQUF5QixFQUN6QixJQUFJLEdBQUcsV0FBVyxFQUNsQixPQUFPLEdBQUcsZ0JBQWdCLEVBQUU7SUFFNUIsT0FBTyxJQUFJLEVBQUU7UUFDWCxJQUFJO1lBQ0YsT0FBTyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQ25CO1FBQUMsT0FBTyxHQUFRLEVBQUU7WUFDakIsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ25CLE1BQU0sR0FBRyxDQUFDO2FBQ1g7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSwwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sSUFBQSxhQUFLLEVBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3RCLFNBQVM7U0FDVjtLQUNGO0FBQ0gsQ0FBQztBQW5CRCxzQkFtQkM7QUFFRCx5REFBeUQ7QUFDekQsNkNBQTZDO0FBQzdDLHdDQUF3QztBQUNqQyxLQUFLLFVBQVUsVUFBVSxDQUM5QixFQUFvQyxFQUNwQyxJQUFJLEdBQUcsRUFBRSxFQUNULE9BQU8sR0FBRyxDQUFDLEVBQ1gsUUFBUSxHQUFHLENBQUM7SUFFWixNQUFNLEtBQUssR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO0lBQzFCLE9BQU8sSUFBSSxFQUFFO1FBQ1gsSUFBSSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ2QsT0FBTztTQUNSO1FBRUQsTUFBTSxJQUFBLGFBQUssRUFBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFN0IsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRTtZQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNoRTtLQUNGO0FBQ0gsQ0FBQztBQWxCRCxnQ0FrQkMifQ==