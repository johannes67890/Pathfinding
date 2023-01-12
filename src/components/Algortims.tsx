import React, { useContext, useRef, useEffect, useState } from "react";
import { CellProps, CellSize, SizeGrid } from "./Cell";
import { Algorithm, CellSizeContext, ControlContext, GridContext, SpeedContext } from "./Contexts";
import { animateShortestPath, dijkstra } from "../algoritme/Dijksta";
import { getCellsInShortestPathOrder } from "../algoritme/Dijksta";



const Algortims: React.FC<{ongoing: boolean}> = ({ongoing}) => {
  const { grid, setGrid, gridRef } = useContext(GridContext);
 const { cellSize } = useContext(CellSizeContext);
  const { speed } = useContext(SpeedContext);
  const { algorithm, playing, setPlaying, solved, setSolved } = useContext(ControlContext);

  const [cellClicked, setCellClicked] = useState<boolean>(false);

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


const AnimateDijkstra: React.FC<{startNode: CellProps,finishNode: CellProps}> = ({startNode, finishNode}) => {
  const { grid, gridRef } = useContext(GridContext);
  const { cellSize } = useContext(CellSizeContext);
  const { speed } = useContext(SpeedContext);
  const { playing, setSolved } = useContext(ControlContext);

  const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
  const ShortestPathOrder = getCellsInShortestPathOrder(finishNode); 
  
    let i = 0;
    const Interval = setInterval(() => {
      const cell = visitedNodesInOrder[i];
      gridRef.current[i] = cell;

      console.log(gridRef.current[i] = cell);
      
      gridRef.current[i].className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;

      // cell.className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`);
      
      if (playing) {
        return;
      }
      


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


  return null;
}


// function AnimateDijkstra(
//   visitedNodesInOrder: CellProps[],
//   ShortestPathOrder: CellProps[],
//   cellSize: CellSize,
//   speed: number,
//   playing: boolean,
//   setSolved: React.Dispatch<React.SetStateAction<boolean>>,
// ) {
//   let i = 0;
  
//   const Interval = setInterval(() => {
//     const cell = visitedNodesInOrder[i];

//     if (playing) {
//       return;
//     }

//     document.getElementById(
//       `row-${cell.row} col-${cell.col}`
//     )!.className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;

//     if (i === visitedNodesInOrder.length - 1) {
//       setTimeout(() => {
//         animateShortestPath(ShortestPathOrder, cellSize);
//       }, 250);
//       clearInterval(Interval);
//       setSolved(true);
//       return;
//     }

//     i++;
//   }, speed);

// }

const Astar = () => {
  const { cellSize } = useContext(CellSizeContext);
};

// function Algortims(
//   grid: CellProps[][],
//   cellSize: CellSize,
//   algorithm: string,
//   speed: number,
//   playing: boolean,
//   setSolved: React.Dispatch<React.SetStateAction<boolean>>,
// ) {
//   // TODO: make this dynamic
//   const startNode =
//     grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
//       Math.round(SizeGrid[cellSize][3] / 3 / 1.35)
//     ];
//   const finishNode =
//     grid[Math.round(SizeGrid[cellSize][2] / 2 / 1.2)][
//       Math.round((SizeGrid[cellSize][3] / 2) * 1.35)
//     ];

//   switch (algorithm) {
//     case Algorithm.Dijksta:
//       AnimateDijkstra(
//         dijkstra(grid, startNode, finishNode),
//         getCellsInShortestPathOrder(finishNode),
//         cellSize,
//         speed,
//         playing,
//         setSolved,
//       );
//     // case "A*":

//     //   Astar();
//     //   break;

//     default:
//       return null;
//   }
// }

export default Algortims;
