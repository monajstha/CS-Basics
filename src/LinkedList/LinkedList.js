import Node from "./Node.js";

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  isEmpty() {
    return this.head === null;
  }

  prepend(value) {
    // Add the value as head when the list is empty
    if (this.isEmpty()) {
      this.head = new Node(value, this.head);
      return;
    }

    // copy the current head
    let temp = this.head;

    // Argument 'value' is the new head and previous head (temp) is its nextNode
    this.head = new Node(value, temp);
  }

  append(value) {
    if (this.isEmpty()) {
      this.prepend(value);
      return;
    }

    let temp = this.head;
    while (temp.nextNode !== null) {
      temp = temp.nextNode;
    }
    temp.nextNode = new Node(value, null);
  }

  size() {
    if (this.isEmpty()) return null;
    let count = 0;
    let temp = this.head;
    while (temp !== null) {
      temp = temp.nextNode;
      count++;
    }
    return count;
  }

  getHead() {
    return this.head;
  }

  tail() {
    if (this.isEmpty()) return null;
    let temp = this.head;
    while (temp.nextNode !== null) {
      temp = temp.nextNode;
    }
    return temp;
  }

  at(index) {
    if (this.isEmpty()) return null;
    if (index >= this.size()) return "Err: Out of bound";

    let nodeIndex = 0;
    let temp = this.head;
    while (temp.nextNode !== null && index !== nodeIndex) {
      temp = temp.nextNode;
      nodeIndex++;
    }
    return temp;
  }

  pop() {
    if (this.isEmpty()) return;

    // Use prev variable to keep track of previous node
    let prev;
    let temp = this.head;
    while (temp.nextNode !== null) {
      prev = temp;
      temp = temp.nextNode;
    }

    // Set the previous node's nextNode to null to remove the last element
    prev.nextNode = null;
  }

  contains(value) {
    if (this.isEmpty()) return false;

    let temp = this.head;
    while (temp !== null) {
      if (temp.value.toLowerCase() === value.toLowerCase()) {
        return true;
      }
      temp = temp.nextNode;
    }
    return false;
  }

  find(value) {
    if (this.isEmpty()) return false;

    let temp = this.head;
    let index = 0;
    while (temp !== null) {
      if (temp.value === value) {
        return index;
      }
      temp = temp.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    if (this.isEmpty()) return null;

    let str = "";
    let temp = this.head;
    while (temp !== null) {
      str += `(${temp.value}) -> `;
      if (temp.nextNode === null) {
        str += "null";
      }
      temp = temp.nextNode;
    }
    return str;
  }

  insertAt(value, index) {
    if (this.isEmpty()) return null;

    if (index > this.size()) return null;

    // Append if the index is equal to the size of the list
    if (index === this.size()) {
      this.append(value);
      return;
    }

    let prev;
    let nodeIndex = 0;
    let temp = this.head;

    // Check if the insertion is at head
    if (index === 0) {
      this.head = new Node(value, temp);
      return;
    }

    // Check if the nextNode isn't null and index is not equal to the nodeIndex
    while (temp.nextNode !== null && index !== nodeIndex) {
      prev = temp;
      temp = temp.nextNode;
      nodeIndex++;
    }

    // If index and nodeIndex are equal, set the new value
    temp = new Node(value, temp);
    // Point the nextNode of the previous node to the added node
    prev.nextNode = temp;
  }

  removeAt(index) {
    if (this.isEmpty()) return null;
    if (index >= this.size()) return null;

    let prev;
    let nodeIndex = 0;
    let temp = this.head;
    if (index === 0) {
      this.head = temp.nextNode;
      return;
    }

    // loop till the nexNode isn't null and index isn't equal to the nodeIndex
    while (temp.nextNode !== null && index !== nodeIndex) {
      prev = temp;
      temp = temp.nextNode;
      nodeIndex++;
    }

    // Shift the previous node's pointer to the element next to deleted node
    prev.nextNode = temp.nextNode;
  }
}

export default LinkedList;
