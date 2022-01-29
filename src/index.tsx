import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./index.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import { NodeType, Size } from "./components/Node";

const Index = () => {
  const [node, setNode] = useState<NodeType>({ size: Size.default });

  return (
    <React.StrictMode>
      <div className="max-w-7xl mx-auto mt-3">
        <Header setNode={setNode} />
        <Grid nodeSize={node} />
      </div>
    </React.StrictMode>
  );
};

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" "); // function to combind classNames
}

ReactDOM.render(<Index />, document.getElementById("root"));
