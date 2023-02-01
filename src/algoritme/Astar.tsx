import React from "react";
import { CellProps } from "../components/Cell";
import {  getAllCells, getUnvisitedNeighbors, updateUnvisitedNeighbors } from "./Dijksta";

function Astar(
  grid: CellProps[][],
  startCell: CellProps,
  finishCell: CellProps,
) {
  // A* search algorithm
  // f(n) = g(n) + h(n)
  // f(n) = total cost of node
  // g(n) = cost from start to n
  // h(n) = estimated cost from n to finish
  applyCostToNodes(grid, startCell, finishCell);
  const unvisitedNodes = getAllCells(grid);
  const visitedCellsInOrder: CellProps[] = [];
  startCell.cost.gCost = 0;
  startCell.cost.hCost = manhattan(startCell, finishCell);
  startCell.cost.fCost = startCell.cost.gCost + startCell.cost.hCost;
  
  while (!!unvisitedNodes.length) {
    
    sortCellsByFcost(unvisitedNodes);
   
    const closestCell: CellProps | undefined = unvisitedNodes.shift();
    
    if(closestCell != undefined) {
    console.log(closestCell.cost);
   
    if(closestCell?.isFinish) return visitedCellsInOrder;
    if(closestCell?.isWall) continue;


    

    } else return visitedCellsInOrder;
    
} }

function getNeighborWithLowestFCost(cell: CellProps, grid: CellProps[][]) {
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

function applyCostToNodes(grid: CellProps[][], startCell: CellProps, finishCell: CellProps) {
  const newGrid = getAllCells(grid);
  for (const cell of newGrid) {
    if(cell.isWall) continue;
    if(cell.isStart) continue;
    if(cell.isFinish) continue;
    cell.cost.hCost = manhattan(cell, finishCell);
    cell.cost.gCost = manhattan(cell, startCell)
    cell.cost.fCost = cell.cost.gCost + cell.cost.hCost;
  }
}

function sortCellsByFcost(unvisitedNodes: CellProps[]) {
  unvisitedNodes.sort((cellA, cellB) => cellA.cost.fCost - cellB.cost.fCost);
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

export default Astar;