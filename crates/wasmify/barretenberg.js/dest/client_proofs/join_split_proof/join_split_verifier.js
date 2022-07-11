"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinSplitVerifier = void 0;
class JoinSplitVerifier {
    async computeKey(pippenger, g2Data) {
        this.worker = pippenger.getWorker();
        await this.worker.transferToHeap(g2Data, 0);
        await this.worker.call("join_split__init_verification_key", pippenger.getPointer(), 0);
    }
    async getKey() {
        const keySize = await this.worker.call("join_split__get_new_verification_key_data", 0);
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
        await this.worker.call("join_split__init_verification_key_from_buffer", keyPtr, 0);
        await this.worker.call("bbfree", keyPtr);
    }
    async verifyProof(proof) {
        const proofPtr = await this.worker.call("bbmalloc", proof.length);
        await this.worker.transferToHeap(proof, proofPtr);
        const verified = (await this.worker.call("join_split__verify_proof", proofPtr, proof.length))
            ? true
            : false;
        await this.worker.call("bbfree", proofPtr);
        return verified;
    }
}
exports.JoinSplitVerifier = JoinSplitVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbl9zcGxpdF92ZXJpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnRfcHJvb2ZzL2pvaW5fc3BsaXRfcHJvb2Yvam9pbl9zcGxpdF92ZXJpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFhLGlCQUFpQjtJQUdyQixLQUFLLENBQUMsVUFBVSxDQUFDLFNBQTBCLEVBQUUsTUFBa0I7UUFDcEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDcEIsbUNBQW1DLEVBQ25DLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFDdEIsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU07UUFDakIsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDcEMsMkNBQTJDLEVBQzNDLENBQUMsQ0FDRixDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FDeEIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3BDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQ3JCLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FDeEQsQ0FBQztRQUNGLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQ2xCLE1BQTBCLEVBQzFCLE1BQWMsRUFDZCxNQUFrQjtRQUVsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDcEIsK0NBQStDLEVBQy9DLE1BQU0sRUFDTixDQUFDLENBQ0YsQ0FBQztRQUNGLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWE7UUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDdEMsMEJBQTBCLEVBQzFCLFFBQVEsRUFDUixLQUFLLENBQUMsTUFBTSxDQUNiLENBQUM7WUFDQSxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDVixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUExREQsOENBMERDIn0=