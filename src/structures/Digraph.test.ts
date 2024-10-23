import { describe, expect, test, beforeEach } from "@jest/globals";
import Cell from "@models/gridTypes";
import Digraph from "./Digraph";
import DirectedEdge from "./DirectedEdge";

let G: Digraph<Cell>;
const cells: Cell[] = [
  { id: 0, row: 0, col: 0, weight: 1 },
  { id: 1, row: 0, col: 1, weight: 1 },
  { id: 2, row: 0, col: 2, weight: 1 },
  { id: 3, row: 1, col: 0, weight: 1 },
  { id: 4, row: 1, col: 1, weight: 1 },
  { id: 5, row: 1, col: 2, weight: 1 },
  { id: 6, row: 2, col: 0, weight: 1 },
  { id: 7, row: 2, col: 1, weight: 1 },
  { id: 8, row: 2, col: 2, weight: 1 },
];

beforeEach(() => {
  G = new Digraph(cells);
  G.addEdge(new DirectedEdge(cells[0].id, cells[1].id, 1));
  G.addEdge(new DirectedEdge(cells[1].id, cells[2].id, 1));
  G.addEdge(new DirectedEdge(cells[2].id, cells[3].id, 1));
  G.addEdge(new DirectedEdge(cells[3].id, cells[4].id, 1));
  G.addEdge(new DirectedEdge(cells[4].id, cells[3].id, 1));
  G.addEdge(new DirectedEdge(cells[6].id, cells[7].id, 1));
  G.addEdge(new DirectedEdge(cells[6].id, cells[1].id, 1));
});

describe("Init Digraph", () => {
  test("size of graph", () => {
    expect(G.V()).toBe(9);
    expect(G.E()).toBe(7);
  });

  test("indegree of a vertex", () => {
    expect(G.indegree(3)).toBe(2);
  });

  test("outdegree of a vertex", () => {
    expect(G.outdegree(3)).toBe(1);
  });

  test("vertex validation", () => {
    expect(G.adj(3)).toEqual(
      new Array(new DirectedEdge(cells[3].id, cells[4].id, 1)),
    );

    expect(G.adj(6)).toEqual([
      new DirectedEdge(cells[6].id, cells[7].id, 1),
      new DirectedEdge(cells[6].id, cells[1].id, 1),
    ]);
  });
});

describe("Add edge", () => {
  test("add a new edge", () => {
    G.addEdge(new DirectedEdge(cells[4].id, cells[5].id, 1));
    expect(G.E()).toBe(8);
  });
});
