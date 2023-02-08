import { CellProps, CellSize, SizeGrid } from "../components/Cell";

export function dijkstra(
  grid: CellProps[][],
  startCell: CellProps,
  finishCell: CellProps
): CellProps[] {
  const visitedCellsInOrder = [];
  startCell.distance = 0;
  const unvisitedNodes = getAllCells(grid);
  while (!!unvisitedNodes.length) {
    sortCellsByDistance(unvisitedNodes);
    const closestCell: CellProps | undefined = unvisitedNodes.shift();

    if (closestCell !== undefined) {
      if (closestCell.isWall) continue;
      // If we encounter a wall, we skip it.
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestCell.distance === Infinity) return visitedCellsInOrder;
      //closestCell.isVisited = true; // set current node to visited
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
    neighbor.previousNode = cell;
  }
}

function getUnvisitedNeighbors(cell: CellProps, grid: any) {
  const neighbors = [];
  const { col, row } = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
// TODO: Bugged
export function getCellsInShortestPathOrderDijkstra(finishCell: CellProps) {
  const CellsInShortestPathOrder: CellProps[] = [];
  let currentNode: any = finishCell;
  while (currentNode !== null) {
    CellsInShortestPathOrder.unshift(currentNode); //shift back though finishNode
    currentNode = currentNode;
  }

  return CellsInShortestPathOrder;
}

function sortCellsByDistance(unvisitedNodes: CellProps[]) {
  unvisitedNodes.sort(
    (cellA: CellProps, cellB: CellProps) => cellA.distance - cellB.distance
  );
}

export function getAllCells(grid: CellProps[][]) {
  const cells = [];
  for (const row of grid) {
    for (const node of row) {
      cells.push(node);
    }
  }
  return cells;
}
