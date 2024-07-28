import React, { createContext, useMemo, useState, ReactNode, useContext, useRef } from "react";
import { InitlizeGrid } from "../Grid";
import { CellSizeContext } from "./useCellSize";
import Cell from "@models/gridTypes";

export const GridContext = createContext<{
    grid: Cell[][];
    setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>;
    gridCells: React.MutableRefObject<React.RefObject<HTMLButtonElement>[][]>;
    setGridCells: (newGrid: Cell[][]) => void;
  }>({
    grid: [],
    setGrid: () => {},
    gridCells: { current: [] },
    setGridCells: () => {},
  });

export const GridContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {cellSize} = useContext(CellSizeContext);

    const [grid, setGrid] = useState<Cell[][]>(InitlizeGrid(cellSize));
    const gridCells = useRef<React.RefObject<HTMLButtonElement>[][]>(grid.map((row) => row.map(() => React.createRef())));
    const GridValue = useMemo(
      () => ({
        grid,
        setGrid,
        gridCells,
        setGridCells: (newGrid: Cell[][]) => {
          gridCells.current = newGrid.map((row) => row.map(() => React.createRef()));
        }
      }),
      [grid, setGrid, gridCells]
    );
    return (
      <GridContext.Provider value={GridValue}>
        {children}
      </GridContext.Provider>
    );
};

const useGrid = () => {
    const context = useContext(GridContext);
    if (!context) {
      throw new Error("useGrid must be used within a GridContextProvider");
    }
    return context;
};

export default useGrid;
