import React, { Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HeaderGraph, HeaderGrid } from "./components/static/Headers";

import { Route, Routes, ErrorResponse, Navigate } from "react-router";
import NotFound from "./components/static/NotFound";
import Home from "@pages/Home";
import GridTool from "@pages/GridTool";
import GraphTool from "@pages/GraphTool";



const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const Index = () => {;
  return (
    <React.StrictMode>
      <BrowserRouter>
          <div className="max-w-7xl mx-auto mt-3">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/grid" element={<GridTool />} />

              <Route path="/graph" element={<GraphTool />} />

              <Route path="*" element={<NotFound />} />
              {/* <Route path="/grid/*" element={<Navigate to="/grid" replace />} /> */}
            </Routes>
          </div>
      </BrowserRouter>
    </React.StrictMode>
  );
};
root.render(root ? <Index /> : null);
