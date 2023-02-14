import * as utils from "../utils";
import React from "react";

export enum CellSize {
  small,
  default,
  big,
}

export const SizeGrid: Record<CellSize, [string, string, number, number]> = {
  [CellSize.small]: ["h-5", "w-5", 33, 63], // norm: ["h-5", "w-5", row: 37, col: 63]
  [CellSize.default]: ["h-8", "w-8", 20, 39], // norm: ["h-8", "w-8", row: 23, col: 39]
  [CellSize.big]: ["h-10", "w-10", 16, 31], // norm: ["h-10", "w-10", row: 18, col: 31]
};

export type CellProps = {
  onClick?: () => unknown;
  className?: string;
  col: number;
  row: number;
  size?: CellSize;
  isStart: { col: number; row: number };
  isFinish: { col: number; row: number };
  isWall: boolean;
  isVisited: boolean;
  distance: number;
  previousNode: CellProps;
  cost: { hCost: number; fCost: number; gCost: number };
};

const Cell = React.forwardRef((props: CellProps) => {
  const { onClick, className, col, row, size, isStart, isFinish, isWall } =
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
      id={`row-${row} col-${col}`}
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

export const MakeNode = (col: number, row: number, cellSize: CellSize) => {
  const STARTCELL: Array<Number> = [
    Math.round(SizeGrid[cellSize][2] / 2 / 1.2),
    Math.round(SizeGrid[cellSize][3] / 3 / 1.35),
  ];
  const FINISHCELL: Array<Number> = [
    Math.round(SizeGrid[cellSize][2] / 2 / 1.2),
    Math.round((SizeGrid[cellSize][3] / 2) * 1.35),
  ];
  
  return {
    col,
    row,
    cost: { gCost: 0, fCost: 0, hCost: 0 },
    isStart: row === STARTCELL[0] && col === STARTCELL[1],
    isFinish: row === FINISHCELL[0] && col === FINISHCELL[1],
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export default Cell;
