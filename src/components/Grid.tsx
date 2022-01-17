import Node from "./Node";
import { MakeNode } from "./Node";
import { FC, useState } from "react";

const Grid = () => {
  const grid = [];
  for (let row = 0; row <= 18; row++) {
    //make row
    const currentRow = [];
    for (let col = 0; col <= 31; col++) {
      currentRow.push(MakeNode(col, row)); //push current row to node
    }
    grid.push(currentRow); // push to grid
  }

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div key={index}>
            {row.map((node, nodeIndex) => {
              return (
                <Node
                  key={nodeIndex}
                  onClick={() => console.log(node)}
                  row={node.row}
                  col={node.col}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
