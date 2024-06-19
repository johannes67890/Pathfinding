import * as utils from "../utils";
import React, { useContext } from "react";
import { CellSizeContext } from "./context/Contexts";

export enum CellSize {
  small,
  default,
  big,
}

export const SizeGrid: Record<CellSize, [string, string, number, number]> = {
  [CellSize.small]: ["h-5", "w-5", 31, 63], // norm: ["h-5", "w-5", row: 37, col: 63]
  [CellSize.default]: ["h-8", "w-8", 19, 39], // norm: ["h-8", "w-8", row: 23, col: 39]
  [CellSize.big]: ["h-10", "w-10", 15, 31], // norm: ["h-10", "w-10", row: 18, col: 31]
};

export type CellProps = {
  id: number;
  col: number;
  row: number;
  weight: number;
  className?: string;
  isFinish?: boolean;
  isStart?: boolean;
  isWall?: boolean;
  size?: CellSize;
  onClick?: () => unknown;
};

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


const Cell = React.forwardRef((props: CellProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
  const {id, onClick, className, size, isStart, isFinish, isWall } =
    props;

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
        SizeGrid[size as CellSize][0], // height
        SizeGrid[size as CellSize][1], // width
        `border border-black`
      )}
    ></button>
  );
});

export function getNeighbors(cell: CellProps, grid: CellProps[][]): CellProps[] {
  const neighbors: CellProps[] = [];
  const { col, row } = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]); // top
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // bottom
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
  return neighbors;
}

export function getAllCells(grid: CellProps[][]) {
  const cells = [];
  for (const row of grid) {
    for (const cell of row) {
      cells.push(cell);
    }
  }
  return cells;
}

export function getCellById(id: number, grid: CellProps[][]) {
  return getAllCells(grid)[id];
}

export default Cell;
