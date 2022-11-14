import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./index.css";
import Grid from "./components/Grid";
import { Header } from "./components/Header";
import { CellSize } from "./components/Cell";

const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const Index = () => {
  const [cellSize, setCellSize] = useState<CellSize>(CellSize.default);
  const [cellCost, setCellCost] = useState<number>(0);
  root.render(
    <React.StrictMode>
      <div className="max-w-7xl mx-auto mt-3">
        <Header setCellSize={setCellSize} />
        <Grid cellSize={cellSize} />
      </div>
    </React.StrictMode>
  );
};

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" "); // function to combind classNames
}
