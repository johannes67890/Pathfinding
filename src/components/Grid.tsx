import Cell, { CellProps, CellSize, SizeGrid, MakeNode } from "./Cell";
import { CellSizeContext, ControlContext, GridContext } from "./Contexts";
import { useState, useEffect, useContext } from "react";
import * as utils from "../utils";
import { Button as FlowbiteBtn } from "flowbite-react/lib/esm/components/Button";
import { getAllCells } from "../algoritme/Dijksta";
import Algortims from "./Algortims";

const Grid = () => {
  const { grid, setGrid } = useContext(GridContext);
  const { cellSize } = useContext(CellSizeContext);
  const { algorithm, playing, setPlaying } = useContext(ControlContext);
  const [cellClicked, setCellClicked] = useState<boolean>(false);

  useEffect(() => {
    setGrid(InitlizeGrid(cellSize));
  }, [cellSize]);

  return (
    <div className="grid">
      <FlowbiteBtn.Group outline={true} className="m-3 mx-auto">
        <FlowbiteBtn
          color="gray"
          className="focus:ring-0"
          onClick={() => {
            InitlizeGridWithRandomWalls(grid);
            setCellClicked(!cellClicked);
          }}
        >
          Random
        </FlowbiteBtn>
        <FlowbiteBtn
          color="gray"
          className="focus:ring-0"
          onClick={() => {
            Algortims(grid, cellSize, playing, algorithm);
            setPlaying(true);
          }}
        >
          Run
        </FlowbiteBtn>
        <FlowbiteBtn
          onClick={() => setPlaying(!playing)}
          color="gray"
          className="focus:ring-0 focus:text-red-400 hover:text-red-400"
        >
          Pause
        </FlowbiteBtn>
      </FlowbiteBtn.Group>

      {grid.map((row, index) => {
        return (
          <div
            className={utils.classNames(SizeGrid[cellSize][0], "w-max")}
            key={index}
          >
            {row.map((node, nodeIndex) => {
              return (
                <Cell
                  key={nodeIndex}
                  isVisited={node.isVisited}
                  isFinish={node.isFinish}
                  isStart={node.isStart}
                  isWall={node.isWall}
                  distance={node.distance}
                  onClick={() => {
                    if (node.isWall === false) {
                      node.isWall = true;
                    } else node.isWall = false;
                    setCellClicked(!cellClicked);
                    console.log(node);
                  }}
                  row={node.row}
                  col={node.col}
                  size={cellSize}
                  cost={{
                    gCost: node.cost.gCost,
                    hCost: node.cost.hCost,
                    fCost: node.cost.fCost,
                  }}
                ></Cell>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

function InitlizeGridWithRandomWalls(grid: CellProps[][]): CellProps[][] {
  let newGridWithWalls: CellProps[][] = [];
  const newCells: CellProps[] = []; // store new cells
  let cells: CellProps[] = getAllCells(grid); // get all cells from grid
  cells.map((cell, index) => {
    let salt = utils.getRandomInt(0, 10);
    if (salt === 1) {
      // salt for randomness
      if (cell.isStart || cell.isFinish) {
        return;
      } else {
        cell.isWall = true;
        newCells.push(cell);
      }
    }
    return index;
  });
  newGridWithWalls.push(newCells); // push new cells to grid

  return newGridWithWalls; //return new grid
}

export function InitlizeGrid(cellSize: CellSize): CellProps[][] {
  let newGrid: CellProps[][] = [];
  for (let row = 0; row <= SizeGrid[cellSize][2]; row++) {
    const currentRow: any = [];
    for (let col = 0; col <= SizeGrid[cellSize][3]; col++) {
      currentRow.push(MakeNode(col, row, cellSize)); //push current row to node
    }
    newGrid.push(currentRow);
  }
  return newGrid; // push to grid
}

export default Grid;
