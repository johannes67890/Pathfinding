import React, { useContext } from "react";
import { CellProps, SizeGrid } from "./Cell";
import {
  CellSizeContext,
  ControlContext,
  GridContext,
  SpeedContext,
} from "./Contexts";
import Pathfinding from "../algoritme/Pathfinding";
import Digraph from "../algoritme/structures/Digraph";
import DirectedEdge from "../algoritme/structures/DirectedEdge";

const Algortims: React.FC<{ ongoing: boolean }> = ({ ongoing }) => {
  const { cellSize } = useContext(CellSizeContext);
  const { grid, gridCells } = useContext(GridContext);

  const startNode =
    grid[8][8];
  const finishNode =
    grid[8][27];
    return <AnimateDijkstra startNode={startNode} finishNode={finishNode} />
};

const AnimateDijkstra: React.FC<{
  startNode: CellProps;
  finishNode: CellProps;
}> = ({ startNode, finishNode }) => {
  const { speed } = useContext(SpeedContext);
  const { grid, gridCells } = useContext(GridContext);
  const { cellSize } = useContext(CellSizeContext);
  const { setSolved, algorithm } = useContext(ControlContext);

  let G = new Digraph(grid);

  for (let row of grid) {
    for (let cell of row) {
      const neighbors = getNeighbors(cell, grid);
      for (let neighbor of neighbors) {
        if(neighbor.isWall) continue;
        const edge = new DirectedEdge(cell.id, neighbor.id, neighbor.weight);
        G.addEdge(edge);
      }
    }
  }

  const pathfinding = new Pathfinding(G, startNode, finishNode, algorithm);
  let i = 0;
  const Interval = setInterval(() => {
      const visitedcellsInOrder = pathfinding.visitedPath();
      let cell = getCellById(visitedcellsInOrder[i], grid);
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
      } else if(cell.id !== startNode.id){
        gridCells.current[cell.row][cell.col].current!.className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
      }

    i++;
  }, speed);

  return null;
};

function getNeighbors(cell: CellProps, grid: any): CellProps[] {
  const neighbors: CellProps[] = [];
  const { col, row } = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]); // top
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // bottom
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
  return neighbors;
}

function getAllCells(grid: CellProps[][]) {
  const cells = [];
  for (const row of grid) {
    for (const cell of row) {
      cells.push(cell);
    }
  }
  return cells;
}

function getCellById(id: number, grid: CellProps[][]) {
  return getAllCells(grid)[id];
}

export default Algortims;
