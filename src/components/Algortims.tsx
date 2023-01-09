import React, { useContext, useRef, useEffect } from "react";
import { CellProps, CellSize, SizeGrid } from "./Cell";
import {
  Algorithm,
  CellSizeContext,
  ControlContext,
  GridContext,
} from "./Contexts";
import { animateShortestPath, dijkstra } from "../algoritme/Dijksta";
import { getCellsInShortestPathOrder } from "../algoritme/Dijksta";
import { Timer } from "../utils";

function Algortims(
  grid: CellProps[][],
  cellSize: CellSize,
  algorithm: string,
  speed: number
) {
  // TODO: make this dynamic
  const startNode =
    grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
      Math.round(SizeGrid[cellSize][3] / 3 / 1.35)
    ];
  const finishNode =
    grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
      Math.round((SizeGrid[cellSize][3] / 2) * 1.35)
    ];

  switch (algorithm) {
    case Algorithm.Dijksta:
      return AnimateDijkstra(
        dijkstra(grid, startNode, finishNode),
        getCellsInShortestPathOrder(finishNode),
        cellSize,
        speed
      );

    // case "A*":

    //   Astar();
    //   break;

    default:
      return null;
  }
}

function AnimateDijkstra(
  visitedNodesInOrder: CellProps[],
  ShortestPathOrder: CellProps[],
  cellSize: CellSize,
  speed: number
) {
  console.log(speed);

  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    const cell = visitedNodesInOrder[i];

    setTimeout(() => {
      document.getElementById(
        `row-${cell.row} col-${cell.col}`
      )!.className = `animate-visited-cell border border-black w-8 h-8`;
    }, speed * i);

    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(ShortestPathOrder, cellSize);
      }, speed * i);
      return;
    }
  }
}

const Astar = () => {
  const { cellSize } = useContext(CellSizeContext);
};

export default Algortims;
