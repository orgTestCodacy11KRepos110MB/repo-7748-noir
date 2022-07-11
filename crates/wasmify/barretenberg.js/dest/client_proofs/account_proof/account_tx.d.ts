/// <reference types="node" />
import { AliasHash } from "../../account_id";
import { GrumpkinAddress } from "../../address";
import { HashPath } from "../../merkle_tree";
export declare class AccountTx {
    merkleRoot: Buffer;
    accountPublicKey: GrumpkinAddress;
    newAccountPublicKey: GrumpkinAddress;
    newSpendingPublicKey1: GrumpkinAddress;
    newSpendingPublicKey2: GrumpkinAddress;
    aliasHash: AliasHash;
    create: boolean;
    migrate: boolean;
    accountIndex: number;
    accountPath: HashPath;
    spendingPublicKey: GrumpkinAddress;
    constructor(merkleRoot: Buffer, accountPublicKey: GrumpkinAddress, newAccountPublicKey: GrumpkinAddress, newSpendingPublicKey1: GrumpkinAddress, newSpendingPublicKey2: GrumpkinAddress, aliasHash: AliasHash, create: boolean, migrate: boolean, accountIndex: number, accountPath: HashPath, spendingPublicKey: GrumpkinAddress);
    toBuffer(): Buffer;
    static fromBuffer(buf: Buffer): AccountTx;
}
//# sourceMappingURL=account_tx.d.ts.map