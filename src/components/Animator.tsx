import React, { useContext } from "react";
import { CellProps, SizeGrid, getCellById, getNeighbors } from "./Cell";
import {
  CellSizeContext,
  ControlContext,
  GridContext,
  SpeedContext,
} from "./context/Contexts";
import Pathfinding from "../algorithm/Pathfinding";
import Digraph from "../algorithm/structures/Digraph";
import { Algorithm } from "./context/Contexts";
import DirectedEdge from "../algorithm/structures/DirectedEdge";

const Algortims = () => {
  const { grid } = useContext(GridContext);

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
  const { speed, setSpeed } = useContext(SpeedContext);
  const { grid, gridCells } = useContext(GridContext);
  const { cellSize } = useContext(CellSizeContext);
  const { setSolved, algorithm } = useContext(ControlContext);

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
               gridCells.current[cell.row][cell.col].current!.className = `animate-shortest-path border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
             }, 50 * i);
        }
        setSolved(true);
        clearInterval(Interval);
      }
      else if(cell.id !== startNode.id){
        gridCells.current[cell.row][cell.col].current!.className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
      }

    i++;
  }, speed);

  return null;
};

export default Algortims;
