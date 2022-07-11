export interface BridgeConfig {
  bridgeId: bigint;
  numTxs: number;
  // The total amount of gas the bridge is expected to use, from which we compute the fees.
  // e.g. The gas for a single tx is gas / numTxs. This can then be converted to a fee in whichever asset.
  gas: number;
  rollupFrequency: number;
}

export interface BridgeConfigJson {
  bridgeId: string;
  numTxs: number;
  rollupFrequency: number;
  gas: number;
}

export const bridgeConfigToJson = ({
  bridgeId,
  ...rest
}: BridgeConfig): BridgeConfigJson => ({
  ...rest,
  bridgeId: bridgeId.toString(),
});

export const bridgeConfigFromJson = ({
  bridgeId,
  ...rest
}: BridgeConfigJson): BridgeConfig => ({
  ...rest,
  bridgeId: BigInt(bridgeId),
});
