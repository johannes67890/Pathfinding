import { CellProps, CellSize, SizeGrid } from "../components/Cell";

export function dijkstra(
  grid: CellProps[][],
  startCell: CellProps,
  finishCell: CellProps
) {
  const visitedCellsInOrder = [];
  startCell.distance = 0;
  const unvisitedNodes = getAllCells(grid);
  while (!!unvisitedNodes.length) {
    sortCellsByDistance(unvisitedNodes);
    const closestCell: CellProps | undefined = unvisitedNodes.shift();

    if (closestCell !== undefined) {
      // If we encounter a wall, we skip it.
      if (closestCell.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestCell.distance === Infinity) return visitedCellsInOrder;
      closestCell.isVisited = true; // set current node to visited
      visitedCellsInOrder.push(closestCell);
      if (closestCell === finishCell) return visitedCellsInOrder; // if reached finishcell

      updateUnvisitedNeighbors(closestCell, grid);
    } else console.log("error, closestNode returned 0");
  }
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

export function getCellsInShortestPathOrder(finishNode: CellProps) {
  const CellsInShortestPathOrder: CellProps[] = [];
  let currentNode: any = finishNode;
  while (currentNode !== null) {
    CellsInShortestPathOrder.unshift(currentNode); //shift back though finishNode
    currentNode = currentNode.previousNode;
  }
  console.log("Shorstes path length: ", CellsInShortestPathOrder.length);

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
        `row-${cell.row} col-${cell.col}` // Select cell and add class
      )!.className = `animate-visited-cell border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
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
      )!.className = `bg-yellow-500 border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
    }, 50 * i);
  }
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
