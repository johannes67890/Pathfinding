import React, { createContext, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Grid from "./components/Grid";
import { Header } from "./components/Header";
import { CellSize, SizeGrid } from "./components/Cell";
import { AppContexts } from "./components/Contexts";
import Algortims from "./components/Algortims";

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const Index = () => {
  return (
    <React.StrictMode>
      <div className="max-w-7xl mx-auto mt-3">
        <AppContexts>
          <Header />
          <Grid />
        </AppContexts>
      </div>
    </React.StrictMode>
  );
};
root.render(root ? <Index /> : null);
