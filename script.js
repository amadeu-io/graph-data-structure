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
      // at each iteration, node is the key and neighbors is the value of each node
      for (const [node, neighbors] of this.nodes.entries()) {
        if (neighbors.includes(nodeToRemove)) {
          this.removeEdge(node, nodeToRemove);
        }
      }
    } else {
      console.log("Node not found in the graph.");
    }
  }

  // perform a depth first traveral from a starting node
  depthFirstTraversal(startNode, visitCallback) {
    // a set is similar to an array, but it contains only unique values
    // and it's elements don't have an order
    // visited keeps track of all the visited nodes, ensuring the nodes are not
    // visited more than once during the traversal
    const visited = new Set();

    // helper recursive function that traverses the graph
    const dfs = (node) => {
      // add current node to visited set (mark as visited)
      visited.add(node);

      // process current node
      visitCallback(node);

      // retreive neighbors of current node
      const neighbors = this.getNeighbors(node);

      // iterate through all the neighbors of current node
      // navigate to any neighbors that have not been visited (not in visited set)
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };

    // call dfs from the specified starting node, if it exists
    if (this.nodes.has(startNode)) {
      dfs(startNode);
    } else {
      console.log("Node not found in the graph.");
    }
  }

  // perform a breath first traveral from a starting node
  breadthFirstTraversal(startNode, visitCallback) {
    // keeps track of visited nodes
    const visited = new Set();

    // initialize empty queue to mantain the order of the nodes visited
    const queue = [];

    // if the starting node exists, start the traversal
    if (this.nodes.has(startNode)) {
      // add starting node to queue and visited to iniciate the traversal
      queue.push(startNode);
      visited.add(startNode);

      // loop that iterates through queue, as long as there are items on it
      while (queue.length > 0) {
        // dequeue current node
        const currentNode = queue.shift();

        // process currentnode
        visitCallback(currentNode);

        // retreive neighbors of current node
        const neighbors = this.getNeighbors(currentNode);

        // explore all neighbors of current node that have not been visited yet, add them
        // to queue to be visited and mark as visibecomested
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
            visited.add(neighbor);
          }
        }

        // the iteration keeps going, visiting all nodes in the queue until all
        // have been visited and the queue is empty
      }
    } else {
      console.log("Node not found in the graph.");
    }
  }
}

// print callback
function print(node) {
  console.log(node);
}

// example usage:
const graph = new Graph();

// create nodes
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");

// connect nodes
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");

graph.printGraph();

// get neighbors
console.log(graph.getNeighbors("B")); // 'D'

// check edges
console.log(graph.hasEdge("A", "B")); // true
console.log(graph.hasEdge("B", "A")); // false

// remove a node (notice how "C" is effectively removed from "A" neighbors list as well)
graph.removeNode("C");
graph.printGraph();

// re-add the node and the previous edge
graph.addNode("C");
graph.addEdge("A", "C");
graph.printGraph();

// depth-first traversal
console.log("DFT:");
graph.depthFirstTraversal("A", print);

// breadth-first traversal
console.log("BFT:");
graph.breadthFirstTraversal("A", print);
