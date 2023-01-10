import Cell, { CellProps, CellSize, SizeGrid, MakeNode } from "./Cell";
import {
  CellSizeContext,
  ControlContext,
  GridContext,
  SpeedContext,
} from "./Contexts";
import { useState, useEffect, useContext } from "react";
import * as utils from "../utils";
import { Button as FlowbiteBtn } from "flowbite-react/lib/esm/components/Button";
import { getAllCells } from "../algoritme/Dijksta";
import Algortims from "./Algortims";

const Grid = () => {
  const { grid, setGrid } = useContext(GridContext);
  const { cellSize } = useContext(CellSizeContext);
  const { speed } = useContext(SpeedContext);
  const { algorithm, playing, setPlaying, solved, setSolved } = useContext(ControlContext);

  const [cellClicked, setCellClicked] = useState<boolean>(false);

  useEffect(() => {
    setGrid(InitlizeGrid(cellSize));
  }, [cellSize]);
  

  console.log(playing);

  

  return (
    <div className="grid">
      <FlowbiteBtn
        color="gray"
        className="h-12 max-h-[3rem] py-2 rounded-b-none border-b-0 group"
        onClick={() => {
          setPlaying(!playing);
          setSolved(false);
          Algortims(grid, cellSize, algorithm, speed, playing, setSolved);
        }}
      >
        {playing ? (
            <div id="status" className="group relative">
              <svg
                aria-hidden="true"
                // " group-hover:pause group-hover:text-blue-600"
                className={utils.classNames("w-8 h-8 text-gray-400  dark:text-gray-600 fill-blue-600", playing ? "animate-spin" : "pause")}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
          
              <button className={playing ? "button absolute hidden p-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:inline ml-auto mr-auto" : "buttonpause  absolute hidden p-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:inline ml-auto mr-auto"} />
              {/* https://css-tricks.com/making-pure-css-playpause-button/ */}
            </div>
       
        ) : (
          solved ? <div className="font-medium text-base m-auto text-center">Start</div> : <>{setPlaying(false)}</>
           
          
        )}
      </FlowbiteBtn>

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

export function InitlizeGridWithRandomWalls(cellSize: CellSize): CellProps[][] {
  let newGridWithWalls: CellProps[][] = [];
  for (let row = 0; row <= SizeGrid[cellSize][2]; row++) {
    const currentRow: any = [];
    for (let col = 0; col <= SizeGrid[cellSize][3]; col++) {
      const cell = MakeNode(col, row, cellSize); //push current row to node

      let rand = utils.getRandomInt(0, 10);
      if (cell.isStart || cell.isFinish) {
      } else if (rand === 1) {
        cell.isWall = true;
      }
      currentRow.push(cell);
    }
    newGridWithWalls.push(currentRow);
  }
  return newGridWithWalls;
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
