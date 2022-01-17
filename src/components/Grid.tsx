import Node from "./Node";
import { MakeNode } from "./Node";
import { FC, useState } from "react";

const Grid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 20; col++) {
      currentRow.push(MakeNode(col, row));
    }
    grid.push(currentRow);
  }

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div key={index}>
            {row.map((node, nodeIndex) => {
              return (
                <Node key={nodeIndex} row={node.row} col={node.col}>
                  {() =>
                    console.log(
                      "row:",
                      node.row,
                      "col: ",
                      node.col,
                      "node:",
                      node
                    )
                  }
                  test
                </Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// const InitilizeGrid = () => {
//   const grid = [];
//   for (let row = 0; row < 20; row++) {
//     const currentRow: Array<number> = [];
//     for (let col = 0; col < 15; col++) {
//       currentRow.push(MakeNode(col, row));
//     }
//     grid.push(currentRow);
//     return grid;
//   }
// };

export default Grid;
