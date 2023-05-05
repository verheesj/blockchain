const fs = require('fs');
const path = require('path');
const Block = require('./block.js');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const BLOCKCHAIN_FILE = path.join(DATA_DIR, 'blockchain.json');

class Blockchain {
  constructor() {
    this.chain = [];

    if (fs.existsSync(BLOCKCHAIN_FILE)) {
      const data = fs.readFileSync(BLOCKCHAIN_FILE);
      this.chain = JSON.parse(data);
    } else {
      this.chain.push(this.createGenesisBlock());
    }
  }

  createGenesisBlock() {
    return new Block("Genesis Block", "0");
  }

  addBlock(data) {
    const previousBlock = this.getLatestBlock();
    const newBlock = new Block(data, previousBlock.hash);
    this.chain.push(newBlock);
    this.saveChain();
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      const isValidBlock = currentBlock.hash === currentBlock.calculateHash();
      const isValidLink = currentBlock.previousHash === previousBlock.hash;

      if (!isValidBlock || !isValidLink) {
        return false;
      }
    }

    return true;
  }

  saveChain() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR);
    }

    fs.writeFileSync(BLOCKCHAIN_FILE, JSON.stringify(this.chain, null, 4));
  }

  toJSON() {
    return JSON.stringify(this.chain, null, 4);
  }
}

module.exports = Blockchain;