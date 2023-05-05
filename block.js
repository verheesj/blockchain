const SHA256 = require('crypto-js/sha256');

class Block {
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

module.exports = Block;