import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./index.css";
import Grid from "./components/Grid";
import Node from "./components/Node";

const Index = () => {
  const [nodeSelector, setNodeSelector] = useState<string>("wall");

  return (
    <React.StrictMode>
      <Grid />
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
