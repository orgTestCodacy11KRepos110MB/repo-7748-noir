"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinSplitTx = void 0;
const account_id_1 = require("../../account_id");
const address_1 = require("../../address");
const bigint_buffer_1 = require("../../bigint_buffer");
const merkle_tree_1 = require("../../merkle_tree");
const note_algorithms_1 = require("../../note_algorithms");
const serialize_1 = require("../../serialize");
class JoinSplitTx {
    constructor(proofId, publicValue, publicOwner, publicAssetId, numInputNotes, inputNoteIndices, merkleRoot, inputNotePaths, inputNotes, outputNotes, claimNote, accountPrivateKey, aliasHash, accountRequired, accountIndex, accountPath, spendingPublicKey, backwardLink, allowChain) {
        this.proofId = proofId;
        this.publicValue = publicValue;
        this.publicOwner = publicOwner;
        this.publicAssetId = publicAssetId;
        this.numInputNotes = numInputNotes;
        this.inputNoteIndices = inputNoteIndices;
        this.merkleRoot = merkleRoot;
        this.inputNotePaths = inputNotePaths;
        this.inputNotes = inputNotes;
        this.outputNotes = outputNotes;
        this.claimNote = claimNote;
        this.accountPrivateKey = accountPrivateKey;
        this.aliasHash = aliasHash;
        this.accountRequired = accountRequired;
        this.accountIndex = accountIndex;
        this.accountPath = accountPath;
        this.spendingPublicKey = spendingPublicKey;
        this.backwardLink = backwardLink;
        this.allowChain = allowChain;
    }
    toBuffer() {
        return Buffer.concat([
            (0, serialize_1.numToUInt32BE)(this.proofId),
            (0, bigint_buffer_1.toBufferBE)(this.publicValue, 32),
            this.publicOwner.toBuffer32(),
            (0, serialize_1.numToUInt32BE)(this.publicAssetId),
            (0, serialize_1.numToUInt32BE)(this.numInputNotes),
            (0, serialize_1.numToUInt32BE)(this.inputNoteIndices[0]),
            (0, serialize_1.numToUInt32BE)(this.inputNoteIndices[1]),
            this.merkleRoot,
            this.inputNotePaths[0].toBuffer(),
            this.inputNotePaths[1].toBuffer(),
            this.inputNotes[0].toBuffer(),
            this.inputNotes[1].toBuffer(),
            this.outputNotes[0].toBuffer(),
            this.outputNotes[1].toBuffer(),
            this.claimNote.toBuffer(),
            this.accountPrivateKey,
            this.aliasHash.toBuffer32(),
            Buffer.from([+this.accountRequired]),
            (0, serialize_1.numToUInt32BE)(this.accountIndex),
            this.accountPath.toBuffer(),
            this.spendingPublicKey.toBuffer(),
            this.backwardLink,
            (0, serialize_1.numToUInt32BE)(this.allowChain),
        ]);
    }
    static fromBuffer(buf) {
        let dataStart = 0;
        const proofId = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const publicValue = (0, bigint_buffer_1.toBigIntBE)(buf.slice(dataStart, dataStart + 32));
        dataStart += 32;
        const publicOwner = new address_1.EthAddress(buf.slice(dataStart, dataStart + 32));
        dataStart += 32;
        const publicAssetId = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const numInputNotes = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const inputNoteIndices = [
            buf.readUInt32BE(dataStart),
            buf.readUInt32BE(dataStart + 4),
        ];
        dataStart += 8;
        const merkleRoot = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const inputNotePath0 = merkle_tree_1.HashPath.deserialize(buf, dataStart);
        dataStart += inputNotePath0.adv;
        const inputNotePath1 = merkle_tree_1.HashPath.deserialize(buf, dataStart);
        dataStart += inputNotePath1.adv;
        const inputNote0 = note_algorithms_1.TreeNote.fromBuffer(buf.slice(dataStart));
        dataStart += note_algorithms_1.TreeNote.SIZE;
        const inputNote1 = note_algorithms_1.TreeNote.fromBuffer(buf.slice(dataStart));
        dataStart += note_algorithms_1.TreeNote.SIZE;
        const outputNote0 = note_algorithms_1.TreeNote.fromBuffer(buf.slice(dataStart));
        dataStart += note_algorithms_1.TreeNote.SIZE;
        const outputNote1 = note_algorithms_1.TreeNote.fromBuffer(buf.slice(dataStart));
        dataStart += note_algorithms_1.TreeNote.SIZE;
        const claimNote = note_algorithms_1.ClaimNoteTxData.fromBuffer(buf.slice(dataStart));
        dataStart += note_algorithms_1.ClaimNoteTxData.SIZE;
        const accountPrivateKey = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const aliasHash = new account_id_1.AliasHash(buf.slice(dataStart + 4, dataStart + 32));
        dataStart += 32;
        const accountRequired = !!buf[dataStart];
        dataStart += 1;
        const accountIndex = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const accountPath = merkle_tree_1.HashPath.deserialize(buf, dataStart);
        dataStart += accountPath.adv;
        const spendingPublicKey = new address_1.GrumpkinAddress(buf.slice(dataStart, dataStart + 64));
        dataStart += 64;
        const backwardLink = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const allowChain = buf.readUInt32BE(dataStart);
        return new JoinSplitTx(proofId, publicValue, publicOwner, publicAssetId, numInputNotes, inputNoteIndices, merkleRoot, [inputNotePath0.elem, inputNotePath1.elem], [inputNote0, inputNote1], [outputNote0, outputNote1], claimNote, accountPrivateKey, aliasHash, accountRequired, accountIndex, accountPath.elem, spendingPublicKey, backwardLink, allowChain);
    }
}
exports.JoinSplitTx = JoinSplitTx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbl9zcGxpdF90eC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnRfcHJvb2ZzL2pvaW5fc3BsaXRfcHJvb2Yvam9pbl9zcGxpdF90eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBNkM7QUFDN0MsMkNBQTREO0FBQzVELHVEQUE2RDtBQUM3RCxtREFBNkM7QUFDN0MsMkRBQWtFO0FBQ2xFLCtDQUFnRDtBQUVoRCxNQUFhLFdBQVc7SUFDdEIsWUFDUyxPQUFlLEVBQ2YsV0FBbUIsRUFDbkIsV0FBdUIsRUFDdkIsYUFBcUIsRUFDckIsYUFBcUIsRUFDckIsZ0JBQTBCLEVBQzFCLFVBQWtCLEVBQ2xCLGNBQTBCLEVBQzFCLFVBQXNCLEVBQ3RCLFdBQXVCLEVBQ3ZCLFNBQTBCLEVBQzFCLGlCQUF5QixFQUN6QixTQUFvQixFQUNwQixlQUF3QixFQUN4QixZQUFvQixFQUNwQixXQUFxQixFQUNyQixpQkFBa0MsRUFDbEMsWUFBb0IsRUFDcEIsVUFBa0I7UUFsQmxCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUNyQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVU7UUFDMUIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixtQkFBYyxHQUFkLGNBQWMsQ0FBWTtRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQzFCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQUN6QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLG9CQUFlLEdBQWYsZUFBZSxDQUFTO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQ3BCLGdC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