import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./index.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import { NodeType, Size } from "./components/Node";

const Index = () => {
  const [node, setNode] = useState<NodeType>({ size: Size.default }); // h-[0]; row-[1]; col-[2]

  function SetNodeSize(size: Size) {
    setNode((prev) => {
      if (prev !== undefined) {
        prev.size = size;
      }
      return prev;
    });
  }

  return (
    <React.StrictMode>
      <div className="max-w-7xl mx-auto mt-3">
        <Header setNodeSize={SetNodeSize} />
        <Grid nodeSize={node} />
      </div>
    </React.StrictMode>
  );
};

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" "); // function to combind classNames
}

ReactDOM.render(<Index />, document.getElementById("root"));
