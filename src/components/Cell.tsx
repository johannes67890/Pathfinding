import * as utils from "../utils";
import React, { useContext } from "react";
import { CellSizeContext } from "./Contexts";

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
    //weight: weight,
    isStart: row === 8 && col === 8,
    isFinish: row === 8 && col === 27,
    isVisited: false,
    isWall: false,
    previousCell: null,
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

export default Cell;
