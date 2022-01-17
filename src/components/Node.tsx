import React, { Children, FC } from "react";

const Node: FC<{
  onClick?: () => unknown;
  col: number;
  row: number;
  width: number;
  height: number;
}> = ({ onClick, row, col, width, height }) => {
  return (
    <button
      id={`row-${row} col-${col}`}
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`h-${height} w-${width} border border-black`} //default h-10 w-10
    ></button>
  );
};

export const MakeNode = (col: number, row: number) => {
  return {
    col,
    row,
  };
};

export default Node;
