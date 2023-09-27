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
}

export {};
