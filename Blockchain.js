const crypto = require("crypto");

class Block {
  constructor(index, transactions, previousHash = "") {
    this.index = index;
    this.timestamp = new Date().toISOString();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0; // For proof-of-work
    this.hash = this.calculateHash();
  }

  // Calculate SHA-256 hash of the block
  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.transactions) +
          this.previousHash +
          this.nonce
      )
      .digest("hex");
  }

  // Proof-of-Work: Adjust nonce until hash starts with '0000'
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== "0".repeat(difficulty)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`⛏️ Block ${this.index} mined: ${this.hash}`);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4; // Increase for stronger security
  }

  createGenesisBlock() {
    return new Block(0, "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty); // Simulate mining
    this.chain.push(newBlock);
  }

  // Validate chain integrity
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false; // Block data was tampered
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false; // Blockchain was modified
      }
    }
    return true;
  }
}

// Create blockchain instance
let myBlockchain = new Blockchain();

// Add sample blocks with dummy transactions
console.log("\n⛏️ Mining blocks...\n");
myBlockchain.addBlock(new Block(1, [{ from: "Alice", to: "Bob", amount: 50 }]));
myBlockchain.addBlock(new Block(2, [{ from: "Charlie", to: "Dave", amount: 30 }]));

// Print blockchain
console.log("\n📝 Blockchain:");
console.log(JSON.stringify(myBlockchain.chain, null, 2));

// Check chain validity
console.log("\n✅ Is blockchain valid? " + myBlockchain.isChainValid());

// Tamper with blockchain
console.log("\n⚠️ Tampering with blockchain...");
myBlockchain.chain[1].transactions = [{ from: "Hacker", to: "Bob", amount: 1000 }];
myBlockchain.chain[1].hash = myBlockchain.chain[1].calculateHash();

// Check chain validity after tampering
console.log("\n❌ Is blockchain valid after tampering? " + myBlockchain.isChainValid());
