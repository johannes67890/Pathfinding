import { CellProps } from "../../components/Cell";
import DirectedEdge from "./DirectedEdge";
/**
 * 
 */
class Digraph {
    private _V: number = 0;
    private _E: number = 0;
    private _adj: Bag<DirectedEdge>[] = [];
    
    constructor(cells: CellProps[]) {
        this._V = cells.length;
        for (let i = 0; i < this._V; i++) {
            this._adj[cells[i].id] = new Bag<DirectedEdge>();
        }
    }

    V(): number {
        return this._V;
    } 
    E(): number {
        return this._E;
    }
    isEmtpy(): boolean {
        return this._V === 0;
    }
    adj(v: number): Iterable<DirectedEdge> {
        return this._adj[v].iterator();
    }

    addEdge(e: DirectedEdge): void {
        let v = e.from();
        this._adj[v].add(e);
        this._E++;
    }

    edges(): Iterable<DirectedEdge> {
        let b = new Bag<DirectedEdge>();
        for (let v = 0; v < this._V; v++) {
            for (let e of this.adj(v)) {
                b.add(e);
            }
        }
        return b.iterator();
    }

    indegree(v: number): number {
        let indegree = 0;
        for (let i = 0; i < this._V; i++) {
            for (let e of this._adj[i].iterator()) {
                if (e.to() === v) indegree++;
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

class Bag<T> implements IBag<T>{
    private bag: T[] = [];
    private N: number;

    constructor() {
        this.N = 0;
    }

    add(item: T): void {
        this.bag.push(item);
        this.N++;
    }

    size(): number {
        return this.N;
    }

    iterator(): T[] {  
        return this.bag;
    }
}

export default Digraph;
