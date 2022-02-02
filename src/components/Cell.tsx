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
  variant: NodeVariant;
  size?: CellSize;
};

function Cell(props: CellProps) {
  const { onClick, variant, col, row, size } = props;

  return (
    <button
      id={`row-${row} col-${col}`}
      onClick={() => {
        if (onClick) onClick();
      }}
      className={classNames(
        variant,
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
  };
};

export default Cell;

export const SizeGrid: Record<CellSize, [string, string, number, number]> = {
  [CellSize.small]: ["h-5", "w-5", 37, 63], // norm: ["h-5", "w-5", 37, 63]
  [CellSize.default]: ["h-8", "w-8", 23, 39], // norm: ["h-8", "w-8", 23, 39]
  [CellSize.big]: ["h-10", "w-10", 18, 31], // norm: ["h-10", "w-10", 18, 31]
};
