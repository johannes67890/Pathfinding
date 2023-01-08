import React, { createContext, useMemo, useState } from "react";
import { CellProps, CellSize, SizeGrid } from "./Cell";
import { InitlizeGrid } from "./Grid";
// creat context for cell size
export const CellSizeContext = createContext<{
  cellSize: CellSize;
  setCellSize: React.Dispatch<React.SetStateAction<CellSize>>;
}>({
  cellSize: CellSize.default,
  setCellSize: () => {},
});

export const GridContext = createContext<{
  grid: CellProps[][];
  setGrid: React.Dispatch<React.SetStateAction<CellProps[][]>>;
}>({
  grid: [],
  setGrid: () => {},
});

// setSpeed context
export const SpeedContext = createContext<{
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
}>({
  speed: 50,
  setSpeed: () => {},
});

// Controlflow context
export const ControlContext = createContext<{
  algorithm: string;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  algorithm: "Dijksta",
  playing: false,
  setPlaying: () => {},
});

// Creat nested context for CelllSize and Speed
export const AppContexts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cellSize, setCellSize] = useState<CellSize>(CellSize.default);
  const [grid, setGrid] = useState<CellProps[][]>(InitlizeGrid(cellSize));
  const GridValue = useMemo(
    () => ({
      grid,
      setGrid,
      cellSize,
      setCellSize,
    }),
    [cellSize, setCellSize]);
    
    const [playing, setPlaying] = useState<boolean>(false);
    const [algorithm, setAlgorithm] = useState<string>("Dijksta");
    const ControlValue = useMemo(
      () => ({
        algorithm,
        playing,
        setPlaying,
      }),
      [algorithm, setAlgorithm, playing, setPlaying]


  );

  return (
    <CellSizeContext.Provider value={GridValue}>
      <ControlContext.Provider value={ControlValue}>
        <GridContext.Provider value={GridValue}>{children}</GridContext.Provider>
      </ControlContext.Provider>
    </CellSizeContext.Provider>
  );
};
