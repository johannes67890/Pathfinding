import { CellProps } from "../components/Cell";
import Digraph from "./structures/Digraph";
import DirectedEdge from "./structures/DirectedEdge";
import IndexMinPQ from "./structures/IndexMinPQ";
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

  private stack: DirectedEdge[] = [];

  constructor(
    G: Digraph,
    startCell: CellProps,
  ) {
    for(let i = 0; i < G.V(); i++){
      this.distTo[i] = Infinity;
    }
    this.distTo[startCell.id] = 0;

    this.pq = new IndexMinPQ<number>(G.V());
    this.pq.insert(startCell.id, 0);
    while(!this.pq.isEmpty()){
      let v = this.pq.delMin();
      for(let e of G.adj(v)){
        this.relax(e);
        this.stack.push(e);
      }
    }
  };
  
  relax(e: DirectedEdge){
    let v = e.from(), w = e.to();
    if(this.distTo[w] > this.distTo[v] + e.weight()){
      this.distTo[w] = this.distTo[v] + e.weight();
      this.edgeTo[w] = e;
      if(this.pq.contains(w)) this.pq.decreaseKey(w, this.distTo[w]);
      else this.pq.insert(w, this.distTo[w]);
    }
  }

  hasPathTo(v: number): boolean {
    return this.distTo[v] < Infinity;
  }

  pathTo(v: number): DirectedEdge[] {
    if(!this.hasPathTo(v)) throw new Error("No path to vertex");
    let path = [];
    for(let e = this.edgeTo[v]; e !== undefined; e = this.edgeTo[e.from()]){
      path.push(e);
    }
    return path.reverse();
  }

  pathToByIndex(v: number): number[] {
    if(!this.hasPathTo(v)) throw new Error("No path to vertex");
    let path: number[] = [];
    
    for(let e of this.pathTo(v)){
      path.push(e.from());
    }
  
    return path; // remove start node, to not overlap start cell in grid
  }

  visitedPath(): number[] {
    let path: number[] = [];
    for(let e of this.stack){
      path.push(e.from());
    }
    return path;
  }

  getDistTo(v: number): number {
    return this.distTo[v];
  }
}


export default Pathfinding;