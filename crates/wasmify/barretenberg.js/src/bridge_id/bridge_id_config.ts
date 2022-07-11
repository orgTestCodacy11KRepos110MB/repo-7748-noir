export const virtualAssetIdFlag = 1 << 29;
export const virtualAssetIdPlaceholder = 1 << 29;

export const ADDRESS_BIT_LEN = 32;
export const INPUT_ASSET_ID_A_LEN = 30;
export const OUTPUT_ASSET_ID_A_LEN = 30;
export const OUTPUT_ASSET_ID_B_LEN = 30;
export const INPUT_ASSET_ID_B_LEN = 30;
export const BITCONFIG_LEN = 32;
export const AUX_DATA_LEN = 64;

export const ADDRESS_OFFSET = 0;
export const INPUT_ASSET_ID_A_OFFSET = ADDRESS_BIT_LEN;
export const INPUT_ASSET_ID_B_OFFSET =
  INPUT_ASSET_ID_A_OFFSET + INPUT_ASSET_ID_A_LEN;
export const OUTPUT_ASSET_ID_A_OFFSET =
  INPUT_ASSET_ID_B_OFFSET + INPUT_ASSET_ID_B_LEN;
export const OUTPUT_ASSET_ID_B_OFFSET =
  OUTPUT_ASSET_ID_A_OFFSET + OUTPUT_ASSET_ID_A_LEN;
export const BITCONFIG_OFFSET =
  OUTPUT_ASSET_ID_B_OFFSET + OUTPUT_ASSET_ID_B_LEN;
export const AUX_DATA_OFFSET = BITCONFIG_OFFSET + BITCONFIG_LEN;
