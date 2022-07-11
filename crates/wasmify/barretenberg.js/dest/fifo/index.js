"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryFifo = void 0;
class MemoryFifo {
    constructor() {
        this.waiting = [];
        this.items = [];
        this.flushing = false;
    }
    length() {
        return this.items.length;
    }
    /**
     * Returns next item within the queue, or blocks until and item has been put into the queue.
     * If given a timeout, the promise will reject if no item is received after `timeout` seconds.
     * If the queue is flushing, `null` is returned.
     */
    get(timeout) {
        if (this.items.length) {
            return Promise.resolve(this.items.shift());
        }
        if (this.items.length === 0 && this.flushing) {
            return Promise.resolve(null);
        }
        return new Promise((resolve, reject) => {
            this.waiting.push(resolve);
            if (timeout) {
                setTimeout(() => {
                    const index = this.waiting.findIndex((r) => r === resolve);
                    if (index > -1) {
                        this.waiting.splice(index, 1);
                        const err = new Error("Timeout getting item from queue.");
                        reject(err);
                    }
                }, timeout * 1000);
            }
        });
    }
    /**
     * Put an item onto back of the queue.
     */
    put(item) {
        if (this.flushing) {
            return;
        }
        else if (this.waiting.length) {
            this.waiting.shift()(item);
        }
        else {
            this.items.push(item);
        }
    }
    /**
     * Once ended, no further items are added to queue. Consumers will consume remaining items within the queue.
     * The queue is not reusable after calling `end()`.
     */
    end() {
        this.flushing = true;
        this.waiting.forEach((resolve) => resolve(null));
    }
    /**
     * Once cancelled, all items are discarded from the queue.
     * The queue is not reusable after calling `cancel()`.
     */
    cancel() {
        this.flushing = true;
        this.items = [];
        this.waiting.forEach((resolve) => resolve(null));
    }
    /**
     * Helper method that can be used to continously consume and process items on the queue.
     */
    async process(handler) {
        try {
            while (true) {
                const item = await this.get();
                if (item === null) {
                    break;
                }
                await handler(item);
            }
        }
        catch (err) {
            // tslint:disable:no-console
            console.error("Queue handler exception:", err);
        }
    }
}
exports.MemoryFifo = MemoryFifo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmlmby9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLFVBQVU7SUFBdkI7UUFDVSxZQUFPLEdBQWlDLEVBQUUsQ0FBQztRQUMzQyxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFxRjNCLENBQUM7SUFuRlEsTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxHQUFHLENBQUMsT0FBZ0I7UUFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNyQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUcsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM1QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUI7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTNCLElBQUksT0FBTyxFQUFFO2dCQUNYLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO3dCQUMxRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2I7Z0JBQ0gsQ0FBQyxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQzthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksR0FBRyxDQUFDLElBQU87UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjthQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksR0FBRztRQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQW1DO1FBQ3RELElBQUk7WUFDRixPQUFPLElBQUksRUFBRTtnQkFDWCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO29CQUNqQixNQUFNO2lCQUNQO2dCQUNELE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JCO1NBQ0Y7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLDRCQUE0QjtZQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztDQUNGO0FBeEZELGdDQXdGQyJ9