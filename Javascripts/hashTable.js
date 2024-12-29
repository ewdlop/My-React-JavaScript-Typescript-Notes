// Creating a hash table using a Map
let hashTable = new Map();

// Adding key-value pairs
hashTable.set("name", "Alice");
hashTable.set("age", 30);
hashTable.set("city", "New York");

// Retrieving values
console.log(hashTable.get("name")); // Output: Alice
console.log(hashTable.get("age"));  // Output: 30

// Checking if a key exists
console.log(hashTable.has("city")); // Output: true

// Deleting a key-value pair
hashTable.delete("city");
console.log(hashTable.has("city")); // Output: false
