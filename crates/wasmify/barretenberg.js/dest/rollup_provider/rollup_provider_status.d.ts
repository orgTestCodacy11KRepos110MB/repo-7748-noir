import { EthAddress } from "../address";
import { BlockchainStatus, BlockchainStatusJson } from "../blockchain";
import { BridgeConfig, BridgeConfigJson } from "./bridge_config";
import { BridgeStatus, BridgeStatusJson } from "./bridge_status";
import { PrivacySet, PrivacySetJson } from "./privacy_set";
export * from "./bridge_config";
export * from "./bridge_status";
export * from "./privacy_set";
export interface RuntimeConfig {
    acceptingTxs: boolean;
    useKeyCache: boolean;
    publishInterval: number;
    flushAfterIdle: number;
    gasLimit: number;
    verificationGas: number;
    maxFeeGasPrice: bigint;
    feeGasPriceMultiplier: number;
    feeRoundUpSignificantFigures: number;
    maxFeePerGas: bigint;
    maxPriorityFeePerGas: bigint;
    maxUnsettledTxs: number;
    defaultDeFiBatchSize: number;
    bridgeConfigs: BridgeConfig[];
    feePayingAssetIds: number[];
    privacySets: {
        [key: number]: PrivacySet[];
    };
    rollupBeneficiary?: EthAddress;
}
export interface RuntimeConfigJson {
    acceptingTxs: boolean;
    useKeyCache: boolean;
    publishInterval: number;
    flushAfterIdle: number;
    gasLimit: number;
    verificationGas: number;
    maxFeeGasPrice: string;
    feeGasPriceMultiplier: number;
    feeRoundUpSignificantFigures: number;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    maxUnsettledTxs: number;
    defaultDeFiBatchSize: number;
    bridgeConfigs: BridgeConfigJson[];
    feePayingAssetIds: number[];
    privacySets: {
        [key: string]: PrivacySetJson[];
    };
    rollupBeneficiary?: string;
}
export declare const runtimeConfigToJson: ({ maxFeeGasPrice, maxFeePerGas, maxPriorityFeePerGas, bridgeConfigs, privacySets, rollupBeneficiary, ...rest }: RuntimeConfig) => RuntimeConfigJson;
export declare const runtimeConfigFromJson: ({ maxFeeGasPrice, maxFeePerGas, maxPriorityFeePerGas, bridgeConfigs, privacySets, rollupBeneficiary, ...rest }: RuntimeConfigJson) => RuntimeConfig;
export declare const partialRuntimeConfigFromJson: ({ maxFeeGasPrice, maxFeePerGas, maxPriorityFeePerGas, bridgeConfigs, privacySets, rollupBeneficiary, ...rest }: Partial<RuntimeConfigJson>) => Partial<RuntimeConfig>;
export interface RollupProviderStatus {
    blockchainStatus: BlockchainStatus;
    nextPublishTime: Date;
    nextPublishNumber: number;
    numTxsPerRollup: number;
    numTxsInNextRollup: number;
    numUnsettledTxs: number;
    pendingTxCount: number;
    runtimeConfig: RuntimeConfig;
    bridgeStatus: BridgeStatus[];
    proverless: boolean;
    rollupSize: number;
}
export interface RollupProviderStatusJson {
    blockchainStatus: BlockchainStatusJson;
    nextPublishTime: string;
    nextPublishNumber: number;
    numTxsPerRollup: number;
    numTxsInNextRollup: number;
    numUnsettledTxs: number;
    pendingTxCount: number;
    runtimeConfig: RuntimeConfigJson;
    bridgeStatus: BridgeStatusJson[];
    proverless: boolean;
    rollupSize: number;
}
export declare const rollupProviderStatusToJson: ({ blockchainStatus, nextPublishTime, runtimeConfig, bridgeStatus, ...rest }: RollupProviderStatus) => RollupProviderStatusJson;
export declare const rollupProviderStatusFromJson: ({ blockchainStatus, nextPublishTime, runtimeConfig, bridgeStatus, ...rest }: RollupProviderStatusJson) => RollupProviderStatus;
//# sourceMappingURL=rollup_provider_status.d.ts.map