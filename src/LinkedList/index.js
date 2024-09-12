import LinkedList from "./LinkedList.js";

const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

// Testing the prepend function
list.prepend("lion");

// Testing the isEmpty function
console.log("Is List empty? ", list.isEmpty());

// Testing the size function
console.log("Size: ", list.size());

// Testing the getHead function
console.log("Get Head: ", list.getHead());

// Testing the tail function
console.log("Get Tail: ", list.tail());

// Testing the 'at' function
console.log("Node at index 4: ", list.at(4));

// Testing the pop function
list.pop();
console.log("List after pop: ", list.toString());

// Testing the contains function
console.log("Contains Turtle: ", list.contains("turtle"));

// Testing find function
console.log("Index of dog", list.find("dog"));

// Testing inserAt function
list.insertAt("giraffe", list.size());

// Testing toString
console.log("List after inserting giraffe", list.toString());

// Testing the removeAt function
list.removeAt(0);
console.log("List after remove: ", list.toString());
