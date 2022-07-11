"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerProofData = void 0;
const client_proofs_1 = require("../client_proofs");
const serialize_1 = require("../serialize");
class InnerProofData {
    constructor(proofId, noteCommitment1, noteCommitment2, nullifier1, nullifier2, publicValue, publicOwner, publicAssetId) {
        this.proofId = proofId;
        this.noteCommitment1 = noteCommitment1;
        this.noteCommitment2 = noteCommitment2;
        this.nullifier1 = nullifier1;
        this.nullifier2 = nullifier2;
        this.publicValue = publicValue;
        this.publicOwner = publicOwner;
        this.publicAssetId = publicAssetId;
    }
    get txId() {
        if (!this.txId_) {
            this.txId_ = (0, client_proofs_1.createTxId)(this.toBuffer());
        }
        return this.txId_;
    }
    getDepositSigningData() {
        return this.toBuffer();
    }
    toBuffer() {
        return Buffer.concat([
            (0, serialize_1.numToUInt32BE)(this.proofId, 32),
            this.noteCommitment1,
            this.noteCommitment2,
            this.nullifier1,
            this.nullifier2,
            this.publicValue,
            this.publicOwner,
            this.publicAssetId,
        ]);
    }
    isPadding() {
        return this.proofId === client_proofs_1.ProofId.PADDING;
    }
    static fromBuffer(innerPublicInputs) {
        let dataStart = 0;
        const proofId = innerPublicInputs.readUInt32BE(dataStart + 28);
        dataStart += 32;
        const noteCommitment1 = innerPublicInputs.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const noteCommitment2 = innerPublicInputs.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const nullifier1 = innerPublicInputs.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const nullifier2 = innerPublicInputs.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const publicValue = innerPublicInputs.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const publicOwner = innerPublicInputs.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const publicAssetId = innerPublicInputs.slice(dataStart, dataStart + 32);
        dataStart += 32;
        return new InnerProofData(proofId, noteCommitment1, noteCommitment2, nullifier1, nullifier2, publicValue, publicOwner, publicAssetId);
    }
}
exports.InnerProofData = InnerProofData;
InnerProofData.NUM_PUBLIC_INPUTS = 8;
InnerProofData.LENGTH = InnerProofData.NUM_PUBLIC_INPUTS * 32;
InnerProofData.PADDING = InnerProofData.fromBuffer(Buffer.alloc(InnerProofData.LENGTH));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJfcHJvb2YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm9sbHVwX3Byb29mL2lubmVyX3Byb29mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9EQUF1RDtBQUN2RCw0Q0FBNkM7QUFFN0MsTUFBYSxjQUFjO0lBU3pCLFlBQ1MsT0FBZ0IsRUFDaEIsZUFBdUIsRUFDdkIsZUFBdUIsRUFDdkIsVUFBa0IsRUFDbEIsVUFBa0IsRUFDbEIsV0FBbUIsRUFDbkIsV0FBbUIsRUFDbkIsYUFBcUI7UUFQckIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixvQkFBZSxHQUFmLGVBQWUsQ0FBUTtRQUN2QixvQkFBZSxHQUFmLGVBQWUsQ0FBUTtRQUN2QixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsa0JBQWEsR0FBYixhQUFhLENBQVE7SUFDM0IsQ0FBQztJQUVKLElBQVcsSUFBSTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFBLDBCQUFVLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQixJQUFBLHlCQUFhLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLGVBQWU7WUFDcEIsSUFBSSxDQUFDLGVBQWU7WUFDcEIsSUFBSSxDQUFDLFVBQVU7WUFDZixJQUFJLENBQUMsVUFBVTtZQUNmLElBQUksQ0FBQyxXQUFXO1lBQ2hCLElBQUksQ0FBQyxXQUFXO1lBQ2hCLElBQUksQ0FBQyxhQUFhO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLHVCQUFPLENBQUMsT0FBTyxDQUFDO0lBQzFDLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLGlCQUF5QjtRQUN6QyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMvRCxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ2hCLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDaEIsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0UsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUNoQixNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN0RSxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ2hCLE1BQU0sVUFBVSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDaEIsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdkUsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUNoQixNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN2RSxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ2hCLE1BQU0sYUFBYSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFFaEIsT0FBTyxJQUFJLGNBQWMsQ0FDdkIsT0FBTyxFQUNQLGVBQWUsRUFDZixlQUFlLEVBQ2YsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEVBQ1gsV0FBVyxFQUNYLGFBQWEsQ0FDZCxDQUFDO0lBQ0osQ0FBQzs7QUE3RUgsd0NBOEVDO0FBN0VRLGdDQUFpQixHQUFHLENBQUMsQ0FBQztBQUN0QixxQkFBTSxHQUFHLGNBQWMsQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFDL0Msc0JBQU8sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FDcEMsQ0FBQyJ9