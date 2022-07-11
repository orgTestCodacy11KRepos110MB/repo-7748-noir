"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountVerifier = void 0;
class AccountVerifier {
    async computeKey(pippenger, g2Data) {
        this.worker = pippenger.getWorker();
        await this.worker.transferToHeap(g2Data, 0);
        await this.worker.call("account__init_verification_key", pippenger.getPointer(), 0);
    }
    async getKey() {
        const keySize = await this.worker.call("account__get_new_verification_key_data", 0);
        const keyPtr = Buffer.from(await this.worker.sliceMemory(0, 4)).readUInt32LE(0);
        const buf = Buffer.from(await this.worker.sliceMemory(keyPtr, keyPtr + keySize));
        await this.worker.call("bbfree", keyPtr);
        return buf;
    }
    async loadKey(worker, keyBuf, g2Data) {
        this.worker = worker;
        const keyPtr = await this.worker.call("bbmalloc", keyBuf.length);
        await this.worker.transferToHeap(g2Data, 0);
        await this.worker.transferToHeap(keyBuf, keyPtr);
        await this.worker.call("account__init_verification_key_from_buffer", keyPtr, 0);
        await this.worker.call("bbfree", keyPtr);
    }
    async verifyProof(proof) {
        const proofPtr = await this.worker.call("bbmalloc", proof.length);
        await this.worker.transferToHeap(proof, proofPtr);
        const verified = (await this.worker.call("account__verify_proof", proofPtr, proof.length))
            ? true
            : false;
        await this.worker.call("bbfree", proofPtr);
        return verified;
    }
}
exports.AccountVerifier = AccountVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF92ZXJpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnRfcHJvb2ZzL2FjY291bnRfcHJvb2YvYWNjb3VudF92ZXJpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFhLGVBQWU7SUFHbkIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUEwQixFQUFFLE1BQWtCO1FBQ3BFLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3BCLGdDQUFnQyxFQUNoQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQ3RCLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFNO1FBQ2pCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3BDLHdDQUF3QyxFQUN4QyxDQUFDLENBQ0YsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQ3hCLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNwQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUNyQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQ3hELENBQUM7UUFDRixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN6QyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUNsQixNQUEwQixFQUMxQixNQUFjLEVBQ2QsTUFBa0I7UUFFbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3BCLDRDQUE0QyxFQUM1QyxNQUFNLEVBQ04sQ0FBQyxDQUNGLENBQUM7UUFDRixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFhO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3RDLHVCQUF1QixFQUN2QixRQUFRLEVBQ1IsS0FBSyxDQUFDLE1BQU0sQ0FDYixDQUFDO1lBQ0EsQ0FBQyxDQUFDLElBQUk7WUFDTixDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ1YsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0MsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBMURELDBDQTBEQyJ9