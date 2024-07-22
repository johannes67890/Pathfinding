import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Grid from "./components/grid/Grid";
import {  HeaderGraph, HeaderGrid } from "./components/Headers";
import GridContexts from "./components/grid/context/GridContexts";
import Renderer from "./components/Threejs/Renderer";
import { Route, Routes, ErrorResponse, Navigate } from "react-router";
import Root from "./components/Root";
import Error from "./components/Error";
import NotFound from "./components/NotFound";
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
