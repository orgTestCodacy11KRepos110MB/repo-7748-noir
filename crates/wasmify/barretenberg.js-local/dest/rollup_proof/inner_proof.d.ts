/// <reference types="node" />
import { ProofId } from "../client_proofs";
export declare class InnerProofData {
    proofId: ProofId;
    noteCommitment1: Buffer;
    noteCommitment2: Buffer;
    nullifier1: Buffer;
    nullifier2: Buffer;
    publicValue: Buffer;
    publicOwner: Buffer;
    publicAssetId: Buffer;
    static NUM_PUBLIC_INPUTS: number;
    static LENGTH: number;
    static PADDING: InnerProofData;
    txId_?: Buffer;
    constructor(proofId: ProofId, noteCommitment1: Buffer, noteCommitment2: Buffer, nullifier1: Buffer, nullifier2: Buffer, publicValue: Buffer, publicOwner: Buffer, publicAssetId: Buffer);
    get txId(): Buffer;
    getDepositSigningData(): Buffer;
    toBuffer(): Buffer;
    isPadding(): boolean;
    static fromBuffer(innerPublicInputs: Buffer): InnerProofData;
}
//# sourceMappingURL=inner_proof.d.ts.map