import React, { useContext } from "react";
import { CellProps, SizeGrid } from "./Cell";
import {
  Algorithm,
  CellSizeContext,
  ControlContext,
  GridContext,
  SpeedContext,
} from "./Contexts";
import Pathfinding from "../algoritme/Pathfinding";
import Digraph from "../algoritme/structures/Digraph";

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
    return <AnimateDijkstra startNode={startNode} finishNode={finishNode} />
};

const AnimateDijkstra: React.FC<{
  startNode: CellProps;
  finishNode: CellProps;
}> = ({ startNode, finishNode }) => {
  const { speed } = useContext(SpeedContext);
  const { grid } = useContext(GridContext);
  const { setSolved } = useContext(ControlContext);

  let G = new Digraph(getAllCells(grid));
  const sp = new Pathfinding(G, startNode, finishNode).pathToByIndex(finishNode.id);
  console.log("sp: ", sp);
  let i = 0;
  setInterval(() => {
    const cell = sp[i];

    console.log("sp cell: ", cell);

    // document.getElementById(
    //   `${cell}`
    // )!.className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
      
    // if (i === visitedcellsInOrder.length - 1) {
    //   for (let i = 0; i < ShortestPathOrder.length; i++) {
    //     setTimeout(() => {
    //       const cell = ShortestPathOrder[i];
    //       document.getElementById(
    //         `row-${cell.row} col-${cell.col}`
    //       )!.className = `animate-shortest-path border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
    //     }, 50 * i);
    //   }
    //   setSolved(true);
    //   clearInterval(Interval);
    //   return null;
    // }

    i++;
  }, speed);

  return null;
};

function getAllCells(grid: CellProps[][]) {
  const cells = [];
  for (const row of grid) {
    for (const cell of row) {
      cells.push(cell);
    }
  }
  return cells;
}
export default Algortims;
