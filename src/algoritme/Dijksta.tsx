import { CellProps } from "../components/Cell";

export function dijkstra(
  grid: CellProps[][],
  startNode: CellProps,
  finishNode: CellProps
) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function updateUnvisitedNeighbors(cell: CellProps, grid: any) {
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

function sortNodesByDistance(unvisitedNodes: CellProps[]) {
  unvisitedNodes.sort(
    (cellA: CellProps, cellB: CellProps) => cellA.distance - cellB.distance
  );
}

function getAllNodes(grid: CellProps[][]) {
  const cells = [];
  for (const row of grid) {
    for (const node of row) {
      cells.push(node);
    }
  }
  return cells;
}
