class Graph {
  constructor() {
    // every graph that's created using the Graph class will be an object with a key  of nodes
    // and a value that's a map containing the graph
    this.nodes = new Map();
  }

  addNode(node) {
    if (!this.nodes.has(node)) {
      // set(key, value): adds or updates a key-value pair in the map
      this.nodes.set(node, []);
    }
  }

  // directed edges (they have a direction)
  addEdge(node1, node2) {
    if (this.nodes.has(node1) && this.nodes.has(node2)) {
      // get retreives the value of the key-value pair
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
}

// example usage:
const graph = new Graph();

// create nodes
graph.addNode("A");
graph.addNode("B");

// create an edge between nodes
graph.addEdge("A", "B");

// print the graph
graph.printGraph();
