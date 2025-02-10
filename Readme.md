Here's a basic blockchain simulation in JavaScript that includes:  
✅ Block structure  
✅ Hashing using SHA-256  
✅ Blockchain class with add and validation methods  
✅ Proof-of-Work (Mining)  
✅ Tamper detection  

---

 
### 📌 How It Works
1. Genesis Block (First block) is created.
2. New blocks are added with dummy transactions.
3. Each block links to the previous block via hashes.
4. Proof-of-Work ensures security by making mining computationally expensive.
5. Tamper detection shows how the blockchain validates data integrity.

---

### 🏃‍♂️ Run It
1. Save the file as `blockchain.js`
2. Run using Node.js
   ```sh
   node blockchain.js
   ```

---

### 🔥 Output Example
```
⛏️ Mining blocks...

⛏️ Block 1 mined: 0000e8f77d77d6d0...
⛏️ Block 2 mined: 00008af3b41e8b32...

📝 Blockchain:
[
  {
    "index": 0,
    "timestamp": "2025-02-08T10:00:00.000Z",
    "transactions": "Genesis Block",
    "previousHash": "0",
    "nonce": 0,
    "hash": "7a234..."
  },
  {
    "index": 1,
    "timestamp": "2025-02-08T10:05:00.000Z",
    "transactions": [
      {
        "from": "Alice",
        "to": "Bob",
        "amount": 50
      }
    ],
    "previousHash": "7a234...",
    "nonce": 34567,
    "hash": "0000e8f77d77d6d0..."
  }
]

✅ Is blockchain valid? true

⚠️ Tampering with blockchain...

❌ Is blockchain valid after tampering? false
```

---

### 🎯 Features
✅ Real block structure with hash links  
✅ SHA-256 hashing for security  
✅ Proof-of-Work (adjustable difficulty)  
✅ Tampering detection  

