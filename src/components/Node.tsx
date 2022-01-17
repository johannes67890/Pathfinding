import React, { Children, FC } from "react";

const Node: FC<{
  onClick?: () => unknown;
  nodeSelector?: string;
  col: number;
  row: number;
}> = ({ nodeSelector, onClick, row, col }) => {
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
      id={`row-${row}col-${col}`}
      onClick={() => {
        if (onClick) onClick();
      }}
      // className={`w-7 h-7 border border-gray-300 bg-${nodeColor}`}
      className={`h-10 w-10 p-3 border border-black`}
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
