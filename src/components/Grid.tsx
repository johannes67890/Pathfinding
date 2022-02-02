import Cell, { CellProps, SizeGrid } from "./Cell";
import { MakeNode } from "./Cell";
import { FC } from "react";
import { classNames } from "..";
import { NodeSelectorType } from "./Header";

const Grid: FC<{ nodeSize: NodeType; nodeSelector: NodeSelectorType }> = ({
  nodeSize,
  nodeSelector,
}) => {
  const grid = [];
  for (let row = 0; row <= SizeGrid[nodeSize.size][2]; row++) {
    const currentRow = [];
    for (let col = 0; col <= SizeGrid[nodeSize.size][3]; col++) {
      currentRow.push(MakeNode(col, row)); //push current row to node
    }
    grid.push(currentRow); // push to grid
  }

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div
            className={classNames(SizeGrid[nodeSize.size][0], "w-max")}
            key={index}
          >
            {row.map((node, nodeIndex) => {
              return (
                <Cell
                  key={nodeIndex}
                  variant={nodeSelector}
                  onClick={() => console.log(node)}
                  row={node.row}
                  col={node.col}
                  // size={nodeSize.size}
                ></Cell>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
