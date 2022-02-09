import { classNames } from "..";

export enum NodeVariant {
  startNode,
  endNode,
  wall,
  visited,
  visiting,
}

export enum CellSize {
  small,
  default,
  big,
}

export type CellProps = {
  onClick?: () => unknown;
  col: number;
  row: number;
  size?: CellSize;
  isStart: { col: number; row: number };
  isFinish: { col: number; row: number };
  isWall: boolean;
};

function Cell(props: CellProps) {
  const { onClick, col, row, size, isStart, isFinish, isWall } = props;

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
      onClick={() => {
        if (onClick) onClick();
      }}
      className={classNames(
        VariantClassName,
        SizeGrid[size as CellSize][0], // height
        SizeGrid[size as CellSize][1], // width
        `border border-black`
      )}
    ></button>
  );
}

Cell.defaultProps = {
  size: CellSize.default,
};

export const MakeNode = (col: number, row: number) => {
  return {
    col,
    row,
    isStart: row === 10 && col === 15,
    isFinish: row === 10 && col === 30,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export default Cell;

export const SizeGrid: Record<CellSize, [string, string, number, number]> = {
  [CellSize.small]: ["h-5", "w-5", 37, 63], // norm: ["h-5", "w-5", 37, 63]
  [CellSize.default]: ["h-8", "w-8", 23, 39], // norm: ["h-8", "w-8", 23, 39]
  [CellSize.big]: ["h-10", "w-10", 18, 31], // norm: ["h-10", "w-10", 18, 31]
};
