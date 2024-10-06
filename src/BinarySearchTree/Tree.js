class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  insert(value, node = this.root) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return node;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      node.data = this.findMinValue(node.right).data;
      node.right = this.deleteItem(node.data, node.right);
    }

    return node;
  }

  findMinValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  find(value, node = this.root) {
    if (node === null || node.data === value) return node;

    if (value < node.data) return this.find(value, node.left);

    return this.find(value, node.right);
  }

  levelOrder(callback) {
    if (!callback) throw new Error("Callback function required");

    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error("Callback function required");

    if (node === null) return;

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("Callback function required");

    if (node === null) return;

    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error("Callback function required");

    if (node === null) return;

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root, currentDepth = 0) {
    if (root === null) return -1;
    if (root === node) return currentDepth;

    if (node.data < root.data)
      return this.depth(node, root.left, currentDepth + 1);
    return this.depth(node, root.right, currentDepth + 1);
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const nodesArray = [];
    this.inOrder((node) => nodesArray.push(node.data));

    this.root = this.buildTree(nodesArray);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const generateRandomArray = (length, max) => {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
};

const driver = () => {
  const randomArray = generateRandomArray(15, 100);
  console.log("Random Array: ", randomArray);

  const tree = new Tree(randomArray);

  console.log("Is tree balanced? ", tree.isBalanced());

  console.log("Level-order traversal:");
  tree.levelOrder((node) => console.log(node.data));

  console.log("Pre-order traversal:");
  tree.preOrder((node) => console.log(node.data));

  console.log("In-order traversal:");
  tree.inOrder((node) => console.log(node.data));

  console.log("Post-order traversal:");
  tree.postOrder((node) => console.log(node.data));

  prettyPrint(tree.root);

  tree.insert(150);
  tree.insert(200);
  tree.insert(250);

  console.log("Tree after adding nodes > 100:");
  prettyPrint(tree.root);

  console.log("Is tree balanced? ", tree.isBalanced());

  tree.rebalance();

  console.log("Is tree balanced after rebalancing? ", tree.isBalanced());

  console.log("Level-order traversal after rebalancing:");
  tree.levelOrder((node) => console.log(node.data));

  console.log("Pre-order traversal after rebalancing:");
  tree.preOrder((node) => console.log(node.data));

  console.log("In-order traversal after rebalancing:");
  tree.inOrder((node) => console.log(node.data));

  console.log("Post-order traversal after rebalancing:");
  tree.postOrder((node) => console.log(node.data));

  prettyPrint(tree.root);
};

driver();
