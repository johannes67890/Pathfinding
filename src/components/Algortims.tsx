import React, {useContext, useRef, useEffect } from 'react'
import { CellProps, CellSize, SizeGrid } from './Cell'
import { CellSizeContext, ControlContext, GridContext } from './Contexts'
import { animateShortestPath, dijkstra } from '../algoritme/Dijksta'
import { getCellsInShortestPathOrder } from '../algoritme/Dijksta'
import { Timer } from '../utils'


function Algortims (grid: CellProps[][], algorithm: string, playing: boolean) {
    const { cellSize } = useContext(CellSizeContext)
  
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
    case "Dijksta":
      return AnimateDijkstra(dijkstra(grid, startNode, finishNode), getCellsInShortestPathOrder(finishNode), cellSize, playing);
      break;
    
    // case "A*":
    
    //   Astar();
    //   break;


    default:
      throw new Error("No algorithm selected");
      break;
  }
}


export const AnimateDijkstra = (
  visitedNodesInOrder: CellProps[],
  ShortestPathOrder: CellProps[],
  cellSize: CellSize,
  playing: boolean,
) => {  
  let cell = visitedNodesInOrder[0];
  
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {

    const timer = new Timer(() => {
        cell = visitedNodesInOrder[i];
        document.getElementById(
          `row-${cell.row} col-${cell.col}` // Select cell and add class
          )!.className = `animate-visited-cell border border-black`;
          
            
          if (i === visitedNodesInOrder.length - 1) {
            setTimeout(() => {
              animateShortestPath(ShortestPathOrder, cellSize);
            }, 10 * i);
            return;
          }
        }, 10 * i);
        playing ? timer.resume() : timer.pause();
  } 
   
}

const Astar = () => {
    const { cellSize } = useContext(CellSizeContext)
    const { playing, setPlaying } = useContext(ControlContext)
}


export default Algortims