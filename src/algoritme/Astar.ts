import { CellProps } from "../components/Cell";
import { getAllCells } from "./Dijksta";

/**
 * A* search algorithm\
 * `f(n) = g(n) + h(n)`\
 * `f(n)` = Total cost of cell\
 * `g(n)` = Cost from start to `n`\
 * `h(n)` = Estimated cost from `n` to finish\
 * 
 * @param grid Grid of cells
 * @param startCell Start cell
 * @param finishCell Finish cell
 * @returns Array of cells of evaluated cells
 */
function astar(
  grid: CellProps[][],
  startCell: CellProps,
  finishCell: CellProps
) {
  
  applyCostToCells(grid, startCell, finishCell); // Apply cost to all cells
  const openList: CellProps[] = []; // List of cells to be evaluated
  const closedList: CellProps[] = []; // List of cells already evaluated
  startCell.cost.gCost = 0;
  startCell.cost.hCost = manhattan(startCell, finishCell);
  startCell.cost.fCost = startCell.cost.gCost + startCell.cost.hCost;
  openList.push(startCell); // Add startCell to openList

  while (!!openList.length) {
    sortCellsByFcost(openList); // Sort openList by fCost (lowest to highest)

    // Find lowest fCost 
    let lowestIndex = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].cost.fCost < openList[lowestIndex].cost.fCost) {
        lowestIndex = i;
      }
    }
    let current = openList[lowestIndex]; // Set current to lowest fCost
 
    if (current.isFinish) {
      // If current is finishCell, return closedList
      closedList.shift();
      return closedList;
    }

    
    openList.splice(lowestIndex, 1);
    closedList.push(current);

    let neighbors: CellProps[] = getNeighbors(current, grid);

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedList.includes(neighbor) && !neighbor.isWall) { // If neighbor is not in closedList and is not a wall
        let tempG = current.cost.gCost + 1; // 1 is the distance between current and neighbor
        if (openList.includes(neighbor)) { // If neighbor is in openList
          if (tempG < neighbor.cost.gCost) {
            neighbor.cost.gCost = tempG;
          }
        } else {
          neighbor.cost.gCost = tempG;
          openList.push(neighbor);
        }
        // Current is the best path to neighbor 
        neighbor.cost.hCost = manhattan(neighbor, finishCell);
        neighbor.cost.fCost = neighbor.cost.gCost + neighbor.cost.hCost;
        neighbor.previousCell = current;
      }
    }
  }
  return closedList;
}

export function getCellsInShortestPathOrderAstar(finishCell: CellProps) {
  const shortestPath: CellProps[] = [];
  let curr = finishCell;
  // Loop through all previous cells and add them to shortestPath
  while (curr.previousCell !== null) {
    shortestPath.push(curr);
    curr = curr.previousCell;
  }
  shortestPath.shift();
  return shortestPath.reverse();
}

function applyCostToCells(
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

function sortCellsByFcost(unvisitedcells: CellProps[]) {
  unvisitedcells.sort((cellA, cellB) => cellA.cost.fCost - cellB.cost.fCost);
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
  // Manhattan distance (Huristic)
  const h =
    Math.abs(CurrCell.row - finishCell.row) +
    Math.abs(CurrCell.col - finishCell.col);
  return h;
}

export default astar;
