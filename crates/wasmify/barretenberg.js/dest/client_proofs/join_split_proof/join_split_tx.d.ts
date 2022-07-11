/// <reference types="node" />
import { AliasHash } from "../../account_id";
import { EthAddress, GrumpkinAddress } from "../../address";
import { HashPath } from "../../merkle_tree";
import { ClaimNoteTxData, TreeNote } from "../../note_algorithms";
export declare class JoinSplitTx {
    proofId: number;
    publicValue: bigint;
    publicOwner: EthAddress;
    publicAssetId: number;
    numInputNotes: number;
    inputNoteIndices: number[];
    merkleRoot: Buffer;
    inputNotePaths: HashPath[];
    inputNotes: TreeNote[];
    outputNotes: TreeNote[];
    claimNote: ClaimNoteTxData;
    accountPrivateKey: Buffer;
    aliasHash: AliasHash;
    accountRequired: boolean;
    accountIndex: number;
    accountPath: HashPath;
    spendingPublicKey: GrumpkinAddress;
    backwardLink: Buffer;
    allowChain: number;
    constructor(proofId: number, publicValue: bigint, publicOwner: EthAddress, publicAssetId: number, numInputNotes: number, inputNoteIndices: number[], merkleRoot: Buffer, inputNotePaths: HashPath[], inputNotes: TreeNote[], outputNotes: TreeNote[], claimNote: ClaimNoteTxData, accountPrivateKey: Buffer, aliasHash: AliasHash, accountRequired: boolean, accountIndex: number, accountPath: HashPath, spendingPublicKey: GrumpkinAddress, backwardLink: Buffer, allowChain: number);
    toBuffer(): Buffer;
    static fromBuffer(buf: Buffer): JoinSplitTx;
}
//# sourceMappingURL=join_split_tx.d.ts.map