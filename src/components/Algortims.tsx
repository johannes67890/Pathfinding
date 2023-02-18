import React, { useContext } from "react";
import { CellProps, SizeGrid } from "./Cell";
import {
  Algorithm,
  CellSizeContext,
  ControlContext,
  GridContext,
  SpeedContext,
} from "./Contexts";
import {
  dijkstra,
  getCellsInShortestPathOrderDijkstra,
} from "../algoritme/Dijksta";
import astar, { getCellsInShortestPathOrderAstar } from "../algoritme/Astar";

const Algortims: React.FC<{ ongoing: boolean }> = ({ ongoing }) => {
  const { cellSize } = useContext(CellSizeContext);
  const { grid } = useContext(GridContext);
  const { algorithm } = useContext(ControlContext);

  const startNode =
    grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
      Math.round(SizeGrid[cellSize][3] / 3 / 1.35)
    ];
  const finishNode =
    grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
      Math.round((SizeGrid[cellSize][3] / 2) * 1.35)
    ];
    switch (algorithm) {
    case Algorithm.Dijksta: return <AnimateDijkstra startNode={startNode} finishNode={finishNode} />
    case Algorithm.Astar: return <AnimateAstar startNode={startNode} finishNode={finishNode} />
    default: return <AnimateDijkstra startNode={startNode} finishNode={finishNode} />
  }
      
};

const AnimateDijkstra: React.FC<{
  startNode: CellProps;
  finishNode: CellProps;
}> = ({ startNode, finishNode }) => {
  const { cellSize } = useContext(CellSizeContext);
  const { speed } = useContext(SpeedContext);
  const { grid } = useContext(GridContext);
  const { setSolved } = useContext(ControlContext);

  const visitedcellsInOrder = dijkstra(grid, startNode, finishNode);
  const ShortestPathOrder = getCellsInShortestPathOrderDijkstra(startNode, finishNode);
  console.log(ShortestPathOrder);

  // remove start and finish node from visitedcellsInOrder
  visitedcellsInOrder.shift();
  visitedcellsInOrder.pop();

  let i = 0;

  const Interval = setInterval(() => {
    const cell = visitedcellsInOrder[i];

    document.getElementById(
      `row-${cell.row} col-${cell.col}`
    )!.className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
      
    if (i === visitedcellsInOrder.length - 1) {
      for (let i = 0; i < ShortestPathOrder.length; i++) {
        setTimeout(() => {
          const cell = ShortestPathOrder[i];
          document.getElementById(
            `row-${cell.row} col-${cell.col}`
          )!.className = `animate-shortest-path border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
        }, 50 * i);
      }
      setSolved(true);
      clearInterval(Interval);
      return null;
    }

    i++;
  }, speed);

  return null;
};

const AnimateAstar: React.FC<{
  startNode: CellProps;
  finishNode: CellProps;
}> = ({ startNode, finishNode }) => {
  const { cellSize } = useContext(CellSizeContext);
  const { speed } = useContext(SpeedContext);
  const { grid } = useContext(GridContext);
  const { setSolved } = useContext(ControlContext);

  const visitedCellsInOrder = astar(grid, startNode, finishNode);
  const ShortestPathOrder = getCellsInShortestPathOrderAstar(finishNode);
  let i = 0;

  const Interval = setInterval(() => {
    const cell = visitedCellsInOrder[i];

    document.getElementById(
      `row-${cell.row} col-${cell.col}`
    )!.className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;

    if (i === visitedCellsInOrder.length - 1) {
      for (let i = 0; i < ShortestPathOrder.length; i++) {
        setTimeout(() => {
          const cell = ShortestPathOrder[i];
          document.getElementById(
            `row-${cell.row} col-${cell.col}`
          )!.className = `animate-shortest-path border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
        }, 50 * i);
      }
      setSolved(true);
      clearInterval(Interval);
      return null;
    }

    i++;
  }, speed);

  return null;
};

export default Algortims;
