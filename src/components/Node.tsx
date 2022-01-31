import { classNames } from "..";

export type NodeType = {
  onClick?: () => unknown;
  col?: number;
  row?: number;
  size: Size;
};
export enum Size {
  small,
  default,
  big,
}
export const SizeGrid: Record<Size, [string, string, number, number]> = {
  [Size.small]: ["h-5", "w-5", 37, 63], // norm: ["h-5", "w-5", 37, 63]
  [Size.default]: ["h-8", "w-8", 23, 39], // norm: ["h-8", "w-8", 23, 39]
  [Size.big]: ["h-10", "w-10", 18, 31], // norm: ["h-10", "w-10", 18, 31]
};

function Node(props: NodeType) {
  const { onClick, col, row, size } = props;
  return (
    <button
      id={`row-${row} col-${col}`}
      onClick={() => {
        if (onClick) onClick();
      }}
      className={classNames(
        SizeGrid[size][0], // height
        SizeGrid[size][1], // width
        `border border-black`
      )}
    ></button>
  );
}
Node.defaultProps = {
  size: Size.default,
};

export const MakeNode = (col: number, row: number) => {
  return {
    col,
    row,
  };
};

export default Node;
