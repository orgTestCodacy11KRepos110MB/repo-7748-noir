"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grumpkin = void 0;
class Grumpkin {
    constructor(wasm) {
        this.wasm = wasm;
    }
    mul(point, scalar) {
        this.wasm.transferToHeap(point, 0);
        this.wasm.transferToHeap(scalar, 64);
        this.wasm.call("ecc_grumpkin__mul", 0, 64, 96);
        return Buffer.from(this.wasm.sliceMemory(96, 160));
    }
    batchMul(points, scalar, numPoints) {
        const mem = this.wasm.call("bbmalloc", points.length * 2);
        this.wasm.transferToHeap(points, mem);
        this.wasm.transferToHeap(scalar, 0);
        this.wasm.call("ecc_grumpkin__batch_mul", mem, 0, numPoints, mem + points.length);
        const result = Buffer.from(this.wasm.sliceMemory(mem + points.length, mem + points.length + points.length));
        this.wasm.call("bbfree", mem);
        return result;
    }
    getRandomFr() {
        this.wasm.call("ecc_grumpkin__get_random_scalar_mod_circuit_modulus", 0);
        return Buffer.from(this.wasm.sliceMemory(0, 32));
    }
    reduce512BufferToFr(uint512Buf) {
        this.wasm.transferToHeap(uint512Buf, 0);
        this.wasm.call("ecc_grumpkin__reduce512_buffer_mod_circuit_modulus", 0, 64);
        return Buffer.from(this.wasm.sliceMemory(64, 96));
    }
}
exports.Grumpkin = Grumpkin;
// prettier-ignore
Grumpkin.one = Buffer.from([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xcf, 0x13, 0x5e, 0x75, 0x06, 0xa4, 0x5d, 0x63,
    0x2d, 0x27, 0x0d, 0x45, 0xf1, 0x18, 0x12, 0x94, 0x83, 0x3f, 0xc4, 0x8d, 0x82, 0x3f, 0x27, 0x2c,
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZWNjL2dydW1wa2luL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsUUFBUTtJQUNuQixZQUFvQixJQUFzQjtRQUF0QixTQUFJLEdBQUosSUFBSSxDQUFrQjtJQUFHLENBQUM7SUFVdkMsR0FBRyxDQUFDLEtBQWlCLEVBQUUsTUFBa0I7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sUUFBUSxDQUFDLE1BQWtCLEVBQUUsTUFBa0IsRUFBRSxTQUFpQjtRQUN2RSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNaLHlCQUF5QixFQUN6QixHQUFHLEVBQ0gsQ0FBQyxFQUNELFNBQVMsRUFDVCxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDcEIsQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUNuQixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFDbkIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDcEMsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFEQUFxRCxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sbUJBQW1CLENBQUMsVUFBa0I7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9EQUFvRCxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1RSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7QUFsREgsNEJBbURDO0FBaERDLGtCQUFrQjtBQUNYLFlBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDOUYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUM5RixJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0lBQzlGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7Q0FDL0YsQ0FBQyxDQUFDIn0=