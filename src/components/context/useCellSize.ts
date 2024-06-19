import React, { createContext, useMemo, useState, ReactNode, useContext } from "react";
import { CellSize } from "../Cell";

// Create the context outside of the component
export const CellSizeContext = React.createContext<{
  cellSize: CellSize;
  setCellSize: React.Dispatch<React.SetStateAction<CellSize>>;
}>({
  cellSize: CellSize.default,
  setCellSize: () => {},
});

const CellSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cellSize, setCellSize] = useState<CellSize>(CellSize.default);
  const cellValue = useMemo(() => ({ cellSize, setCellSize }), [cellSize]);

  return (
    <CellSizeContext.Provider value={cellValue}>
      {children}
    </CellSizeContext.Provider>
  );
};

export default CellSizeProvider;
