class HashMap {
  constructor(capacity = 16, size = 0, loadFactor = 0.75) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.size = size;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  //   Generate a hashCode
  hash(key, capacity) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  //   Set the key value pair in the map
  set(key, value) {
    // Resize the HashTable if the size of the table is almost equal to
    if (this.length() / this.capacity >= this.loadFactor) {
      console.log("Resizing...");
      this.resize();
    }

    const index = this.hash(key, this.capacity);
    const bucket = this.buckets[index];

    if (!bucket.length) {
      bucket.push({
        [key]: value,
        nextNode: null,
      });
      this.size++;
    } else {
      // Traverse the linked list to find the end
      let curr = this.buckets[index][0];
      let prev;

      while (curr) {
        // Replace the value with new value if the key exists in the current node
        if (curr[key]) {
          curr[key] = value;
          return;
        }
        prev = curr;
        curr = curr.nextNode;
      }

      // Add the new node if the key doesn't exist in the current node
      prev.nextNode = {
        [key]: value,
        nextNode: null,
      };
      this.size++;
    }
  }

  //   Resize the hash table
  resize() {
    // Increase the Hash Table capacity by twice its previous size
    const newCapacity = this.capacity * 2;
    const newBuckets = new Array(newCapacity).fill(null).map(() => []);

    for (let i = 0; i < this.buckets.length; i++) {
      let curr = this.buckets[i][0];

      while (curr) {
        let validKey = Object.keys(curr).filter(
          (key) => typeof curr[key] !== "object"
        )[0];

        // Calculate the new index based on the new hash table size
        const newHashKey = this.hash(validKey, newCapacity);

        // Insert the current node into the new bucket array
        let newBucket = newBuckets[newHashKey];

        if (!newBucket.length) {
          newBucket.push({
            [validKey]: curr[validKey],
            nextNode: null,
          });
        } else {
          // If there are already elements, handle the chaining (collision resolution)
          let prev = null;
          let newCurr = newBucket[0];

          // Traverse the new linked list to find the end
          while (newCurr) {
            prev = newCurr;
            newCurr = newCurr.nextNode;
          }

          // Add the current node from the old table to the end of the new linked list
          prev.nextNode = {
            [validKey]: curr[validKey],
            nextNode: null,
          };
        }

        curr = curr.nextNode;
      }
    }

    this.capacity = newCapacity;
    this.buckets = newBuckets;
  }

  get(key) {
    const index = this.hash(key, this.capacity);
    const bucket = this.buckets[index];

    // Return null if there isn't any value in the bucket
    if (!bucket.length) return null;

    let curr = this.buckets[index][0];

    // Check until the curr is null
    while (curr) {
      // Return the value if the key exists
      if (curr[key]) {
        return curr[key];
      }
      curr = curr.nextNode;
    }

    return curr;
  }

  hasKey(key) {
    return !!this.get(key) ? true : false;
  }

  remove(key) {
    const index = this.hash(key, this.capacity);
    const bucket = this.buckets[index];

    if (!bucket.length) return false;
    if (!this.hasKey(key)) return false;

    let curr = this.buckets[index][0];
    let prev;

    // Check if the key is at the head of the node
    if (curr[key]) {
      this.buckets[index][0] = curr.nextNode;
      this.size--;
      return true;
    }

    while (!curr[key]) {
      prev = curr;
      curr = curr.nextNode;
    }
    prev.nextNode = curr.nextNode;
    this.size--;
    return true;
  }

  length() {
    return this.size;
  }

  clear() {
    // Set the capacity to initial size
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    return this.buckets;
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let curr = this.buckets[i][0];
      //   Loop till the curr isn't null
      while (curr) {
        keys = keys.concat(
          Object.keys(curr).filter((key) => typeof curr[key] !== "object")
        );
        // update the curr to it's nextNode
        curr = curr.nextNode;
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      let curr = this.buckets[i][0];
      while (curr) {
        values = values.concat(
          Object.values(curr).filter((value) => typeof value !== "object")
        );
        curr = curr.nextNode;
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    let keys = this.keys();
    let values = this.values();
    for (let i = 0; i < keys.length; i++) {
      entries.push([keys[i], values[i]]);
    }
    return entries;
  }
}

export default HashMap;
