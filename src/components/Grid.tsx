import Cell, { CellProps, CellSize, SizeGrid, MakeCell } from "./Cell";
import { CellSizeContext, ControlContext, GridContext } from "./Contexts";
import { useState, useEffect, useContext } from "react";
import * as utils from "../utils";
import { Button as FlowbiteBtn } from "flowbite-react/lib/esm/components/Button";
import Algortims from "./Algortims";

const Grid = () => {
  const { grid, setGrid, gridRef } = useContext(GridContext);
  const { cellSize } = useContext(CellSizeContext);
  const { playing, setPlaying, solved, setSolved } = useContext(ControlContext);

  const [cellClicked, setCellClicked] = useState<boolean>(false);
  const [ongoing, setOngoing] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    // When animation is done and user wants to refresh the grid.
    if (refresh) {
      setGrid(InitlizeGrid(cellSize));
      setGrid((prevGrid) => {
        const newGrid = prevGrid.slice();
        for (let row of newGrid) {
          for (let cell of row) {
            cell.isVisited = false;
            if (cell.isStart || cell.isFinish) {
              continue;
            }
            document.getElementById(
              `row-${cell.row} col-${cell.col}`
            )!.className = `border border-black ${SizeGrid[cellSize][0]} ${SizeGrid[cellSize][1]}`;
          }
        }
        return newGrid;
      });
    }
  }, [refresh]);

  useEffect(() => {
    // on cell size change
    setGrid(InitlizeGrid(cellSize));
  }, [cellSize])

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
        {playing && !solved && !ongoing ? (
          <Algortims ongoing={ongoing} />
        ) : null}

        <RenderButton ongoing={ongoing} />
      </FlowbiteBtn>

      {grid.map((row, index) => {
        return (
          <div
            className={utils.classNames(SizeGrid[cellSize][0], "w-max")}
            key={index}
          >
            {row.map((cell, cellIndex) => {
              return (
                <Cell
                  row={cell.row}
                  col={cell.col}
                  key={cellIndex}
                  className={cell.className}
                  isVisited={cell.isVisited}
                  isFinish={cell.isFinish}
                  isStart={cell.isStart}
                  isWall={cell.isWall}
                  distance={cell.distance}
                  previousCell={cell.previousCell}
                  onClick={() => {
                    if (cell.isWall === false) {
                      cell.isWall = true;
                    } else cell.isWall = false;
                
                    setCellClicked(!cellClicked);
                  }}
                  size={cellSize}
                  cost={{
                    gCost: cell.cost.gCost,
                    hCost: cell.cost.hCost,
                    fCost: cell.cost.fCost,
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

const RenderButton: React.FC<{ ongoing: boolean }> = ({ ongoing }) => {
  const { playing, solved } = useContext(ControlContext);

  if (!playing && !solved && !ongoing) {
    return <p className="text-xl font-semibold">Start</p>;
  } else if (playing && !solved && !ongoing) {
    // ongoing and playing
    return (
      <div id="status" className="group relative">
        <svg
          aria-hidden="true"
          className="animate-spin w-8 h-8 text-gray-400  dark:text-gray-600 fill-blue-600"
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
        {/* <button
          disabled={true}
          className="button absolute hidden p-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:inline ml-auto mr-auto"
        /> */}
      </div>
    );
  }
  /* Button pause */
  // else if (!playing && !solved && ongoing) {
  //   // paused
  //   return (
  //     <div id="status" className="group relative">
  //       <svg
  //         aria-hidden="true"
  //         className="paused transition delay-[250] ease-in-out w-8 h-8 text-blue-600  dark:text-gray-600"
  //         viewBox="0 0 100 101"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  //           fill="currentColor"
  //         />
  //         <path
  //           d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  //           fill="currentFill"
  //         />
  //       </svg>
  //       <button className="buttonpause absolute  p-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:inline ml-auto mr-auto" />
  //     </div>
  //   );
  // }
  return (
    <div id="status" className="group relative">
      <svg
        className="paused transition delay-[250] ease-in-out w-8 h-8 text-green-400  dark:text-gray-600"
        aria-hidden="true"
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
      <svg
        className="absolute p-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:inline ml-auto mr-auto"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="40"
        viewBox="0 0 32 30"
        height="40"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
      >
        <defs>
          <clipPath id="id1">
            <path
              d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 "
              clip-rule="nonzero"
            />
          </clipPath>
        </defs>
        <g clip-path="url(#id1)">
          <path
            fill="rgb(13.729858%, 12.159729%, 12.548828%)"
            d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 "
            fill-opacity="1"
            fill-rule="nonzero"
          />
        </g>
      </svg>
    </div>
  );
};

export function InitlizeGridWithRandomWalls(
  cellSize: CellSize,
  strength: number
): CellProps[][] {
  let newGridWithWalls: CellProps[][] = [];
  for (let row = 0; row <= SizeGrid[cellSize][2]; row++) {
    const currentRow: any = [];
    for (let col = 0; col <= SizeGrid[cellSize][3]; col++) {
      const cell = MakeCell(col, row, cellSize); //push current row to Cell
      const strengthVal = 12.5 + 1 - strength;

      let rand = Math.floor(utils.getRandomInt(1, strengthVal));

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
      currentRow.push(MakeCell(col, row, cellSize)); //push current row to Cell
    }
    newGrid.push(currentRow);
  }
  return newGrid; // push to grid
}

export default Grid;
