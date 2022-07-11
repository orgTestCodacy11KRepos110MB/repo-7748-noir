/// <reference types="node" />
import { TxHash } from "../blockchain";
import { DefiInteractionEvent } from "./defi_interaction_event";
import { EventEmitter } from "stream";
export declare class Block {
    txHash: TxHash;
    created: Date;
    rollupId: number;
    rollupSize: number;
    encodedRollupProofData: Buffer;
    offchainTxData: Buffer[];
    interactionResult: DefiInteractionEvent[];
    gasUsed: number;
    gasPrice: bigint;
    subtreeRoot?: Buffer | undefined;
    constructor(txHash: TxHash, created: Date, rollupId: number, rollupSize: number, encodedRollupProofData: Buffer, offchainTxData: Buffer[], interactionResult: DefiInteractionEvent[], gasUsed: number, gasPrice: bigint, subtreeRoot?: Buffer | undefined);
    static deserialize(buf: Buffer, offset?: number): {
        elem: Block;
        adv: number;
    };
    static fromBuffer(buf: Buffer): Block;
    toBuffer(): Buffer;
}
export interface BlockSource extends EventEmitter {
    /**
     * Returns blocks from rollup id `from`.
     * This does not guarantee all blocks are returned. It may return a subset, and the
     * client should use `getLatestRollupId()` to determine if it needs to make further requests.
     */
    getBlocks(from: number): Promise<Block[]>;
    /**
     * Starts emitting rollup blocks.
     * All historical blocks must have been emitted before this function returns.
     */
    start(fromBlock?: number): Promise<void>;
    stop(): Promise<void>;
    on(event: "block", fn: (block: Block) => void): this;
    removeAllListeners(): this;
    getLatestRollupId(): Promise<number>;
}
export * from "./server_block_source";
export * from "./defi_interaction_event";
//# sourceMappingURL=index.d.ts.map