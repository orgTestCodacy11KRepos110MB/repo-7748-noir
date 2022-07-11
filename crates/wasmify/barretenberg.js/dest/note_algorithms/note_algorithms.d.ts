/// <reference types="node" />
import { AliasHash } from "../account_id";
import { GrumpkinAddress } from "../address";
import { BarretenbergWasm } from "../wasm";
import { DefiInteractionNote } from "./defi_interaction_note";
import { TreeClaimNote } from "./tree_claim_note";
import { TreeNote } from "./tree_note";
export declare class NoteAlgorithms {
    private wasm;
    constructor(wasm: BarretenbergWasm);
    valueNoteNullifier(noteCommitment: Buffer, accountPrivateKey: Buffer, real?: boolean): Buffer;
    valueNoteNullifierBigInt(noteCommitment: Buffer, accountPrivateKey: Buffer, real?: boolean): bigint;
    valueNoteCommitment(note: TreeNote): Buffer;
    valueNotePartialCommitment(noteSecret: Buffer, owner: GrumpkinAddress, accountRequired: boolean): Buffer;
    claimNotePartialCommitment(note: TreeClaimNote): Buffer;
    claimNoteCompletePartialCommitment(partialNote: Buffer, interactionNonce: number, fee: bigint): Buffer;
    claimNoteCommitment(note: TreeClaimNote): Buffer;
    claimNoteNullifier(noteCommitment: Buffer): Buffer;
    defiInteractionNoteCommitment(note: DefiInteractionNote): Buffer;
    accountNoteCommitment(aliasHash: AliasHash, accountPublicKey: GrumpkinAddress, spendingPublicKey: Buffer): Buffer;
    accountAliasHashNullifier(aliasHash: AliasHash): Buffer;
    accountPublicKeyNullifier(accountPublicKey: GrumpkinAddress): Buffer;
}
//# sourceMappingURL=note_algorithms.d.ts.map