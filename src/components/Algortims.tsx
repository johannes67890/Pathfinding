import React, { useContext, useRef, useEffect } from "react";
import { CellProps, CellSize, SizeGrid } from "./Cell";
import { Algorithm, CellSizeContext } from "./Contexts";
import { animateShortestPath, dijkstra } from "../algoritme/Dijksta";
import { getCellsInShortestPathOrder } from "../algoritme/Dijksta";

function Algortims(
  grid: CellProps[][],
  cellSize: CellSize,
  algorithm: string,
  speed: number,
  playing: boolean,
  setSolved: React.Dispatch<React.SetStateAction<boolean>>,
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
      
      
      AnimateDijkstra(
        dijkstra(grid, startNode, finishNode),
        getCellsInShortestPathOrder(finishNode),
        cellSize,
        speed,
        playing,
        setSolved,
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
  speed: number,
  playing: boolean,
  setSolved: React.Dispatch<React.SetStateAction<boolean>>,
) {
  let i = 0;

  const Interval = setInterval(() => {
    const cell = visitedNodesInOrder[i];

    if (playing) {
      return;
    }
    document.getElementById(
      `row-${cell.row} col-${cell.col}`
    )!.className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;

    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(ShortestPathOrder, cellSize);
      }, 250);
      clearInterval(Interval);
      setSolved(true);
      return;
    }

    i++;
  }, speed);
}

const Astar = () => {
  const { cellSize } = useContext(CellSizeContext);
};

export default Algortims;
