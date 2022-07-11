"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollupDepositProofData = void 0;
const address_1 = require("../address");
const bigint_buffer_1 = require("../bigint_buffer");
const client_proofs_1 = require("../client_proofs");
const inner_proof_1 = require("./inner_proof");
class RollupDepositProofData {
    constructor(proofData) {
        this.proofData = proofData;
        if (proofData.proofId !== client_proofs_1.ProofId.DEPOSIT) {
            throw new Error("Not a deposit proof.");
        }
    }
    get ENCODED_LENGTH() {
        return RollupDepositProofData.ENCODED_LENGTH;
    }
    get assetId() {
        return this.proofData.publicAssetId.readUInt32BE(28);
    }
    get publicValue() {
        return (0, bigint_buffer_1.toBigIntBE)(this.proofData.publicValue);
    }
    get publicOwner() {
        return new address_1.EthAddress(this.proofData.publicOwner);
    }
    static decode(encoded) {
        const proofId = encoded.readUInt8(0);
        if (proofId !== client_proofs_1.ProofId.DEPOSIT) {
            throw new Error("Not a deposit proof.");
        }
        let offset = 1;
        const noteCommitment1 = encoded.slice(offset, offset + 32);
        offset += 32;
        const noteCommitment2 = encoded.slice(offset, offset + 32);
        offset += 32;
        const nullifier1 = encoded.slice(offset, offset + 32);
        offset += 32;
        const nullifier2 = encoded.slice(offset, offset + 32);
        offset += 32;
        const publicValue = encoded.slice(offset, offset + 32);
        offset += 32;
        const publicOwner = Buffer.concat([
            Buffer.alloc(12),
            encoded.slice(offset, offset + 20),
        ]);
        offset += 20;
        const publicAssetId = Buffer.concat([
            Buffer.alloc(28),
            encoded.slice(offset, offset + 4),
        ]);
        return new RollupDepositProofData(new inner_proof_1.InnerProofData(client_proofs_1.ProofId.DEPOSIT, noteCommitment1, noteCommitment2, nullifier1, nullifier2, publicValue, publicOwner, publicAssetId));
    }
    encode() {
        const { noteCommitment1, noteCommitment2, nullifier1, nullifier2, publicValue, publicAssetId, } = this.proofData;
        const encodedAssetId = publicAssetId.slice(28, 32);
        return Buffer.concat([
            Buffer.from([client_proofs_1.ProofId.DEPOSIT]),
            noteCommitment1,
            noteCommitment2,
            nullifier1,
            nullifier2,
            publicValue,
            this.publicOwner.toBuffer(),
            encodedAssetId,
        ]);
    }
}
exports.RollupDepositProofData = RollupDepositProofData;
RollupDepositProofData.ENCODED_LENGTH = 1 + 5 * 32 + 20 + 4;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sbHVwX2RlcG9zaXRfcHJvb2ZfZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb2xsdXBfcHJvb2Yvcm9sbHVwX2RlcG9zaXRfcHJvb2ZfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0M7QUFDeEMsb0RBQThDO0FBQzlDLG9EQUEyQztBQUMzQywrQ0FBK0M7QUFFL0MsTUFBYSxzQkFBc0I7SUFHakMsWUFBNEIsU0FBeUI7UUFBekIsY0FBUyxHQUFULFNBQVMsQ0FBZ0I7UUFDbkQsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLHVCQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxzQkFBc0IsQ0FBQyxjQUFjLENBQUM7SUFDL0MsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUEsMEJBQVUsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQWU7UUFDM0IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLE9BQU8sS0FBSyx1QkFBTyxDQUFDLE9BQU8sRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDekM7UUFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0QsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNiLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMzRCxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2IsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDYixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdEQsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNiLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN2RCxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2IsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ25DLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDYixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLHNCQUFzQixDQUMvQixJQUFJLDRCQUFjLENBQ2hCLHVCQUFPLENBQUMsT0FBTyxFQUNmLGVBQWUsRUFDZixlQUFlLEVBQ2YsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEVBQ1gsV0FBVyxFQUNYLGFBQWEsQ0FDZCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sRUFDSixlQUFlLEVBQ2YsZUFBZSxFQUNmLFVBQVUsRUFDVixVQUFVLEVBQ1YsV0FBVyxFQUNYLGFBQWEsR0FDZCxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkIsTUFBTSxjQUFjLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyx1QkFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLGVBQWU7WUFDZixlQUFlO1lBQ2YsVUFBVTtZQUNWLFVBQVU7WUFDVixXQUFXO1lBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsY0FBYztTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBckZILHdEQXNGQztBQXJGUSxxQ0FBYyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMifQ==