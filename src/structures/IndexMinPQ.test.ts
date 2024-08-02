import { describe, expect, test, beforeEach } from "@jest/globals";
import IndexMinPQ from "./IndexMinPQ";

let pq: IndexMinPQ<number>;

beforeEach(() => {
  pq = new IndexMinPQ<number>(10);
  pq.insert(0, 14);
  pq.insert(1, 9);
  pq.insert(2, 7);
  pq.insert(3, 8);
  pq.insert(4, 6);
  pq.insert(5, 5);
});

describe("Init IndexMinPQ", () => {
  test("Size", () => {
    expect(pq.size()).toBe(6);
  });
  test("isEmpty", () => {
    expect(pq.isEmpty()).toBe(false);
  });
  test("contains", () => {
    expect(pq.contains(3)).toBe(true);

    // expect(pq.contains(-20)).toThrowError();
    expect(pq.contains(9)).toBe(false);
  });
});

describe("Heap functions", () => {
  test("insert", () => {
    pq.insert(6, 4);
    expect(pq.size()).toBe(7);
    expect(pq.keyOf(6)).toBe(4);
  });
  test("exchange posision", () => {});
});
