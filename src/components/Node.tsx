import React, { Children, FC } from "react";

const Node: FC<{ nodeSelector?: string; col: number; row: number }> = ({
  nodeSelector,
  row,
  col,
}) => {
  let nodeColor: string;
  switch (nodeSelector) {
    case "wall":
      nodeColor = "black";
      break;
    case "start":
      nodeColor = "green";
      break;
    case "end":
      nodeColor = "red";
      break;
    case "search":
      nodeColor = "yellow";
      break;
    default:
      nodeColor = "grey";
      console.log("Something went wrong");
      break;
  }

  return (
    <div
      id={`row-${row}, col-${col}`}
      className={`w-7 h-7 border border-gray-300 bg-${nodeColor}`}
    >
      {Children}{" "}
    </div>
  );
};

export const MakeNode = (col: number, row: any) => {
  return {
    col,
    row,
  };
};

export default Node;
