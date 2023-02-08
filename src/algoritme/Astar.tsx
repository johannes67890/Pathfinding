import React from "react";
import { CellProps } from "../components/Cell";
import {
  getAllCells,
  getCellsInShortestPathOrder,
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
  const openList: CellProps[] = [];
  const closedList: CellProps[] = [];
  startCell.cost.gCost = 0;
  startCell.cost.hCost = manhattan(startCell, finishCell);
  startCell.cost.fCost = startCell.cost.gCost + startCell.cost.hCost;
  openList.push(startCell);

  while (!!openList.length) {
    sortCellsByFcost(openList);

    let lowestIndex = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].cost.fCost < openList[lowestIndex].cost.fCost) {
        lowestIndex = i;
      }
    }
    let current = openList[lowestIndex];

    if (current.isFinish) {
      return closedList;
    }

    openList.splice(lowestIndex, 1);
    closedList.push(current);

    let neighbors = getNeighbors(current, grid);

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      neighbor.previousCell = current;
      if (!closedList.includes(neighbor) && !neighbor.isWall) {
        let tempG = current.cost.gCost + 1;
        if (openList.includes(neighbor)) {
          if (tempG < neighbor.cost.gCost) {
            neighbor.cost.gCost = tempG;
          }
        } else {
          neighbor.cost.gCost = tempG;
          openList.push(neighbor);
        }
        neighbor.cost.hCost = manhattan(neighbor, finishCell);
        neighbor.cost.fCost = neighbor.cost.gCost + neighbor.cost.hCost;
        neighbor.previousCell = current;
      }
    }
  }
  return closedList;
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

export default astar;
