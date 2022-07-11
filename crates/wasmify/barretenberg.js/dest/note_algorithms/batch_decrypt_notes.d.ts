/// <reference types="node" />
import { Grumpkin } from "../ecc/grumpkin";
import { DecryptedNote } from "./decrypted_note";
import { NoteDecryptor } from "./note_decryptor/note_decryptor";
export declare const batchDecryptNotes: (viewingKeys: Buffer, privateKey: Buffer, noteDecryptor: NoteDecryptor, grumpkin: Grumpkin) => Promise<(DecryptedNote | undefined)[]>;
//# sourceMappingURL=batch_decrypt_notes.d.ts.map