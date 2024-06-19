import React, { createContext, useMemo, useRef, useState } from "react";
import { CellProps, CellSize } from "../Cell";
import { InitlizeGrid } from "../Grid";
import CellSizeContext from "./useCellSize";


export const GridContext = createContext<{
  grid: CellProps[][];
  setGrid: React.Dispatch<React.SetStateAction<CellProps[][]>>;
  gridCells: React.MutableRefObject<React.RefObject<HTMLButtonElement>[][]>;
  setGridCells: (newGrid: CellProps[][]) => void;
}>({
  grid: [],
  setGrid: () => {},
  gridCells: { current: [] },
  setGridCells: () => {},
});

// setSpeed context
export const SpeedContext = createContext<{
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
}>({
  speed: 50,
  setSpeed: () => {},
});

export enum Algorithm {
  Dijksta = "Dijksta",
  Astar = "A*",
}

// Controlflow context
export const ControlContext = createContext<{
  algorithm: Algorithm;
  setAlgorithm: React.Dispatch<React.SetStateAction<Algorithm>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  solved: boolean;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  algorithm: Algorithm.Dijksta,
  setAlgorithm: () => {},
  playing: false,
  setPlaying: () => {},
  solved: false,
  setSolved: () => {},
});

// Creat nested context for CelllSize and Speed
const AppContexts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cellSize, setCellSize] = useState<CellSize>(CellSize.default);
  const cellValue = useMemo(
    () => ({
      cellSize,
      setCellSize,
    }),
    [cellSize, setCellSize]
  );

  const [grid, setGrid] = useState<CellProps[][]>(InitlizeGrid(cellSize));
  const gridCells = useRef<React.RefObject<HTMLButtonElement>[][]>(grid.map((row) => row.map(() => React.createRef())));
  const GridValue = useMemo(
    () => ({
      grid,
      setGrid,
      gridCells,
      setGridCells: (newGrid: CellProps[][]) => {
        gridCells.current = newGrid.map((row) => row.map(() => React.createRef()));
      }
    }),
    [grid, setGrid, gridCells]
  );

  const [playing, setPlaying] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.Dijksta);
  const ControlValue = useMemo(
    () => ({
      algorithm,
      setAlgorithm,
      playing,
      setPlaying,
      solved,
      setSolved,
    }),
    [algorithm, setAlgorithm, playing, setPlaying, solved, setSolved]
  );

  const [speed, setSpeed] = useState<number>(10);
  const SpeedValue = useMemo(
    () => ({
      speed,
      setSpeed,
    }),
    [speed, setSpeed]
  );

  return (
    <CellSizeContext.Provider value={cellValue}>
      <ControlContext.Provider value={ControlValue}>
        <GridContext.Provider value={GridValue}>
          <SpeedContext.Provider value={SpeedValue}>
            {children}
          </SpeedContext.Provider>
        </GridContext.Provider>
      </ControlContext.Provider>
    </CellSizeContext.Provider>
  );
};

export default AppContexts;