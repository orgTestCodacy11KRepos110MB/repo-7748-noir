/// <reference types="node" />
import { WorkerPool } from "../../wasm";
import { NoteDecryptor } from "./note_decryptor";
export declare class PooledNoteDecryptor implements NoteDecryptor {
    private pool;
    constructor(workerPool: WorkerPool);
    batchDecryptNotes(keysBuf: Buffer, privateKey: Buffer): Promise<Buffer>;
}
//# sourceMappingURL=pooled_note_decryptor.d.ts.map