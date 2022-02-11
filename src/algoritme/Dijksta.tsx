import { CellProps, CellSize, SizeGrid } from "../components/Cell";

export function dijkstra(
  grid: CellProps[][],
  startNode: CellProps,
  finishNode: CellProps
) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortCellsByDistance(unvisitedNodes);
    const closestNode: CellProps | undefined = unvisitedNodes.shift();

    if (closestNode != undefined) {
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;

      updateUnvisitedNeighbors(closestNode, grid);
    } else console.log("error, closestNode returned 0");
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

export function getCellsInShortestPathOrder(finishNode: CellProps) {
  const CellsInShortestPathOrder: CellProps[] = [];
  let currentNode: any = finishNode;
  while (currentNode !== null) {
    CellsInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return CellsInShortestPathOrder;
}

export function animateDijkstra(
  visitedNodesInOrder: CellProps[],
  ShortestPathOrder: CellProps[],
  cellSize: CellSize
) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(ShortestPathOrder, cellSize);
      }, 10 * i);
      return;
    }

    setTimeout(() => {
      const cell = visitedNodesInOrder[i];

      document.getElementById(
        `row-${cell.row} col-${cell.col}`
      )!.className = `animate-visited-cell bg-blue-500 border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
    }, 10 * i);
  }
}

function animateShortestPath(
  nodesInShortestPathOrder: CellProps[],
  cellSize: CellSize
) {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const cell = nodesInShortestPathOrder[i];
      document.getElementById(
        `row-${cell.row} col-${cell.col}`
      )!.className = `animate-visited-cell bg-yellow-500 border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
    }, 50 * i);
  }
}

function sortCellsByDistance(unvisitedNodes: CellProps[]) {
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
