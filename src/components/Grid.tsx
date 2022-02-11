import Cell, { CellProps, CellSize, NodeVariant, SizeGrid } from "./Cell";
import { MakeNode } from "./Cell";
import { FC, useState, useEffect } from "react";
import { classNames } from "..";
import Button from "./Button";
import { dijkstra } from "../algoritme/Dijksta";

const Grid: FC<{ cellSize: CellSize }> = ({ cellSize }) => {
  const [grid, setGrid] = useState<CellProps[][]>([]);

  useEffect(() => {
    setGrid(InitlizeGrid(cellSize));
  }, [cellSize]);

  function playDijkstra() {
    const startNode =
      grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
        Math.round(SizeGrid[cellSize][3] / 3 / 1.35)
      ];
    const finishNode =
      grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
        Math.round((SizeGrid[cellSize][3] / 2) * 1.35)
      ];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    return animateDijkstra(visitedNodesInOrder!);
  }

  function animateDijkstra(visitedNodesInOrder: CellProps[]) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const cell = visitedNodesInOrder[i];

        document.getElementById(
          `row-${cell.row} col-${cell.col}`
        )!.className = `animate-visited-cell bg-blue-500 border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
        console.log(document.getElementById(`node-${cell.row}-${cell.col}`)!);
      }, 10 * i);
    }
  }

  return (
    <div className="grid">
      <Button onClick={playDijkstra} classes={"h-8 my-auto rounded-none"}>
        Run
      </Button>
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
                  isVisited={node.isVisited}
                  isFinish={node.isFinish}
                  isStart={node.isStart}
                  isWall={node.isWall}
                  distance={node.distance}
                  onClick={() => {
                    node.isWall = true;
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

function InitlizeGrid(cellSize: CellSize): CellProps[][] {
  let newGrid: CellProps[][] = [];
  for (let row = 0; row <= SizeGrid[cellSize][2]; row++) {
    const currentRow: any = [];
    for (let col = 0; col <= SizeGrid[cellSize][3]; col++) {
      currentRow.push(MakeNode(col, row, cellSize)); //push current row to node
    }
    newGrid.push(currentRow);
  }
  return newGrid; // push to grid
}

export default Grid;
