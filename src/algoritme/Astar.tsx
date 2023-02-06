import React from "react";
import { CellProps } from "../components/Cell";
import {
  getAllCells,
  getUnvisitedNeighbors,
  sortCellsByDistance,
  updateUnvisitedNeighbors,
} from "./Dijksta";

function astar(
  grid: CellProps[][],
  startCell: CellProps,
  finishCell: CellProps
) {
  // A* search algorithm
  // f(n) = g(n) + h(n)
  // f(n) = total cost of node
  // g(n) = cost from start to n
  // h(n) = estimated cost from n to finish
  applyCostToNodes(grid, startCell, finishCell);
  const unvisitedNodes = getAllCells(grid);
  const openList: CellProps[] = [];
  const closedList: CellProps[] = [];
  startCell.cost.gCost = 0;
  startCell.cost.hCost = manhattan(startCell, finishCell);
  startCell.cost.fCost = startCell.cost.gCost + startCell.cost.hCost;
  openList.push(startCell);

  
  
  
  sortCellsByFcost(unvisitedNodes);
  console.log(unvisitedNodes);
  
  for(let i = 0; i < unvisitedNodes.length; i++){
    const currentCell = unvisitedNodes.shift();
    if (currentCell !== undefined) {
      if (currentCell.isWall) continue;
      console.log(currentCell);
      const neighbors = getUnvisitedNeighbors(currentCell, grid);
      for(let n = 0; n < neighbors.length; n++){
        const neighbor = neighbors[n];
        if (neighbor?.isWall) continue;
        if (neighbor?.isStart) continue;
        if (neighbor?.isFinish) continue;
        const gScore = currentCell.cost.gCost + 1;
        let gBest = false;
        if (!openList.includes(neighbor)) {
          gBest = true;
          neighbor.cost.hCost = manhattan(neighbor, finishCell);
        } else if (gScore < currentCell.cost.gCost) {
          gBest = true;
        }
        if (gBest) {
          neighbor.cost.previousCell = currentCell;
          neighbor.cost.gCost = gScore;
          neighbor.cost.fCost = neighbor.cost.gCost + neighbor.cost.hCost;
          if (!openList.includes(neighbor)) openList.push(neighbor);
        }
      }
      closedList.push(currentCell);
    }
  }
  return closedList;
  
    
    // while (!!openList.length) {
      
    //   if (currentCell != undefined) {
    //     const neighbors = getUnvisitedNeighbors(currentCell, grid);
        
    //     for (let n = 0; n < neighbors.length; n++) {
    //       const neighbor = neighbors[n];
  
    //       if (neighbor?.isWall) continue;
    //       if (neighbor?.isStart) continue;
    //       if (neighbor?.isFinish) return closedList;
  
    //       const gScore = currentCell.cost.gCost + 1;
    //       let gBest = false;
  
    //       if (!openList.includes(neighbor)) {
    //         gBest = true;
    //         neighbor.cost.hCost = manhattan(neighbor, finishCell);
    //       } else if (gScore < currentCell.cost.gCost) {
    //         gBest = true;
    //       }
    //       if (gBest) {
    //         neighbor.cost.gCost = gScore;
    //         neighbor.cost.fCost = currentCell.cost.gCost + currentCell.cost.hCost;
    //       }
    //     }
    //   }
    // }

}

function getNeighborWithLowestFCost(cell: CellProps, grid: any) {
  const unvisitedNeighbors: CellProps[] = getUnvisitedNeighbors(cell, grid);
  let lowestFCost = Infinity;
  let lowestFCostNeighbor: CellProps = cell;
  for (const neighbor of unvisitedNeighbors) {
    if (neighbor.cost.fCost < lowestFCost) {
      lowestFCost = neighbor.cost.fCost;
      lowestFCostNeighbor = neighbor;
    }
  }
  return lowestFCostNeighbor;
}

function applyCostToNodes(
  grid: CellProps[][],
  startCell: CellProps,
  finishCell: CellProps
) {
  const newGrid = getAllCells(grid);
  for (const cell of newGrid) {
    if (cell.isWall) continue;
    if (cell.isStart) continue;
    if (cell.isFinish) continue;
    cell.cost.hCost = manhattan(cell, finishCell);
    cell.cost.gCost = manhattan(cell, startCell);
    cell.cost.fCost = cell.cost.gCost + cell.cost.hCost;
  }
}

function sortCellsByFcost(unvisitedNodes: CellProps[]) {
  unvisitedNodes.sort((cellA, cellB) => cellA.cost.fCost - cellB.cost.fCost);
}

function getNeighbors(cell: CellProps, grid: any) {
  const neighbors = [];
  const { col, row } = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

function manhattan(CurrCell: CellProps, finishCell: CellProps) {
  const h =
    Math.abs(CurrCell.row - finishCell.row) +
    Math.abs(CurrCell.col - finishCell.col);
  return h;
}

// const gCost = closestCell.cost.gCost + manhattan(closestCell, finishCell);
//   const hCost = manhattan(closestCell, finishCell);

//   let isBestCost = false;

//   if (
//     !unvisitedNodes.find(
//       (unvisitedcell) =>
//         unvisitedcell.col === closestCell.col &&
//         unvisitedcell.row === closestCell.row
//     )
//   ) {
//     isBestCost = true;
//     closestCell.cost.hCost = manhattan(closestCell, finishCell);
//     closestCell.isVisited = true;
//     return visitedCellsInOrder.push(closestCell);
//   } else if (gCost < closestCell.cost.gCost) {
//     isBestCost = true;
//   }

//   if (isBestCost) {
//     closestCell.cost.gCost = gCost;
//     closestCell.cost.hCost = hCost;
//     closestCell.cost.fCost = gCost + hCost;
//     closestCell.isVisited = true;
//   }
//   //console.log(gCost);

export default astar;
