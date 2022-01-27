import Node, { NodeType, Size, SizeGrid } from "./Node";
import { MakeNode } from "./Node";
import { FC } from "react";

const Grid: FC<{ nodeSize: NodeType }> = ({ nodeSize }) => {
  const grid = [];
  for (let row = 0; row <= SizeGrid[nodeSize.size][1]; row++) {
    const currentRow = [];
    for (let col = 0; col <= SizeGrid[nodeSize.size][2]; col++) {
      currentRow.push(MakeNode(col, row)); //push current row to node
    }
    grid.push(currentRow); // push to grid
  }

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div className={SizeGrid[nodeSize.size][0]} key={index}>
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
