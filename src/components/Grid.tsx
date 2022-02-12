import Cell, { CellProps, CellSize, NodeVariant, SizeGrid } from "./Cell";
import { MakeNode } from "./Cell";
import { FC, useState, useEffect } from "react";
import { classNames } from "..";
import Button from "./Button";
import {
  animateDijkstra,
  dijkstra,
  getAllCells,
  getCellsInShortestPathOrder,
} from "../algoritme/Dijksta";

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
    const CellsInShortestPathOrder = getCellsInShortestPathOrder(finishNode);
    return animateDijkstra(
      visitedNodesInOrder!,
      CellsInShortestPathOrder!,
      cellSize
    );
  }

  return (
    <div className="grid">
      <Button
        onClick={() => {
          InitlizeGridWithRandomWalls(grid);
          setCellClicked(!cellClicked);
        }}
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
  let cells: CellProps[] = getAllCells(grid);
  const len: CellProps[] = [];
  cells.map((cell, index) => {
    let salt = getRandomInt(0, 10);
    if (salt == 2) {
      if (cell.isStart || cell.isFinish) {
        return;
      } else {
        cell.isWall = true;
        len.push(cell);
      }
    }
  });
  newGridWithWalls.push(len);
  console.log(newGridWithWalls);

  return newGridWithWalls;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
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

export default Grid;
