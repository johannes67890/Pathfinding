/**
 * 
 */
class Digraph {
    private _V: number;
    private _E: number;
    private adj: Bag<DirectedEdge>[];
    
    constructor() {
        this._V = 0;
        this._E = 0;
        this.adj = [];    
    }

    V(): number {
        return this._V;
    } 
    E(): number {
        return this._E;
    }
    getAdj(): Bag<DirectedEdge>[] {
        return this.adj;
    }

    addEdge(e: DirectedEdge): void {
        let v = e.from();
        this.adj[v].add(e);
        this._E++;
    }
}

interface IBag<T> {
    add(item: T): void;
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

    iterator(): T[] {  
        return this.bag;
    }
}
