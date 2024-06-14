class DirectedEdge {
    private _v: number;
    private _w: number;
    private _weight: number;
    constructor(v: number, w: number, weight: number) {
        this._v = v;
        this._w = w;
        this._weight = weight;
    }


    from(): number {
        return this._v;
    }

    to(): number {
        return this._w;
    }

    weight(): number {
        return this._weight;
    }

    toString(): string {
        return `${this._v} -> ${this._w} ${this._weight}`;
    }
}