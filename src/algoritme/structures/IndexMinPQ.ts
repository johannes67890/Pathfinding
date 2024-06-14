class IndexMinPQ<Key> {
    private maxN: number;
    private n: number;
    private pq: number[];
    private qp: number[];
    private keys: Key[];
    constructor(maxN: number) {
        if (maxN < 0) throw new Error('maxN must be nonnegative');
        this.n = 0;
        this.maxN = maxN;
        this.keys = new Array(maxN + 1);
        this.pq = new Array(maxN + 1);
        this.qp = new Array(maxN);
        for (let i = 0; i <= maxN; i++)
            this.qp[i] = -1;
    }

    isEmpty(): boolean {
        return this.n === 0;
    }

    contains(i: number): boolean {
        this.validateIndex(i);
        return this.qp[i] !== -1;
    }

    size(): number {
        return this.n;
    }

    minIndex(): number {
        return this.pq[1];
    }

    minKey(): Key {
        return this.keys[this.pq[1]];
    }

    delMin(): number {
        if(this.n == 0) throw new Error('Priority queue underflow');
        const min = this.pq[1];
        this.exch(1, this.n--);
        this.sink(1);
        if(!(this.qp[min] === -1)) throw new Error('Index is not in the priority queue');
        this.qp[min] = -1; // delete
        this.keys[min] = undefined as any; // to help with garbage collection
        this.pq[this.n + 1] = -1; // not needed
        return min;
    }
    
    insert(i: number, key: Key): void {
        this.validateIndex(i);
        this.n++;
        this.qp[i] = this.n;
        this.pq[this.n] = i;
        this.keys[i] = key;
        this.swim(this.n);
    }

    keyOf(i: number): Key | null {
        if (i < 0 || i >= this.maxN) throw new Error('index out of bounds');
        if (!this.contains(i)) throw new Error('index is not in the priority queue');
        return this.keys[i];
    }

    decreaseKey(i: number, key: Key): void {
        if (i < 0 || i >= this.maxN) throw new Error('index out of bounds');
        if (!this.contains(i)) throw new Error('index is not in the priority queue');
        if (this.keys[i] <= key) throw new Error('Calling decreaseKey() with given argument would not strictly decrease the key');
        this.keys[i] = key;
        this.swim(this.qp[i]);
    }


    /**
     * Exchange `i` and `j` in the priority queue.
     */
    exch(i: number, j: number): void {
        const swap = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = swap;
        this.qp[this.pq[i]] = i;
        this.qp[this.pq[j]] = j;
    }

    greater(i: number, j: number): boolean {
        return this.keys[this.pq[i]] > this.keys[this.pq[j]];
    }

    swim(k: number): void {
        while (k > 1 && this.greater(Math.floor(k / 2), k)) {
            this.exch(k, Math.floor(k / 2));
            k = Math.floor(k / 2);
        }
    }

    sink(k: number): void {
        while (2 * k <= this.n) {
            let j = 2 * k;
            if (j < this.n && this.greater(j, j + 1)) j++;
            if (!this.greater(k, j)) break;
            this.exch(k, j);
            k = j;
        }
    }
    private validateIndex(i: number): void {
        if (i < 0) throw new Error('index is negative: ' + i);
        if (i >= this.maxN) throw new Error('index is greater than capacity: ' + i);
    }
}
export default IndexMinPQ;