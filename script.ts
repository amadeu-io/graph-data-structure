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

  printGraph(): void {
    for (const [node, neighbors] of this.nodes.entries()) {
      const neighborString: string = neighbors.join(", ");
      console.log(`${node} -> [${neighborString}]`);
    }
  }

  // returns an array of a node's neighbors (value) of a given node, if it exists
  getNeighbors(node: T): T[] {
    if (this.nodes.has(node)) {
      const neighbors = this.nodes.get(node) as T[];
      return neighbors;
    } else {
      console.log("Node not found in the graph.");
      return [];
    }
  }

  // checks if there's an edge (connection) between two nodes
  hasEdge(node1: T, node2: T): boolean {
    if (this.nodes.has(node1)) {
      return this.nodes.get(node1)!.includes(node2);
      // ! is the non-null assertion operator,
      // which asserts that the result of .get(node1) is not null or undefined
    } else {
      console.log("Node not found in the graph.");
      return false;
    }
  }

  // perform a depth-first traversal from a starting node
  depthFirstTraversal(startNode: T, visitCallback: (node: T) => void): void {
    const visited: Set<T> = new Set<T>();

    // helper recursive function that traverses the graph
    const dfs = (node: T): void => {
      visited.add(node);

      visitCallback(node);

      const neighbors: T[] = this.getNeighbors(node);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };

    if (this.nodes.has(startNode)) {
      dfs(startNode);
    } else {
      console.log("Node not found in the graph.");
    }
  }

  // perform a breath first traveral from a starting node
  breadthFirstTraversal(startNode: T, visitCallback: (node: T) => void): void {
    const visited: Set<T> = new Set<T>();
    const queue: T[] = [];

    // if the starting node exists, start the traversal
    if (this.nodes.has(startNode)) {
      queue.push(startNode);
      visited.add(startNode);

      // loop that iterates through queue, as long as there are items on it
      while (queue.length > 0) {
        const currentNode = queue.shift() as T; // we know for sure .shift() can't return undefined
        visitCallback(currentNode);
        const neighbors: T[] = this.getNeighbors(currentNode);

        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
            visited.add(neighbor);
          }
        }
      }
    } else {
      console.log("Node not found in the graph.");
    }
  }
}

// print function
function print<T>(node: T): void {
  console.log(node);
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

graph.printGraph();

// breadth first traversal (bfs)
graph.breadthFirstTraversal("A", print); // A, B, C, D, E, F

export {};
