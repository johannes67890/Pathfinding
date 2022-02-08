import Cell, { CellProps, CellSize, NodeVariant, SizeGrid } from "./Cell";
import { MakeNode } from "./Cell";
import { FC, useState } from "react";
import { classNames } from "..";

const Grid: FC<{ cellSize: CellSize; nodeSelector: NodeVariant }> = ({
  cellSize,
  nodeSelector,
}) => {
  const [grid] = useState<CellProps[][]>(InitlizeGrid(cellSize, nodeSelector));

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div
            className={classNames(SizeGrid[cellSize][0], "w-max")}
            key={index}
          >
            {row.map((node, nodeIndex) => {
              return (
                <Cell
                  key={nodeIndex}
                  variant={nodeSelector}
                  onClick={() => {
                    console.log(nodeSelector);
                    console.log(node);
                  }}
                  row={node.row}
                  col={node.col}
                  size={cellSize}
                ></Cell>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

function InitlizeGrid(
  cellSize: CellSize,
  nodeSelector: NodeVariant
): CellProps[][] {
  let newGrid: CellProps[][] = [];
  for (let row = 0; row <= SizeGrid[cellSize][2]; row++) {
    const currentRow = [];
    for (let col = 0; col <= SizeGrid[cellSize][3]; col++) {
      currentRow.push(MakeNode(col, row, nodeSelector)); //push current row to node
    }
    newGrid.push(currentRow);
  }
  return newGrid; // push to grid
}

export default Grid;
