import Node from "@models/generics";
import Cell from "@models/gridTypes";
import { Vertex } from "@models/graphTypes";
import Digraph from "../structures/Digraph";
import DirectedEdge from "../structures/DirectedEdge";
import IndexMinPQ from "../structures/IndexMinPQ";
/**
 * Dijkstra search algorithm\
 * *Breadth-first search algorithm*
 *
 * @param grid Grid of cells
 * @param startCell Start cell
 * @param finishCell Finish cell
 * @returns Array of cells of evaluated cells
 */
class Pathfinding {
  private distTo: number[] = [];

  private edgeTo: DirectedEdge[] = [];

  private pq: IndexMinPQ<number>;

  private visited: DirectedEdge[] = [];

  private G: Digraph<Node>;

  constructor(
    G: Digraph<Node>,
    startCell: Node,
    finishCell: Node,
    astar?: boolean,
  ) {
    this.G = G;
    for (let i = 0; i < G.V(); i++) {
      this.distTo[i] = Infinity;
    }
    this.distTo[startCell.id] = 0;

    this.pq = new IndexMinPQ<number>(G.V());
    this.pq.insert(startCell.id, 0);
    while (!this.pq.isEmpty()) {
      const v = this.pq.delMin();

      for (const e of G.adj(v)) {
        if (astar)
          this.relax(
            e,
            this.getDistToDest(e.to(), finishCell as Cell | Vertex),
          );
        else this.relax(e, 0);

        this.visited.push(e);
      }
    }
  }

  relax(e: DirectedEdge, huristic: number) {
    const v = e.from();
    const w = e.to();
    if (this.distTo[w] > this.distTo[v] + e.weight()) {
      this.distTo[w] = this.distTo[v] + e.weight();
      this.edgeTo[w] = e;

      if (this.pq.contains(w))
        this.pq.decreaseKey(w, this.distTo[w] + huristic);
      else this.pq.insert(w, this.distTo[w] + huristic);
    }
  }

  hasPathTo(v: number): boolean {
    return this.distTo[v] < Infinity;
  }

  pathTo(v: number): DirectedEdge[] {
    if (!this.hasPathTo(v)) throw new Error("No path to vertex");
    const path = [];
    for (let e = this.edgeTo[v]; e !== undefined; e = this.edgeTo[e.from()]) {
      path.push(e);
    }
    return path.reverse();
  }

  pathToByIndex(v: number): number[] {
    if (!this.hasPathTo(v)) throw new Error("No path to vertex");
    const path: number[] = [];

    for (const e of this.pathTo(v)) {
      path.push(e.from());
    }

    return path; // remove start node, to not overlap start cell in grid
  }

  visitedPath(): number[] {
    const path: number[] = [];
    for (const e of this.visited) {
      path.push(e.from());
    }
    return path;
  }

  getDistTo(v: number): number {
    return this.distTo[v];
  }

  getDistToDest<T extends Cell | Vertex>(v: number, finishCell: T): number {
    // if(finishCell instanceof Cell) return this.manhattan(v, finishCell as cell);
    // else if(finishCell instanceof Vertex) return this.euclidean(v, finishCell as vertex);
    return this.manhattan(v, finishCell as Cell);
    // else throw new Error("Unknown type of finish cell");
  }

  // private euclidean(v: vertex, finishCell: vertex): Vector2 {

  // }

  private manhattan(v: number, finishCell: Cell): number {
    // Get v row and col from index
    const { row, col } = {
      row: v / this.G.gridWidth(),
      col: v % this.G.gridWidth(),
    };

    const h = Math.abs(row - finishCell.row) + Math.abs(col - finishCell.col);
    return h;
  }
}

export default Pathfinding;
