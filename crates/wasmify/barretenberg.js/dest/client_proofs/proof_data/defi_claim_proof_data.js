"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefiClaimProofData = void 0;
const bigint_buffer_1 = require("../../bigint_buffer");
const bridge_id_1 = require("../../bridge_id");
const proof_data_1 = require("./proof_data");
const proof_id_1 = require("./proof_id");
class DefiClaimProofData {
    constructor(proofData) {
        this.proofData = proofData;
        if (proofData.proofId !== proof_id_1.ProofId.DEFI_CLAIM) {
            throw new Error("Not a defi claim proof.");
        }
    }
    static fromBuffer(rawProofData) {
        return new DefiClaimProofData(new proof_data_1.ProofData(rawProofData));
    }
    get txFee() {
        return (0, bigint_buffer_1.toBigIntBE)(this.proofData.txFee);
    }
    get txFeeAssetId() {
        return this.proofData.feeAssetId;
    }
    get bridgeId() {
        return bridge_id_1.BridgeId.fromBuffer(this.proofData.bridgeId);
    }
}
exports.DefiClaimProofData = DefiClaimProofData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaV9jbGFpbV9wcm9vZl9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsaWVudF9wcm9vZnMvcHJvb2ZfZGF0YS9kZWZpX2NsYWltX3Byb29mX2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQWlEO0FBQ2pELCtDQUEyQztBQUMzQyw2Q0FBeUM7QUFDekMseUNBQXFDO0FBRXJDLE1BQWEsa0JBQWtCO0lBQzdCLFlBQTRCLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDOUMsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLGtCQUFPLENBQUMsVUFBVSxFQUFFO1lBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQW9CO1FBQ3BDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLHNCQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFBLDBCQUFVLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRjtBQXRCRCxnREFzQkMifQ==