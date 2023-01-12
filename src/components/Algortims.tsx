import React, { useContext, useRef, useEffect, useState } from "react";
import { CellProps, CellSize, SizeGrid } from "./Cell";
import { Algorithm, CellSizeContext, ControlContext, GridContext, SpeedContext } from "./Contexts";
import { animateShortestPath, dijkstra } from "../algoritme/Dijksta";
import { getCellsInShortestPathOrder } from "../algoritme/Dijksta";



const Algortims: React.FC<{grid: CellProps[][], setGridCell: any,  ongoing: boolean}> = ({grid, setGridCell, ongoing}) => {
 const { cellSize } = useContext(CellSizeContext);


const startNode =
    grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
      Math.round(SizeGrid[cellSize][3] / 3 / 1.35)
    ];
  const finishNode =
    grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
      Math.round((SizeGrid[cellSize][3] / 2) * 1.35)
    ];
    


  return (
    <AnimateDijkstra grid={grid} setGridCell={setGridCell}  startNode={startNode} finishNode={finishNode} />
  )
}


const AnimateDijkstra: React.FC<{grid: CellProps[][], setGridCell: any,startNode: CellProps,finishNode: CellProps}> = ({grid, setGridCell, startNode, finishNode}) => {
  const { cellSize } = useContext(CellSizeContext);
  const { speed } = useContext(SpeedContext);
  const { setSolved } = useContext(ControlContext);

  const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
  const ShortestPathOrder = getCellsInShortestPathOrder(finishNode); 
  
  
  let i = 0;
  
  useEffect(() => {
    console.log("useEffect");
    
    const Interval = setInterval(() => {
    
      setGridCell(visitedNodesInOrder[i].row, visitedNodesInOrder[i].col, visitedNodesInOrder[i]);
        
      //   if (playing) {
      //     return;
      //   }
    
        i++
      }, speed);

    if (i === visitedNodesInOrder.length - 1) {

    return () => {
        setTimeout(() => {
          animateShortestPath(ShortestPathOrder, cellSize);
        }, 250);
        clearInterval(Interval);
        setSolved(true);
        return;
      }
    }
  }, [])
  
  return null;
}

const Astar = () => {
  const { cellSize } = useContext(CellSizeContext);
};

export default Algortims;
