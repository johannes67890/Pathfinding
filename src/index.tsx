import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./index.css";
import Grid from "./components/Grid";
import { Header, NodeColorRecord } from "./components/Header";
import { CellProps, CellSize, NodeVariant } from "./components/Cell";

const Index = () => {
  const [cellSize, setCellSize] = useState<CellSize>(CellSize.default);
  const [nodeSelector, setNodeSelector] = useState<NodeVariant>({
    variant: "Wall",
    color: NodeColorRecord[2],
  });

  return (
    <React.StrictMode>
      <div className="max-w-7xl mx-auto mt-3">
        <Header
          setCellSize={setCellSize}
          nodeSelector={nodeSelector}
          setNodeSelector={setNodeSelector}
        />
        <Grid cellSize={cellSize} nodeSelector={nodeSelector} />
      </div>
    </React.StrictMode>
  );
};

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" "); // function to combind classNames
}

ReactDOM.render(<Index />, document.getElementById("root"));
