import Node from "./Node";
import { MakeNode } from "./Node";
import { FC, useState } from "react";

const Grid: FC<{ nodeSize: Array<number> }> = ({ nodeSize }) => {
  const grid = [];

  for (let row = 0; row <= nodeSize[1]; row++) {
    //default 18
    //make row
    const currentRow = [];
    for (let col = 0; col <= nodeSize[2]; col++) {
      //default 31; big 39; small ;
      currentRow.push(MakeNode(col, row)); //push current row to node
    }
    grid.push(currentRow); // push to grid
  }

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div className={`h-${nodeSize[0]}`} key={index}>
            {row.map((node, nodeIndex) => {
              return (
                <Node
                  key={nodeIndex}
                  onClick={() => console.log(node)}
                  row={node.row}
                  col={node.col}
                  width={nodeSize[0]}
                  height={nodeSize[0]}
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
