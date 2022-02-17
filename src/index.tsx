import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./index.css";
import Grid from "./components/Grid";
import { Header } from "./components/Header";
import { CellSize } from "./components/Cell";

const Index = () => {
  const [cellSize, setCellSize] = useState<CellSize>(CellSize.default);
  const [cellCost, setCellCost] = useState<number>(0);
  return (
    <React.StrictMode>
      <div className="max-w-7xl mx-auto mt-3">
        <Header setCellSize={setCellSize} cellCost={cellCost} />
        <Grid cellSize={cellSize} setCellCost={setCellCost} />
      </div>
    </React.StrictMode>
  );
};

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" "); // function to combind classNames
}

ReactDOM.render(<Index />, document.getElementById("root"));
