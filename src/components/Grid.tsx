import Cell, { CellProps, CellSize, NodeVariant, SizeGrid } from "./Cell";
import { MakeNode } from "./Cell";
import { FC, useState, useEffect } from "react";
import { classNames } from "..";
import Button from "./Button";
import { animateDijkstra, dijkstra } from "../algoritme/Dijksta";

const Grid: FC<{ cellSize: CellSize }> = ({ cellSize }) => {
  const [grid, setGrid] = useState<CellProps[][]>([]);
  const [cellClicked, setCellClicked] = useState<boolean>(false);

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
    return animateDijkstra(visitedNodesInOrder!, cellSize);
  }

  return (
    <div className="grid">
      <Button
        onClick={() => setGrid(InitlizeGridWithRandomWalls(grid))}
        classes={"h-8 my-auto rounded-none"}
      >
        Random
      </Button>
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
                    setCellClicked(!cellClicked);
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

function InitlizeGridWithRandomWalls(grid: CellProps[][]): CellProps[][] {
  let newGridWithWalls: CellProps[][] = [];
  grid.map((row, index) => {
    const currentRow: any = [];
    row.map((cell, id) => {
      if (cell == cell.isFinish || cell == cell.isStart) {
        console.log("skiped");
      } else {
        for (let i = 0; i <= grid.length; i++) {
          const count = getRandomInt(0, 10);
          if (count <= 5) {
            cell.isWall = true;
          }
          currentRow.push(cell);
          console.log(cell);
        }
      }
    });
  });
  return newGridWithWalls;
}

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
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
export default Grid;
