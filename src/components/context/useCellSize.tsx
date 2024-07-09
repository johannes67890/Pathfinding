import React, { useMemo, useState, ReactNode, useContext } from "react";

/**
 * CellSizeContext - Context to manage the cell size. 
 * 
 */
export enum CellSize {
  small,
  default,
  big,
}

export const cellSizeRecord: Record<CellSize, {className: string, row: number, col: number}> = {
  [CellSize.small]: {
    className: "h-5 w-5",
    row: 31,
    col: 63,
  },
  [CellSize.default]: {
    className: "h-8 w-8",
    row: 19,
    col: 39,
  },
  [CellSize.big]: {
    className: "h-10 w-10",
    row: 15,
    col: 31,
  }
};

export const CellSizeContext = React.createContext<{
  cellSizeRecord: Record<CellSize, {className: string, row: number, col: number}>;
  cellSize: CellSize;
  setCellSize: React.Dispatch<React.SetStateAction<CellSize>>;
}>({
  cellSizeRecord,
  cellSize: CellSize.default,
  setCellSize: () => {},
});

export const CellSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cellSize, setCellSize] = useState<CellSize>(CellSize.default);
  const cellValue = useMemo(() => ({ cellSizeRecord, cellSize, setCellSize }), [cellSize]);

  return (
    <CellSizeContext.Provider value={cellValue}>
      {children}
    </CellSizeContext.Provider>
  );
};

const useCellSize = () => {
  const context = useContext(CellSizeContext);
  if (!context) {
    throw new Error("useCellSize must be used within a CellSizeProvider");
  }
  return context;
};

export default useCellSize;
