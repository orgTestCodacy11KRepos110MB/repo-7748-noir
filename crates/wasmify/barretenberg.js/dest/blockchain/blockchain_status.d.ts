/// <reference types="node" />
import { EthAddress } from "../address";
declare type Jsonify<T> = {
    [P in keyof T]: T[P] extends EthAddress | bigint | Buffer ? string : T[P] extends Object ? Jsonify<T[P]> : T[P];
};
export declare enum TxType {
    DEPOSIT = 0,
    TRANSFER = 1,
    WITHDRAW_TO_WALLET = 2,
    WITHDRAW_TO_CONTRACT = 3,
    ACCOUNT = 4,
    DEFI_DEPOSIT = 5,
    DEFI_CLAIM = 6
}
export declare const numTxTypes = 7;
export declare function isDefiDepositTx(txType: TxType): boolean;
export declare function isAccountTx(txType: TxType): boolean;
export interface BlockchainAsset {
    address: EthAddress;
    decimals: number;
    symbol: string;
    name: string;
    gasLimit: number;
}
export declare type BlockchainAssetJson = Jsonify<BlockchainAsset>;
export declare const blockchainAssetToJson: ({ address, ...asset }: BlockchainAsset) => BlockchainAssetJson;
export declare const blockchainAssetFromJson: ({ address, ...asset }: BlockchainAssetJson) => BlockchainAsset;
export interface BlockchainBridge {
    id: number;
    address: EthAddress;
    gasLimit: number;
}
export declare type BlockchainBridgeJson = Jsonify<BlockchainBridge>;
export declare const blockchainBridgeToJson: ({ address, ...bridge }: BlockchainBridge) => BlockchainBridgeJson;
export declare const blockchainBridgeFromJson: ({ address, ...bridge }: BlockchainBridgeJson) => BlockchainBridge;
export interface BlockchainStatus {
    chainId: number;
    rollupContractAddress: EthAddress;
    verifierContractAddress: EthAddress;
    nextRollupId: number;
    dataSize: number;
    dataRoot: Buffer;
    nullRoot: Buffer;
    rootRoot: Buffer;
    defiRoot: Buffer;
    defiInteractionHashes: Buffer[];
    escapeOpen: boolean;
    allowThirdPartyContracts: boolean;
    numEscapeBlocksRemaining: number;
    assets: BlockchainAsset[];
    bridges: BlockchainBridge[];
}
export declare type BlockchainStatusJson = Jsonify<BlockchainStatus>;
export declare function blockchainStatusToJson(status: BlockchainStatus): BlockchainStatusJson;
export declare function blockchainStatusFromJson(json: BlockchainStatusJson): BlockchainStatus;
export interface BlockchainStatusSource {
    getBlockchainStatus(): BlockchainStatus;
}
export {};
//# sourceMappingURL=blockchain_status.d.ts.map