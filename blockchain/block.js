import SHA256 from 'crypto-js/sha256';

export default class Block {
    constructor(data, previousHash) {
        this.data = data;
        this.timestamp = Date.now();
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(`${this.data}${this.timestamp}${this.previousHash}`).toString();
    }
}