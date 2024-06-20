import React, { useContext } from "react";
import { CellProps, getCellById, getNeighbors } from "./Cell";

import useCellSize, { CellSizeContext, cellSizeRecord } from "./context/useCellSize";
import Pathfinding from "../algorithm/Pathfinding";
import Digraph from "../algorithm/structures/Digraph";
import DirectedEdge from "../algorithm/structures/DirectedEdge";
import useGrid from "./context/useGrid";
import useSpeed from "./context/useSpeed";
import useControl, { Algorithm } from "./context/useControl";

const Algortims = () => {
  const { grid } = useGrid();

  const startNode =
    grid[8][8];
  const finishNode =
    grid[8][27];
    return <AnimatePathfinding startNode={startNode} finishNode={finishNode} />
};

const AnimatePathfinding: React.FC<{
  startNode: CellProps;
  finishNode: CellProps;
}> = ({ startNode, finishNode }) => {
  const { speed, setSpeed } = useSpeed();
  const { grid, gridCells } = useGrid();
  const { cellSize } = useCellSize();
  const { setSolved, algorithm } = useControl();

  let G = new Digraph(grid);

  for (let row of grid) {
    for (let cell of row) {
      const neighbors = getNeighbors(cell, grid);
      for (let neighbor of neighbors) {
        if(neighbor.isWall || cell.isWall) continue;
        const edge = new DirectedEdge(cell.id, neighbor.id, neighbor.weight);
        G.addEdge(edge);
      }
    }
  }

  const pathfinding = new Pathfinding(G, startNode, finishNode, algorithm === Algorithm.Astar ? true : false);
  let i = 0;
  
  const Interval = setInterval(() => {
      const visitedcellsInOrder = pathfinding.visitedPath();
      let cell = getCellById(visitedcellsInOrder[i], grid);
      if(!pathfinding.hasPathTo(finishNode.id)) {
        setSpeed(1);
        if(i === visitedcellsInOrder.length - 1) {
          
          setSolved(true);
          clearInterval(Interval);
        }
      }
      if(cell.id === finishNode.id) {
        const sp = pathfinding.pathToByIndex(finishNode.id);
        for (let i = 0; i < sp.length; i++) {
          const spCell = sp[i+1]; // +1 to skip startNode
           setTimeout(() => {
               cell = getCellById(spCell, grid);
               gridCells.current[cell.row][cell.col].current!.className = `animate-shortest-path border border-black ${cellSizeRecord[cellSize].className}`;
             }, 50 * i);
        }
        setSolved(true);
        clearInterval(Interval);
      }
      else if(cell.id !== startNode.id){
        gridCells.current[cell.row][cell.col].current!.className = `animate-visited-cell border border-black ${cellSizeRecord[cellSize].className}`;
      }

    i++;
  }, speed);

  return null;
};

export default Algortims;
