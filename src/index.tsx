import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {  HeaderGraph, HeaderGrid } from "./components/static/Headers";

import { Route, Routes, ErrorResponse, Navigate } from "react-router";
import Root from "./components/static/Root";
import Error from "./components/static/Error";
import NotFound from "./components/static/NotFound";
import GridContexts from "./components/tools/grid/context/GridContexts";
import Grid from "./components/tools/grid/Grid";
import Renderer from "./components/tools/graph/Renderer";
const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const Index = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className="max-w-7xl mx-auto mt-3">
          <Routes>
            <Route path="/" element={<Root />} errorElement={<Error />} />

            <Route path="/grid" element={
              <GridContexts>
                <HeaderGrid />
                <Grid />
              </GridContexts>
            } 
            errorElement={<Error />}
            />
            
            <Route path="/graph" element={
              <>
                <HeaderGraph />
                <Renderer  />
              </>
            } />
            
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/grid/*" element={<Navigate to="/grid" replace />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
};
root.render(root ? <Index /> : null);
