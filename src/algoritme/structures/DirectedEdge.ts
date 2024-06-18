class DirectedEdge {
    private v: number;
    private w: number;
    private _weight: number;
    constructor(v: number, w: number, weight: number) {
        this.v = v;
        this.w = w;
        this._weight = weight;
    }

    from(): number {
        return this.v;
    }

    to(): number {
        return this.w;
    }

    weight(): number {
        return this._weight;
    }

    toString(): string {
        return `${this.v} -> ${this.w}, ${this._weight}`;
    }
}
export default DirectedEdge;