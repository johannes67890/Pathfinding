import * as utils from "../../../utils/utils";
import GridCell, { MakeCell } from "./GridCell";
import React, { useState, useEffect } from "react";
import { Button as FlowbiteBtn } from "flowbite-react";
import useCellSize, { cellSizeRecord } from "./context/useCellSize";
import useGrid from "./context/useGrid";
import useControl from "./context/useControl";
import AnimatePathfinding from "./Animator";
import Cell, { CellSize } from "@models/gridTypes";
import LoadingCircle, {
  LoadingCircleCompleted,
} from "src/components/static/LoadingScreen";

const Grid = () => {
  const { grid, setGrid, gridCells, setGridCells } = useGrid();
  const { cellSizeRecord, cellSize } = useCellSize();
  const { playing, setPlaying, solved, setSolved } = useControl();

  const [cellClicked, setCellClicked] = useState<boolean>(false);
  const [ongoing, setOngoing] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    // When animation is done and user wants to refresh the grid.
    if (refresh) {
      setGrid((prevGrid) => {
        setGrid(InitlizeGrid(cellSize));
        const newGrid = prevGrid.slice();
        for (let row of newGrid) {
          for (let cell of row) {
            if (cell.isStart || cell.isFinish) {
              continue;
            }
            cell.isWall = false;
            cell.weight = 1;
            gridCells.current[cell.row][
              cell.col
            ].current!.className = `border border-black ${cellSizeRecord[cellSize].className} ${cellSizeRecord[cellSize].className}`;
          }
        }
        return newGrid;
      });
    }
  }, [refresh]);

  useEffect(() => {
    setGrid(InitlizeGrid(cellSize));
    setGridCells(InitlizeGrid(cellSize));
    return () => {
      setGrid([]);
      setGridCells([]);
    };
  }, [cellSize]);

  const OnStart = () => {
    setPlaying(!playing);
    setSolved(false);
    playing && !solved && !ongoing ? setOngoing(true) : setOngoing(false);
    playing && solved && !ongoing ? setRefresh(true) : setRefresh(false);
  };

  return (
    <div className="grid">
      <FlowbiteBtn
        color="gray"
        className="focus:ring-transparent h-12 max-h-[3rem] py-2 rounded-b-none border-b-0 group"
        onClick={() => OnStart()}
        disabled={playing && !solved ? true : false}
      >
        {playing && !solved && !ongoing ? <AnimatePathfinding /> : null}

        <RenderButton ongoing={ongoing} />
      </FlowbiteBtn>

      {grid.map((row, index) => {
        return (
          <div
            className={utils.classNames(
              cellSizeRecord[cellSize].className,
              "w-max",
              playing ? "pointer-events-none" : ""
            )}
            key={index}
          >
            {row.map((cell, cellIndex) => {
              return (
                <GridCell
                  id={cellIndex}
                  row={cell.row}
                  col={cell.col}
                  ref={gridCells.current[cell.row][cell.col]}
                  className={cell.className}
                  isFinish={cell.isFinish}
                  isStart={cell.isStart}
                  isWall={cell.isWall}
                  onClick={() => {
                    if (cell.isWall === false) {
                      cell.isWall = true;
                    } else cell.isWall = false;

                    setCellClicked(!cellClicked);
                  }}
                  size={cellSize}
                  weight={cell.weight}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const RenderButton: React.FC<{ ongoing: boolean }> = ({ ongoing }) => {
  const { playing, solved } = useControl();

  if (!playing && !solved && !ongoing) {
    return <p className="text-xl font-semibold">Start</p>;
  } else if (playing && !solved && !ongoing) {
    // ongoing and playing
    return <LoadingCircle />;
  }

  return <LoadingCircleCompleted />;
};

export function InitlizeGridWithRandomWalls(
  cellSize: CellSize,
  strength: number
): Cell[][] {
  let newGridWithWalls: Cell[][] = [];
  let i = 0;
  for (let row = 0; row <= cellSizeRecord[cellSize].row; row++) {
    const currentRow: any = [];
    for (let col = 0; col <= cellSizeRecord[cellSize].col; col++) {
      const cell = MakeCell(i, col, row); //push current row to Cell
      const strengthVal = 12.5 + 1 - strength;

      let rand = Math.floor(utils.getRandomInt(1, strengthVal));

      if (cell.isStart || cell.isFinish) {
      } else if (rand === 1) {
        cell.isWall = true;
      }
      currentRow.push(cell);
      i++;
    }
    newGridWithWalls.push(currentRow);
  }
  return newGridWithWalls;
}

export function InitlizeGrid(cellSize: CellSize): Cell[][] {
  let newGrid: Cell[][] = [];
  let i = 0;
  for (let row = 0; row <= cellSizeRecord[cellSize].row; row++) {
    const currentRow: any = [];
    for (let col = 0; col <= cellSizeRecord[cellSize].col; col++) {
      currentRow.push(MakeCell(i, col, row)); //push current row to Cell
      i++;
    }
    newGrid.push(currentRow);
  }
  return newGrid; // push to grid
}

export default Grid;
