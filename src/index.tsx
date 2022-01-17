import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./index.css";
import Grid from "./components/Grid";
import Node from "./components/Node";
import Header from "./components/Header";

const Index = () => {
  const [nodeSelector, setNodeSelector] = useState<string>("wall");

  return (
    <React.StrictMode>
      <div className="max-w-7xl mx-auto mt-3">
        <Header />
        <Grid />
      </div>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
