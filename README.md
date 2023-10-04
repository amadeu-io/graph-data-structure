![languages](https://img.shields.io/badge/languages-ts-blue)
![license](https://img.shields.io/badge/license-MIT-green)

# Graph Data Structure 🔗

### About 📖

A data graph is a data structure used to represent and model relationships between various pieces of data. It consists of nodes and edges, where nodes represent data points, and edges represent the connections between them.

Graphs can be directed, where each edge has a direction, or indirected, where they do not. Graphs can also be unweighted, or weighted. In an unweighted graph, each edge between nodes has the same "weight" or "cost," often represented as 1. In a weighted graph, each edge is assigned a numerical value or weight that represents some quantitative measure of the relationship or the cost associated with traversing that edge.

#### Direction of a graph

- **Directed:** Each edge has a direction.
- **Indirected:** Each edge doesn't have a direction.

#### Weight of a graph

- **Weighted:** Each edge is assigned a numerical value or weight.
- **Unweighted:** Each edge between nodes has the same weight, often represented as 1.

Graphs have many real world applications, like organizing users in a social network, modeling user-item interactions for personalized recommendations, analizing website structures and page relationships, mapping road systems, flight routes, public transportation etc.

### Description 📚

This repo implements a directed, unweighted Graph Data Structure in TypeScript, with some methods to modify and traverse the graph. A JavaScript version with more comments about the logic is also provided.

### Resources Used 💡

- [GPT](https://chat.openai.com)

### Challenges 😅

- The `shortestPath()` algorithm and the use of Maps, which is a new concept for me.

### Methods 🔧

- ➕ `addNode(node)`: Adds a new node to the graph.

- 🌟 `addEdge(node1, node2)`: Adds edge between two nodes.

- ❌ `removeNode(node)`: Removes a node from the graph.

- ➖ `removeEdge(node1, node2)`: Remove edge (connection) between two nodes.

- 📜 `printGraph()`: Utility method to print the entire graph.

- 🏡 `getNeighbors(node)`: Retrieves all neighbor nodes of a given node.

- ➡️ `hasEdge(node1, node2)`: Checks if there is an edge (connection) between two nodes.

- 🌐 `isConnected()`: Checks if the graph is connected.

- 🚀 `depthFirstTraversal(startNode, visitCallback)`: Performs a depth-first traversal of the graph.

- 🌊 `breadthFirstTraversal(startNode, visitCallback)`: Performs a breadth-first traversal of the graph.

- 🛤️ `shortestPath(startNode, endNode)`: Finds the shortest path between two nodes in the graph.

### Usage 🖊️

To get started with the Graph data structure and its methods, follow these steps:

**1. Create a graph instance**

```typescript
const graph = new Graph();
```

**2. Add nodes to the graph**

```typescript
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addNode("F");
```

**3. Add edges**

```typescript
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("E", "F");
```

**4. Print the graph**

If we `console.log(graph)` it looks like this

```typescript
Graph {
 nodes: Map(6) {
   'A' => [ 'B' ],
   'B' => [ 'C', 'D' ],
   'C' => [ 'E' ],
   'D' => [ 'E' ],
   'E' => [ 'F' ],
   'F' => []
 }
}
```

For a cleaner representation, we can use `graph.printGraph()`:

```typescript
A -> [B]
B -> [C, D]
C -> [E]
D -> [E]
E -> [F]
F -> []
```

**5. Get neighbors of a node**

```typescript
console.log(graph.getNeighbors("B")); // [ 'C', 'D' ]
```

**6. Let's try the `hasEdge()` method**

```typescript
console.log(graph.hasEdge("A", "B")); // true
console.log(graph.hasEdge("A", "E")); // false
```

**7. Check if the graph is connected**

```typescript
console.log(graph.isConnected()); // true
```

**8. Perform depth-first traversal**

Starting from node "A" and using a `print` callback function

```typescript
graph.depthFirstTraversal("A", print); // A, B, C, E, F, D
```

**9. Perform breadth-first traversal**

Starting from node "A" and using a `print` callback function

```typescript
graph.breadthFirstTraversal("A", print); // A, B, C, D, E, F
```

**10. Find the shortest path between two nodes**

```typescript
console.log(graph.shortestPath("A", "F")); // A, B, C, E, F
```
