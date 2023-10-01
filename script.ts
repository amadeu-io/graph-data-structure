// graph constructor, receives data of any type
class Graph<T> {
  // key of type T, value of type array of T
  private nodes: Map<T, T[]>;

  constructor() {
    this.nodes = new Map();
  }

  // add node
  addNode(node: T): void {
    if (!this.nodes.has(node)) {
      this.nodes.set(node, []);
    }
  }

  // add edge between two nodes
  addEdge(node1: T, node2: T): void {
    if (this.nodes.has(node1) && this.nodes.has(node2)) {
      const neighbors = this.nodes.get(node1) as T[];
      // as T[] is a type assertion: we know for sure node1 exists
      // so neighbors cannot possibly be undeifned
      neighbors.push(node2);
    } else {
      console.log("Node not found in the graph.");
    }
  }

  // remove edge between two nodes
  removeEdge(node1: T, node2: T): void {
    if (this.nodes.has(node1)) {
      const neighbors = this.nodes.get(node1) as T[];

      const index: number = neighbors.indexOf(node2);

      if (index !== -1) {
        // index exists
        neighbors.splice(index, 1);
      } else {
        // index doesn't exist
        console.log("Edge not found between the nodes.");
      }
    } else {
      console.log("Node not found in the graph.");
    }
  }

  // remove a node from the graph
  removeNode(nodeToRemove: T): void {
    if (this.nodes.has(nodeToRemove)) {
      this.nodes.delete(nodeToRemove);

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

// add nodes to the graph
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addNode("F");

// add edges to create a sample graph
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("E", "F");

graph.removeNode("A");

console.log(graph);

export {};
