/// <reference types="node" />
import { EthAddress, GrumpkinAddress } from "../address";
import { AssetValue } from "../asset";
import { BlockSource } from "../block_source";
import { BridgeId } from "../bridge_id";
import { TxId } from "../tx_id";
import { RollupProviderStatus } from "./rollup_provider_status";
export declare enum TxSettlementTime {
    NEXT_ROLLUP = 0,
    INSTANT = 1
}
export declare enum DefiSettlementTime {
    DEADLINE = 0,
    NEXT_ROLLUP = 1,
    INSTANT = 2
}
export interface Tx {
    proofData: Buffer;
    offchainTxData: Buffer;
    depositSignature?: Buffer;
}
export interface TxJson {
    proofData: string;
    offchainTxData: string;
    depositSignature?: string;
}
export declare const txToJson: ({ proofData, offchainTxData, depositSignature, }: Tx) => TxJson;
export declare const txFromJson: ({ proofData, offchainTxData, depositSignature, }: TxJson) => Tx;
export interface PendingTx {
    txId: TxId;
    noteCommitment1: Buffer;
    noteCommitment2: Buffer;
}
export interface PendingTxJson {
    txId: string;
    noteCommitment1: string;
    noteCommitment2: string;
}
export declare const pendingTxToJson: ({ txId, noteCommitment1, noteCommitment2, }: PendingTx) => PendingTxJson;
export declare const pendingTxFromJson: ({ txId, noteCommitment1, noteCommitment2, }: PendingTxJson) => PendingTx;
export interface InitialWorldState {
    initialAccounts: Buffer;
    initialSubtreeRoots: Buffer[];
}
export declare const initialWorldStateToBuffer: (initialWorldState: InitialWorldState) => Buffer;
export declare const initialWorldStateFromBuffer: (data: Buffer) => InitialWorldState;
export interface DepositTx {
    assetId: number;
    value: bigint;
    publicOwner: EthAddress;
}
export interface DepositTxJson {
    assetId: number;
    value: string;
    publicOwner: string;
}
export declare const depositTxToJson: ({ assetId, value, publicOwner, }: DepositTx) => DepositTxJson;
export declare const depositTxFromJson: ({ assetId, value, publicOwner, }: DepositTxJson) => DepositTx;
export interface InitialWorldState {
    initialAccounts: Buffer;
}
export interface RollupProvider extends BlockSource {
    sendTxs(txs: Tx[]): Promise<TxId[]>;
    getStatus(): Promise<RollupProviderStatus>;
    getTxFees(assetId: number): Promise<AssetValue[][]>;
    getDefiFees(bridgeId: BridgeId): Promise<AssetValue[]>;
    getPendingTxs(): Promise<PendingTx[]>;
    getPendingNoteNullifiers(): Promise<Buffer[]>;
    getPendingDepositTxs(): Promise<DepositTx[]>;
    clientLog(msg: any): Promise<void>;
    getInitialWorldState(): Promise<InitialWorldState>;
    isAccountRegistered(accountPublicKey: GrumpkinAddress): Promise<boolean>;
    isAliasRegistered(alias: string): Promise<boolean>;
    isAliasRegisteredToAccount(accountPublicKey: GrumpkinAddress, alias: string): Promise<boolean>;
}
//# sourceMappingURL=rollup_provider.d.ts.map