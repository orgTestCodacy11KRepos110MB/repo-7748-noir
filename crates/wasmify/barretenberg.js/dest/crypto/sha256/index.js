"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha256 = void 0;
class Sha256 {
    constructor(wasm) {
        this.wasm = wasm;
    }
    hash(data) {
        const mem = this.wasm.call("bbmalloc", data.length + 32);
        this.wasm.transferToHeap(data, mem);
        this.wasm.call("sha256__hash", mem, data.length, mem + data.length);
        const result = Buffer.from(this.wasm.sliceMemory(mem + data.length, mem + data.length + 32));
        this.wasm.call("bbfree", mem);
        return result;
    }
}
exports.Sha256 = Sha256;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL3NoYTI1Ni9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLE1BQU07SUFDakIsWUFBb0IsSUFBc0I7UUFBdEIsU0FBSSxHQUFKLElBQUksQ0FBa0I7SUFBRyxDQUFDO0lBRXZDLElBQUksQ0FBQyxJQUFZO1FBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxNQUFNLE1BQU0sR0FBVyxNQUFNLENBQUMsSUFBSSxDQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FDakUsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUFiRCx3QkFhQyJ9