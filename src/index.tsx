import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./index.css";
import Grid from "./components/Grid";
import Header from "./components/Header";

const Index = () => {
  const [nodeSize, setNodeSize] = useState<Array<number>>([10, 18, 31]); // h-[0]; row-[1]; col-[2]

  return (
    <React.StrictMode>
      <div className="max-w-7xl mx-auto mt-3">
        <Header setNodeSize={setNodeSize} />
        <Grid nodeSize={nodeSize} />
      </div>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
