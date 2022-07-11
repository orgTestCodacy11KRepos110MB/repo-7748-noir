"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrumpkinAddress = void 0;
const crypto_1 = require("../crypto");
const grumpkin_1 = require("../ecc/grumpkin");
class GrumpkinAddress {
    constructor(buffer) {
        this.buffer = buffer;
        if (buffer.length !== GrumpkinAddress.SIZE) {
            throw new Error("Invalid address buffer.");
        }
    }
    static isAddress(address) {
        return /^(0x|0X)?[0-9a-fA-F]{128}$/.test(address);
    }
    static fromString(address) {
        if (!GrumpkinAddress.isAddress(address)) {
            throw new Error(`Invalid address string: ${address}`);
        }
        return new GrumpkinAddress(Buffer.from(address.replace(/^0x/i, ""), "hex"));
    }
    /**
     * NOT a valid address! Do not use in proofs.
     */
    static random() {
        return new GrumpkinAddress((0, crypto_1.randomBytes)(64));
    }
    /**
     * A valid address (is a point on the curve).
     */
    static one() {
        return new GrumpkinAddress(grumpkin_1.Grumpkin.one);
    }
    equals(rhs) {
        return this.buffer.equals(rhs.toBuffer());
    }
    toBuffer() {
        return this.buffer;
    }
    x() {
        return this.buffer.slice(0, 32);
    }
    y() {
        return this.buffer.slice(32);
    }
    toString() {
        return `0x${this.buffer.toString("hex")}`;
    }
    toShortString() {
        const str = this.toString();
        return `${str.slice(0, 10)}...${str.slice(-4)}`;
    }
}
exports.GrumpkinAddress = GrumpkinAddress;
GrumpkinAddress.SIZE = 64;
GrumpkinAddress.ZERO = new GrumpkinAddress(Buffer.alloc(GrumpkinAddress.SIZE));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3J1bXBraW5fYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGRyZXNzL2dydW1wa2luX2FkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXdDO0FBQ3hDLDhDQUEyQztBQUUzQyxNQUFhLGVBQWU7SUFJMUIsWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDaEMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLGVBQWUsQ0FBQyxJQUFJLEVBQUU7WUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBZTtRQUNyQyxPQUFPLDRCQUE0QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFlO1FBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDdkQ7UUFDRCxPQUFPLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsTUFBTTtRQUNsQixPQUFPLElBQUksZUFBZSxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxHQUFHO1FBQ2YsT0FBTyxJQUFJLGVBQWUsQ0FBQyxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxNQUFNLENBQUMsR0FBb0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsQ0FBQztRQUNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxDQUFDO1FBQ0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxhQUFhO1FBQ1gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRCxDQUFDOztBQTFESCwwQ0EyREM7QUExRGUsb0JBQUksR0FBRyxFQUFFLENBQUM7QUFDVixvQkFBSSxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMifQ==