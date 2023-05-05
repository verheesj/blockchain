import Block from './blockchain/block.js';

export default class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block("Genesis Block", "0");
  }

  addBlock(data) {
    const previousBlock = this.getLatestBlock();
    const newBlock = new Block(data, previousBlock.hash);
    this.chain.push(newBlock);
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

  toJSON() {
    return JSON.stringify(this.chain, null, 4);
  }
}