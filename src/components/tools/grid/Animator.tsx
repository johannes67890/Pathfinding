import { getCellById, getNeighbors } from "./GridCell";

import useCellSize, { cellSizeRecord } from "./context/useCellSize";
import useGrid from "./context/useGrid";
import useSpeed from "./context/useSpeed";
import useControl, { Algorithm } from "./context/useControl";
import Digraph from "../../../structures/Digraph";
import DirectedEdge from "../../../structures/DirectedEdge";
import Pathfinding from "../../../algorithms/Pathfinding";

const AnimatePathfinding = () => {
  const { speed, setSpeed } = useSpeed();
  const { grid, gridCells } = useGrid();
  const { cellSize } = useCellSize();
  const { setSolved, algorithm } = useControl();

  const startNode = grid[8][8];
  const finishNode = grid[8][27];

  const G = new Digraph(grid);

  for (const row of grid) {
    for (const cell of row) {
      const neighbors = getNeighbors(cell, grid);
      for (const neighbor of neighbors) {
        if (neighbor.isWall || cell.isWall) continue;
        const edge = new DirectedEdge(cell.id, neighbor.id, neighbor.weight);
        G.addEdge(edge);
      }
    }
  }

  const pathfinding = new Pathfinding(
    G,
    startNode,
    finishNode,
    algorithm === Algorithm.Astar,
  );

  let i = 0;
  const Interval = setInterval(() => {
    const visitedcellsInOrder = pathfinding.visitedPath();
    const cell = getCellById(visitedcellsInOrder[i], grid);
    if (!pathfinding.hasPathTo(finishNode.id)) {
      setSpeed(1);
      if (i === visitedcellsInOrder.length - 1) {
        setSolved(true);
        clearInterval(Interval);
      }
    }
    if (cell.id === finishNode.id) {
      const sp = pathfinding.pathToByIndex(finishNode.id);
      for (let j = 0; j < sp.length; j++) {
        const spCell = sp[i + 1]; // +1 to skip startNode
        setTimeout(() => {
          const currentCell = getCellById(spCell, grid);
          gridCells.current[currentCell.row][
            currentCell.col
          ].current!.className =
            `animate-shortest-path border border-black ${cellSizeRecord[cellSize].className}`;
        }, 50 * i);
      }
      setSolved(true);
      clearInterval(Interval);
    } else if (cell.id !== startNode.id) {
      gridCells.current[cell.row][cell.col].current!.className =
        `animate-visited-cell border border-black ${cellSizeRecord[cellSize].className}`;
    }

    i += 1;
  }, speed);

  return null;
};

export default AnimatePathfinding;
