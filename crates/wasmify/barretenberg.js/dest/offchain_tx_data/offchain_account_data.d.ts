/// <reference types="node" />
import { AliasHash } from "../account_id";
import { GrumpkinAddress } from "../address";
export declare class OffchainAccountData {
    readonly accountPublicKey: GrumpkinAddress;
    readonly aliasHash: AliasHash;
    readonly spendingPublicKey1: Buffer;
    readonly spendingPublicKey2: Buffer;
    readonly txRefNo: number;
    static EMPTY: OffchainAccountData;
    static SIZE: number;
    constructor(accountPublicKey: GrumpkinAddress, aliasHash: AliasHash, spendingPublicKey1?: Buffer, spendingPublicKey2?: Buffer, txRefNo?: number);
    static fromBuffer(buf: Buffer): OffchainAccountData;
    toBuffer(): Buffer;
}
//# sourceMappingURL=offchain_account_data.d.ts.map