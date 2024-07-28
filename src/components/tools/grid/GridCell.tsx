import * as utils from "../../../utils/utils";
import React from "react";
import useCellSize from "./context/useCellSize";
import cell, { CellSize } from "@models/gridTypes";

export const MakeCell = (id: number, col: number, row: number) => {
  return {
    id,
    col,
    row,
    weight: 1,
    isStart: row === 8 && col === 8,
    isFinish: row === 8 && col === 27,
    isVisited: false,
    isWall: false,
  };
};


const GridCell = React.forwardRef((props: cell, ref: React.ForwardedRef<HTMLButtonElement>) => {
  const {id, onClick, className, size, isStart, isFinish, isWall } =
    props;
  const { cellSizeRecord } = useCellSize();

  const VariantClassName = isFinish
    ? "bg-red-500"
    : isStart
    ? "bg-green-500"
    : isWall
    ? "bg-black"
    : "";

  return (
    <button
      ref={ref}
      id={`${id}`}
      onClick={(e) => {
        if (onClick) onClick();
      }}
      className={utils.classNames(
        className,
        VariantClassName,
        cellSizeRecord[size as CellSize].className,
        `border border-black`
      )}
    ></button>
  );
});

export function getNeighbors(cell: cell, grid: cell[][]): cell[] {
  const neighbors: cell[] = [];
  const { col, row } = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]); // top
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // bottom
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
  return neighbors;
}

export function getAllCells(grid: cell[][]) {
  const cells = [];
  for (const row of grid) {
    for (const cell of row) {
      cells.push(cell);
    }
  }
  return cells;
}

export function getCellById(id: number, grid: cell[][]) {
  return getAllCells(grid)[id];
}

export default GridCell;
