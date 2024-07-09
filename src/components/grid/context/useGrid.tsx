import React, { createContext, useMemo, useState, ReactNode, useContext, useRef } from "react";
import { InitlizeGrid } from "../Grid";
import { CellSizeContext } from "./useCellSize";
import { cell } from "../../Types";

export const GridContext = createContext<{
    grid: cell[][];
    setGrid: React.Dispatch<React.SetStateAction<cell[][]>>;
    gridCells: React.MutableRefObject<React.RefObject<HTMLButtonElement>[][]>;
    setGridCells: (newGrid: cell[][]) => void;
  }>({
    grid: [],
    setGrid: () => {},
    gridCells: { current: [] },
    setGridCells: () => {},
  });

export const GridContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {cellSize} = useContext(CellSizeContext);

    const [grid, setGrid] = useState<cell[][]>(InitlizeGrid(cellSize));
    const gridCells = useRef<React.RefObject<HTMLButtonElement>[][]>(grid.map((row) => row.map(() => React.createRef())));
    const GridValue = useMemo(
      () => ({
        grid,
        setGrid,
        gridCells,
        setGridCells: (newGrid: cell[][]) => {
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
