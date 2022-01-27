import Node, { NodeType, Size, SizeGrid } from "./Node";
import { MakeNode } from "./Node";
import { FC, useEffect } from "react";
import { classNames } from "..";

const Grid: FC<{ nodeSize: NodeType }> = ({ nodeSize }) => {
  const grid = [];
  for (let row = 0; row <= SizeGrid[nodeSize.size][1]; row++) {
    const currentRow = [];
    for (let col = 0; col <= SizeGrid[nodeSize.size][2]; col++) {
      currentRow.push(MakeNode(col, row)); //push current row to node
    }
    grid.push(currentRow); // push to grid
  }

  useEffect(() => {
    //might work?
    console.log(nodeSize);
  }, [nodeSize]);

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div
            className={classNames(SizeGrid[nodeSize.size][0], "w-full")}
            key={index}
          >
            {row.map((node, nodeIndex) => {
              return (
                <Node
                  key={nodeIndex}
                  onClick={() => console.log(node, "2")}
                  row={node.row}
                  col={node.col}
                  size={nodeSize.size} //component dosent render gotten paramater
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
