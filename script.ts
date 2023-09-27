// graph constructor, receives data of any type
class Graph<T> {
  // key of type T
  // value of type array of T
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
      neighbors.push(node2);
    } else {
      console.log("Node not found in the graph.");
    }
  }
}

export {};
