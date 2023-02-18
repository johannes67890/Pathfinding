import { CellProps } from "../components/Cell";


/**
 * Dijkstra search algorithm\
 * *Breadth-first search algorithm*
 * 
 * @param grid Grid of cells
 * @param startCell Start cell
 * @param finishCell Finish cell
 * @returns Array of cells of evaluated cells
 */
export function dijkstra(
  grid: CellProps[][],
  startCell: CellProps,
  finishCell: CellProps
): CellProps[] {
  const visitedCellsInOrder = [];
  startCell.distance = 0;
  const unvisitedCells = getAllCells(grid);
  while (!!unvisitedCells.length) {
    sortCellsByDistance(unvisitedCells);
    const closestCell: CellProps | undefined = unvisitedCells.shift();

    if (closestCell !== undefined) {
      if (closestCell.isWall) continue;
      // If we encounter a wall, we skip it.
      // If the closest cell is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestCell.distance === Infinity) return visitedCellsInOrder;
      //closestCell.isVisited = true; // set current cell to visited
      visitedCellsInOrder.push(closestCell);
      if (closestCell === finishCell) return visitedCellsInOrder; // if reached finishcell

      updateUnvisitedNeighbors(closestCell, grid);
    } else return visitedCellsInOrder;
  }

  return visitedCellsInOrder;
}

function updateUnvisitedNeighbors(cell: CellProps, grid: CellProps[][]) {
  const unvisitedNeighbors = getUnvisitedNeighbors(cell, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = cell.distance + 1;
    neighbor.previouscell = cell;
  }
}


function getUnvisitedNeighbors(cell: CellProps, grid: any) {
  const neighbors = [];
  const { col, row } = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]); // top
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // bottom
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}


// TODO: Bugged
export function getCellsInShortestPathOrderDijkstra(starCell: CellProps, finishCell: CellProps) {
  const shortestPath: CellProps[] = [];
  let curr = finishCell;
  
  // while (curr !== starCell) {
  //   console.log(curr.previouscell);
  //   shortestPath.push(curr);
  //   curr = curr.previouscell;
    
  // }
  shortestPath.shift();
  return shortestPath.reverse();
}

function sortCellsByDistance(unvisitedcells: CellProps[]) {
  unvisitedcells.sort(
    (cellA: CellProps, cellB: CellProps) => cellA.distance - cellB.distance
  );
}

export function getAllCells(grid: CellProps[][]) {
  const cells = [];
  for (const row of grid) {
    for (const cell of row) {
      cells.push(cell);
    }
  }
  return cells;
}
