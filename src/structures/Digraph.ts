import VertexType from "@models/generics";
import DirectedEdge from "./DirectedEdge";
/**
 *
 */

class Digraph<T extends VertexType> {
  private _V: number = 0;

  private _E: number = 0;

  private _adj: Bag<DirectedEdge>[] = [];

  private _grid: T[][];

  constructor(vertices: T[] | T[][]) {
    // grid of cells
    if (vertices[0] instanceof Array) {
      this._grid = vertices as T[][];

      // Create a bag for each cell in the grid
      const cells: T[] = [];
      for (const row of this._grid) for (const cell of row) cells.push(cell);

      this._V = cells.length;
      for (let i = 0; i < this._V; i++) {
        this._adj[cells[i].id] = new Bag<DirectedEdge>();
      }
      return;
    }
    // array of cells
    vertices = vertices as T[];
    this._V = vertices.length;
    for (let i = 0; i < this._V; i++) {
      this._adj[vertices[i].id] = new Bag<DirectedEdge>();
    }
  }

  V(): number {
    return this._V;
  }

  E(): number {
    return this._E;
  }

  grid(): T[][] {
    return this._grid;
  }

  gridWidth(): number {
    return this._grid[0].length;
  }

  gridHeight(): number {
    return this._grid[1].length;
  }

  isEmtpy(): boolean {
    return this._V === 0;
  }

  adj(v: number): Iterable<DirectedEdge> {
    return this._adj[v].iterator();
  }

  addEdge(e: DirectedEdge): void {
    const v = e.from();
    this._adj[v].add(e);
    this._E += 1;
  }

  edges(): Iterable<DirectedEdge> {
    const b = new Bag<DirectedEdge>();
    for (let v = 0; v < this._V; v++) {
      for (const e of this.adj(v)) {
        b.add(e);
      }
    }
    return b.iterator();
  }

  indegree(v: number): number {
    let indegree = 0;
    for (let i = 0; i < this._V; i++) {
      for (const e of this._adj[i].iterator()) {
        if (e.to() === v) indegree += 1;
      }
    }
    return indegree;
  }

  outdegree(v: number): number {
    return this._adj[v].iterator().length;
  }
}

interface IBag<T> {
  add(item: T): void;
  size(): number;
}

class Bag<T> implements IBag<T> {
  private bag: T[] = [];

  private N: number;

  constructor() {
    this.N = 0;
  }

  add(item: T): void {
    this.bag.push(item);
    this.N += 1;
  }

  size(): number {
    return this.N;
  }

  iterator(): T[] {
    return this.bag;
  }
}

export default Digraph;
