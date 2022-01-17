import React, { Children, FC } from "react";

const Node: FC<{
  onClick?: () => unknown;
  nodeSelector?: string;
  col: number;
  row: number;
  width: number;
  height: number;
}> = ({ nodeSelector, onClick, row, col, width, height }) => {
  // let nodeColor: string;
  // switch (nodeSelector) {
  //   case "wall":
  //     nodeColor = "black";
  //     break;
  //   case "start":
  //     nodeColor = "green";
  //     break;
  //   case "end":
  //     nodeColor = "red";
  //     break;
  //   case "search":
  //     nodeColor = "yellow";
  //     break;
  //   default:
  //     nodeColor = "grey";
  //     console.log("Something went wrong");
  //     break;
  // }

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
