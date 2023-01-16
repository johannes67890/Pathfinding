import React, { useContext, useRef, useEffect, useState } from "react";
import { CellProps, CellSize, SizeGrid } from "./Cell";
import { Algorithm, CellSizeContext, ControlContext, GridContext, SpeedContext } from "./Contexts";
import {  dijkstra } from "../algoritme/Dijksta";
import { getCellsInShortestPathOrder } from "../algoritme/Dijksta";



const Algortims: React.FC<{ ongoing: boolean}> = ({ongoing}) => {
 const { cellSize } = useContext(CellSizeContext);
 const {grid } = useContext(GridContext)


const startNode =
    grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
      Math.round(SizeGrid[cellSize][3] / 3 / 1.35)
    ];
  const finishNode =
    grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
      Math.round((SizeGrid[cellSize][3] / 2) * 1.35)
    ];
    


  return (
    <AnimateDijkstra startNode={startNode} finishNode={finishNode} />
  )
}


const AnimateDijkstra: React.FC<{startNode: CellProps,finishNode: CellProps}> = ({  startNode, finishNode}) => {
  const { cellSize } = useContext(CellSizeContext);
  const { speed } = useContext(SpeedContext);
  const { grid } = useContext(GridContext)
  const { setSolved } = useContext(ControlContext);

  const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
  const ShortestPathOrder = getCellsInShortestPathOrder(finishNode); 
  
  // remove start and finish node from visitedNodesInOrder
  visitedNodesInOrder.shift();
  visitedNodesInOrder.pop();
  visitedNodesInOrder.shift();
  visitedNodesInOrder.pop();

  let i = 0;

    const Interval = setInterval(() => {
      const cell = visitedNodesInOrder[i];      
      
      // if (playing) {
      //   return;
      // }
      
      document.getElementById(
        `row-${cell.row} col-${cell.col}`
      )!.className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
    
      if (i === visitedNodesInOrder.length - 1) {
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
      
      i++
    }, speed);
    
  return null;
}

const Astar = () => {
  const { cellSize } = useContext(CellSizeContext);
};

export default Algortims;
