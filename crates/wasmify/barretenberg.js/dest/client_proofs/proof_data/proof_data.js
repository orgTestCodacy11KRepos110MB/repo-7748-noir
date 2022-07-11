"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofData = void 0;
const create_tx_id_1 = require("./create_tx_id");
var ProofDataFields;
(function (ProofDataFields) {
    ProofDataFields[ProofDataFields["PROOF_ID"] = 0] = "PROOF_ID";
    ProofDataFields[ProofDataFields["NOTE_COMMITMENT_1"] = 1] = "NOTE_COMMITMENT_1";
    ProofDataFields[ProofDataFields["NOTE_COMMITMENT_2"] = 2] = "NOTE_COMMITMENT_2";
    ProofDataFields[ProofDataFields["NULLIFIER_1"] = 3] = "NULLIFIER_1";
    ProofDataFields[ProofDataFields["NULLIFIER_2"] = 4] = "NULLIFIER_2";
    ProofDataFields[ProofDataFields["PUBLIC_VALUE"] = 5] = "PUBLIC_VALUE";
    ProofDataFields[ProofDataFields["PUBLIC_OWNER"] = 6] = "PUBLIC_OWNER";
    ProofDataFields[ProofDataFields["PUBLIC_ASSET_ID"] = 7] = "PUBLIC_ASSET_ID";
    ProofDataFields[ProofDataFields["NOTE_TREE_ROOT"] = 8] = "NOTE_TREE_ROOT";
    ProofDataFields[ProofDataFields["TX_FEE"] = 9] = "TX_FEE";
    ProofDataFields[ProofDataFields["TX_FEE_ASSET_ID"] = 10] = "TX_FEE_ASSET_ID";
    ProofDataFields[ProofDataFields["BRIDGE_ID"] = 11] = "BRIDGE_ID";
    ProofDataFields[ProofDataFields["DEFI_DEPOSIT_VALUE"] = 12] = "DEFI_DEPOSIT_VALUE";
    ProofDataFields[ProofDataFields["DEFI_ROOT"] = 13] = "DEFI_ROOT";
    ProofDataFields[ProofDataFields["BACKWARD_LINK"] = 14] = "BACKWARD_LINK";
    ProofDataFields[ProofDataFields["ALLOW_CHAIN"] = 15] = "ALLOW_CHAIN";
})(ProofDataFields || (ProofDataFields = {}));
var ProofDataOffsets;
(function (ProofDataOffsets) {
    ProofDataOffsets[ProofDataOffsets["PROOF_ID"] = 28] = "PROOF_ID";
    ProofDataOffsets[ProofDataOffsets["NOTE_COMMITMENT_1"] = 32] = "NOTE_COMMITMENT_1";
    ProofDataOffsets[ProofDataOffsets["NOTE_COMMITMENT_2"] = 64] = "NOTE_COMMITMENT_2";
    ProofDataOffsets[ProofDataOffsets["NULLIFIER_1"] = 96] = "NULLIFIER_1";
    ProofDataOffsets[ProofDataOffsets["NULLIFIER_2"] = 128] = "NULLIFIER_2";
    ProofDataOffsets[ProofDataOffsets["PUBLIC_VALUE"] = 160] = "PUBLIC_VALUE";
    ProofDataOffsets[ProofDataOffsets["PUBLIC_OWNER"] = 192] = "PUBLIC_OWNER";
    ProofDataOffsets[ProofDataOffsets["PUBLIC_ASSET_ID"] = 224] = "PUBLIC_ASSET_ID";
    ProofDataOffsets[ProofDataOffsets["NOTE_TREE_ROOT"] = 256] = "NOTE_TREE_ROOT";
    ProofDataOffsets[ProofDataOffsets["TX_FEE"] = 288] = "TX_FEE";
    ProofDataOffsets[ProofDataOffsets["TX_FEE_ASSET_ID"] = 320] = "TX_FEE_ASSET_ID";
    ProofDataOffsets[ProofDataOffsets["BRIDGE_ID"] = 352] = "BRIDGE_ID";
    ProofDataOffsets[ProofDataOffsets["DEFI_DEPOSIT_VALUE"] = 384] = "DEFI_DEPOSIT_VALUE";
    ProofDataOffsets[ProofDataOffsets["DEFI_ROOT"] = 416] = "DEFI_ROOT";
    ProofDataOffsets[ProofDataOffsets["BACKWARD_LINK"] = 448] = "BACKWARD_LINK";
    ProofDataOffsets[ProofDataOffsets["ALLOW_CHAIN"] = 480] = "ALLOW_CHAIN";
})(ProofDataOffsets || (ProofDataOffsets = {}));
/**
 * Represents tx proof data as returned by the proof generator.
 * Differs to on chain data, in that not all data here is actually published.
 * Fields that differ between proofs, or natural buffers, are of type Buffer.
 * Fields that are always of fixed type/meaning are converted.
 */
class ProofData {
    constructor(rawProofData) {
        this.rawProofData = rawProofData;
        this.proofId = rawProofData.readUInt32BE(ProofDataOffsets.PROOF_ID);
        this.noteCommitment1 = rawProofData.slice(ProofDataOffsets.NOTE_COMMITMENT_1, ProofDataOffsets.NOTE_COMMITMENT_1 + 32);
        this.noteCommitment2 = rawProofData.slice(ProofDataOffsets.NOTE_COMMITMENT_2, ProofDataOffsets.NOTE_COMMITMENT_2 + 32);
        this.nullifier1 = rawProofData.slice(ProofDataOffsets.NULLIFIER_1, ProofDataOffsets.NULLIFIER_1 + 32);
        this.nullifier2 = rawProofData.slice(ProofDataOffsets.NULLIFIER_2, ProofDataOffsets.NULLIFIER_2 + 32);
        this.publicValue = rawProofData.slice(ProofDataOffsets.PUBLIC_VALUE, ProofDataOffsets.PUBLIC_VALUE + 32);
        this.publicOwner = rawProofData.slice(ProofDataOffsets.PUBLIC_OWNER, ProofDataOffsets.PUBLIC_OWNER + 32);
        this.publicAssetId = rawProofData.slice(ProofDataOffsets.PUBLIC_ASSET_ID, ProofDataOffsets.PUBLIC_ASSET_ID + 32);
        // Not published as part of inner proofs.
        this.noteTreeRoot = rawProofData.slice(ProofDataOffsets.NOTE_TREE_ROOT, ProofDataOffsets.NOTE_TREE_ROOT + 32);
        this.txFee = rawProofData.slice(ProofDataOffsets.TX_FEE, ProofDataOffsets.TX_FEE + 32);
        this.txFeeAssetId = rawProofData.slice(ProofDataOffsets.TX_FEE_ASSET_ID, ProofDataOffsets.TX_FEE_ASSET_ID + 32);
        this.bridgeId = rawProofData.slice(ProofDataOffsets.BRIDGE_ID, ProofDataOffsets.BRIDGE_ID + 32);
        this.defiDepositValue = rawProofData.slice(ProofDataOffsets.DEFI_DEPOSIT_VALUE, ProofDataOffsets.DEFI_DEPOSIT_VALUE + 32);
        this.defiRoot = rawProofData.slice(ProofDataOffsets.DEFI_ROOT, ProofDataOffsets.DEFI_ROOT + 32);
        this.backwardLink = rawProofData.slice(ProofDataOffsets.BACKWARD_LINK, ProofDataOffsets.BACKWARD_LINK + 32);
        this.allowChain = rawProofData.slice(ProofDataOffsets.ALLOW_CHAIN, ProofDataOffsets.ALLOW_CHAIN + 32);
        this.txId = (0, create_tx_id_1.createTxId)(rawProofData.slice(0, ProofData.NUM_PUBLISHED_PUBLIC_INPUTS * 32));
    }
    static getProofIdFromBuffer(rawProofData) {
        return rawProofData.readUInt32BE(ProofDataOffsets.PROOF_ID);
    }
    get allowChainFromNote1() {
        const allowChain = this.allowChain.readUInt32BE(28);
        return [1, 3].includes(allowChain);
    }
    get allowChainFromNote2() {
        const allowChain = this.allowChain.readUInt32BE(28);
        return [2, 3].includes(allowChain);
    }
    get feeAssetId() {
        return this.txFeeAssetId.readUInt32BE(28);
    }
}
exports.ProofData = ProofData;
ProofData.NUM_PUBLIC_INPUTS = 17;
ProofData.NUM_PUBLISHED_PUBLIC_INPUTS = 8;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvb2ZfZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnRfcHJvb2ZzL3Byb29mX2RhdGEvcHJvb2ZfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBNEM7QUFHNUMsSUFBSyxlQWlCSjtBQWpCRCxXQUFLLGVBQWU7SUFDbEIsNkRBQVEsQ0FBQTtJQUNSLCtFQUFpQixDQUFBO0lBQ2pCLCtFQUFpQixDQUFBO0lBQ2pCLG1FQUFXLENBQUE7SUFDWCxtRUFBVyxDQUFBO0lBQ1gscUVBQVksQ0FBQTtJQUNaLHFFQUFZLENBQUE7SUFDWiwyRUFBZSxDQUFBO0lBQ2YseUVBQWMsQ0FBQTtJQUNkLHlEQUFNLENBQUE7SUFDTiw0RUFBZSxDQUFBO0lBQ2YsZ0VBQVMsQ0FBQTtJQUNULGtGQUFrQixDQUFBO0lBQ2xCLGdFQUFTLENBQUE7SUFDVCx3RUFBYSxDQUFBO0lBQ2Isb0VBQVcsQ0FBQTtBQUNiLENBQUMsRUFqQkksZUFBZSxLQUFmLGVBQWUsUUFpQm5CO0FBRUQsSUFBSyxnQkFpQko7QUFqQkQsV0FBSyxnQkFBZ0I7SUFDbkIsZ0VBQTZDLENBQUE7SUFDN0Msa0ZBQTBELENBQUE7SUFDMUQsa0ZBQTBELENBQUE7SUFDMUQsc0VBQThDLENBQUE7SUFDOUMsdUVBQThDLENBQUE7SUFDOUMseUVBQWdELENBQUE7SUFDaEQseUVBQWdELENBQUE7SUFDaEQsK0VBQXNELENBQUE7SUFDdEQsNkVBQW9ELENBQUE7SUFDcEQsNkRBQW9DLENBQUE7SUFDcEMsK0VBQXNELENBQUE7SUFDdEQsbUVBQTBDLENBQUE7SUFDMUMscUZBQTRELENBQUE7SUFDNUQsbUVBQTBDLENBQUE7SUFDMUMsMkVBQWtELENBQUE7SUFDbEQsdUVBQThDLENBQUE7QUFDaEQsQ0FBQyxFQWpCSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBaUJwQjtBQUVEOzs7OztHQUtHO0FBQ0gsTUFBYSxTQUFTO0lBNkJwQixZQUFtQixZQUFvQjtRQUFwQixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUN2QyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFDbEMsZ0JBQWdCLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUN4QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUN2QyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFDbEMsZ0JBQWdCLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUN4QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUNsQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQzVCLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxFQUFFLENBQ2xDLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQ2xDLGdCQUFnQixDQUFDLFdBQVcsRUFDNUIsZ0JBQWdCLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FDbEMsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FDbkMsZ0JBQWdCLENBQUMsWUFBWSxFQUM3QixnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUNuQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUNuQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQzdCLGdCQUFnQixDQUFDLFlBQVksR0FBRyxFQUFFLENBQ25DLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQ3JDLGdCQUFnQixDQUFDLGVBQWUsRUFDaEMsZ0JBQWdCLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FDdEMsQ0FBQztRQUVGLHlDQUF5QztRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQ3BDLGdCQUFnQixDQUFDLGNBQWMsRUFDL0IsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FDckMsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FDN0IsZ0JBQWdCLENBQUMsTUFBTSxFQUN2QixnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUM3QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUNwQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQ2hDLGdCQUFnQixDQUFDLGVBQWUsR0FBRyxFQUFFLENBQ3RDLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQ2hDLGdCQUFnQixDQUFDLFNBQVMsRUFDMUIsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FDaEMsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUN4QyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFDbkMsZ0JBQWdCLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUN6QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUNoQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQzFCLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxFQUFFLENBQ2hDLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQ3BDLGdCQUFnQixDQUFDLGFBQWEsRUFDOUIsZ0JBQWdCLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FDcEMsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FDbEMsZ0JBQWdCLENBQUMsV0FBVyxFQUM1QixnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUNsQyxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFBLHlCQUFVLEVBQ3BCLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQywyQkFBMkIsR0FBRyxFQUFFLENBQUMsQ0FDbEUsQ0FBQztJQUNKLENBQUM7SUE3RkQsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFlBQW9CO1FBQzlDLE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBNkZELElBQUksbUJBQW1CO1FBQ3JCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJLG1CQUFtQjtRQUNyQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRCxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDOztBQS9HSCw4QkFnSEM7QUEvR2lCLDJCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUN2QixxQ0FBMkIsR0FBRyxDQUFDLENBQUMifQ==