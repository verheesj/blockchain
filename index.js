import Blockchain from './blockchain.js';

const myBlockchain = new Blockchain();

myBlockchain.addBlock('Transaction 1');
myBlockchain.addBlock('Transaction 2');

console.log(myBlockchain.toJSON());
console.log(`Blockchain is valid? ${myBlockchain.isValid()}`);