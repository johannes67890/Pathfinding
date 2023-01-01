import React, { createContext, useMemo, useState } from "react";
;
import { CellProps, CellSize, SizeGrid } from "./Cell";
import { InitlizeGrid } from "./Grid";
// creat context for cell size
export const CellSizeContext = createContext<{
    cellSize: CellSize;
    setcellSize: React.Dispatch<React.SetStateAction<CellSize>>;
  }>({
    cellSize: CellSize.default,
    setcellSize: () => {},
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
export const AppContexts: React.FC<{ children: React.ReactNode;}> = ({ children }) => {
    const [cellSize, setcellSize] = useState<CellSize>(CellSize.default);
    const [grid, setGrid] = useState<CellProps[][]>(InitlizeGrid(cellSize));
    const [playing, setPlaying] = useState<boolean>(false);
    const [algorithm, setAlgorithm] = useState<string>("Dijksta");
    const value = useMemo(
        () => ({
            grid,
            setGrid,
            cellSize,
            setcellSize,
            algorithm,
            playing,
            setPlaying,
        }),
        [cellSize, setcellSize,algorithm, setAlgorithm, playing, setPlaying]
    );
    
    return (   
        <CellSizeContext.Provider value={value}>
            <ControlContext.Provider value={value}>
              <GridContext.Provider value={value}>
                {children}
              </GridContext.Provider>
            </ControlContext.Provider>
        </CellSizeContext.Provider>
    );
};



  