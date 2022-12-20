import React, { createContext, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Grid from "./components/Grid";
import { Header } from "./components/Header";
import { CellSize, SizeGrid } from "./components/Cell";

// creat context for cell size
export const CellSizeContext = createContext<{
  cellSize: CellSize;
  setcellSize: React.Dispatch<React.SetStateAction<CellSize>>;
}>({
  cellSize: CellSize.default,
  setcellSize: () => {},
});

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const Index = () => {
  const [cellSize, setcellSize] = useState<CellSize>(CellSize.default);
  const value = { cellSize, setcellSize };

  return (
      <React.StrictMode>
        <div className="max-w-7xl mx-auto mt-3">
          <CellSizeContext.Provider value={value}>
            <Header />
            <Grid  />
          </CellSizeContext.Provider>
        </div>
      </React.StrictMode>
  );
}
root.render(<Index />);


export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" "); // function to combind classNames
}
