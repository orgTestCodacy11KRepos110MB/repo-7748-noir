"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasHash = void 0;
const crypto_1 = require("../crypto");
class AliasHash {
    constructor(buffer) {
        this.buffer = buffer;
        if (buffer.length !== AliasHash.SIZE) {
            throw new Error("Invalid alias hash buffer.");
        }
    }
    static random() {
        return new AliasHash((0, crypto_1.randomBytes)(28));
    }
    static fromAlias(alias, blake2s) {
        return new AliasHash(blake2s.hashToField(Buffer.from(alias)).slice(0, 28));
    }
    static fromString(hash) {
        return new AliasHash(Buffer.from(hash.replace(/^0x/i, ""), "hex"));
    }
    toBuffer() {
        return this.buffer;
    }
    toBuffer32() {
        const buffer = Buffer.alloc(32);
        this.buffer.copy(buffer, 4);
        return buffer;
    }
    toString() {
        return `0x${this.toBuffer().toString("hex")}`;
    }
    equals(rhs) {
        return this.toBuffer().equals(rhs.toBuffer());
    }
}
exports.AliasHash = AliasHash;
AliasHash.SIZE = 28;
AliasHash.ZERO = new AliasHash(Buffer.alloc(AliasHash.SIZE));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXNfaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY2NvdW50X2lkL2FsaWFzX2hhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQWlEO0FBRWpELE1BQWEsU0FBUztJQUlwQixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNoQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLElBQUksRUFBRTtZQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDL0M7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU07UUFDWCxPQUFPLElBQUksU0FBUyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQWEsRUFBRSxPQUFnQjtRQUM5QyxPQUFPLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQzVCLE9BQU8sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRCxNQUFNLENBQUMsR0FBYztRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7QUF0Q0gsOEJBdUNDO0FBdENRLGNBQUksR0FBRyxFQUFFLENBQUM7QUFDVixjQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyJ9