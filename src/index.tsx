import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Grid from "./components/grid/Grid";
import {  HeaderGraph, HeaderGrid } from "./components/Headers";
import GridContexts from "./components/grid/context/GridContexts";
import Renderer from "./components/Threejs/Renderer";
const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const Index = () => {
  return (
    <React.StrictMode>
      <div className="max-w-7xl mx-auto mt-3">
        {/* <GridContexts>
          <HeaderGrid />
          <Grid />
        </GridContexts> */}
        <HeaderGraph />
        <Renderer  />
      </div>
    </React.StrictMode>
  );
};
root.render(root ? <Index /> : null);
