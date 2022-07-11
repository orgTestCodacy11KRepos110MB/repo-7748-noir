/// <reference types="node" />
import { BarretenbergWasm, BarretenbergWorker } from "../../wasm";
import { NoteDecryptor } from "./note_decryptor";
export declare class SingleNoteDecryptor implements NoteDecryptor {
    private worker;
    constructor(worker: BarretenbergWasm | BarretenbergWorker);
    batchDecryptNotes(keysBuf: Buffer, privateKey: Buffer): Promise<Buffer>;
}
//# sourceMappingURL=single_note_decryptor.d.ts.map