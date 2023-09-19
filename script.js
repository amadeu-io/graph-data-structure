class Graph {
  constructor() {
    // every graph that's created using the Graph class will be an object with a key of nodes
    // and a value that's a map containing the graph
    this.nodes = new Map();
  }

  addNode(node) {
    // has(key): checks if a key exists in the map and returns a Boolean
    // so the if statement prevents the addition of a duplicate node with the same key
    if (!this.nodes.has(node)) {
      // set(key, value): adds or updates a key-value pair in the map
      this.nodes.set(node, []);
    }
  }

  // directed edges (they have a direction)
  addEdge(node1, node2) {
    // makes sure node1 & node2 exist
    if (this.nodes.has(node1) && this.nodes.has(node2)) {
      // get(key): retreives the value of the key-value pair
      // in this case, it's a list containing the linked nodes
      // in wich node2 is added
      this.nodes.get(node1).push(node2);
    } else {
      console.log("Node not found in the graph.");
    }
  }

  printGraph() {
    for (const [node, neighbors] of this.nodes.entries()) {
      const neighborString = neighbors.join(", ");
      console.log(`${node} -> [${neighborString}]`);
    }
  }

  // returns an array of a node's neighbors (value) of a given node, if it exists
  getNeighbors(node) {
    if (this.nodes.has(node)) {
      return this.nodes.get(node);
    } else {
      console.log("Node not found in the graph.");
      return [];
    }
  }

  // checks if there's an edge (connection) between two nodes
  hasEdge(node1, node2) {
    if (this.nodes.has(node1)) {
      // includes() method checks whether a value exists within an array, returns Boolean
      return this.nodes.get(node1).includes(node2);
    } else {
      console.log("Node not found in the graph.");
      return false;
    }
  }

  // remove edge (connection) between node1 and node2
  removeEdge(node1, node2) {
    if (this.nodes.has(node1)) {
      // list of neighbors of node1
      const neighbors = this.nodes.get(node1);

      // index of the node2 in the neighbors array of node1
      const index = neighbors.indexOf(node2);

      // if the index is not -1 (it exists), remove it
      if (index !== -1) {
        neighbors.splice(index, 1);
      } else {
        console.log("Edge not found between the nodes.");
      }
    } else {
      console.log("Node not found in the graph.");
    }
  }

  // remove a node from the graph
  removeNode(nodeToRemove) {
    // find & remove the nodeToRemove
    // delete(key): removes a key-value pair from the map
    if (this.nodes.has(nodeToRemove)) {
      this.nodes.delete(nodeToRemove);

      // remove any edges connected to the node
      // loop iterates over the whole map's entries (nodes)
      // at each iteration, node is the key and neighbors is the value
      for (const [node, neighbors] of this.nodes.entries()) {
        if (neighbors.includes(nodeToRemove)) {
          this.removeEdge(node, nodeToRemove);
        }
      }
    } else {
      console.log("Node not found in the graph.");
    }
  }
}

// example usage:
const graph = new Graph();

// create nodes
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");

// connect nodes
graph.addEdge("A", "B");
graph.addEdge("B", "C");

// get neighbors
console.log(graph.getNeighbors("B")); // 'C'

// check edges
console.log(graph.hasEdge("A", "B")); // true
console.log(graph.hasEdge("B", "A")); // false

// print the graph
graph.printGraph();

// remove edge
//graph.removeEdge("B", "C");

console.log("-----");

// remove a node
graph.removeNode("C");

// print the graph
graph.printGraph();
