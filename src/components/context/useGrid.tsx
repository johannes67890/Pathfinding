import React, { createContext, useMemo, useState, ReactNode, useContext, useRef } from "react";
import { CellProps, CellSize } from "../Cell";
import { InitlizeGrid } from "../Grid";
import { CellSizeContext } from "./useCellSize";

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

export const GridContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {cellSize} = useContext(CellSizeContext);

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
