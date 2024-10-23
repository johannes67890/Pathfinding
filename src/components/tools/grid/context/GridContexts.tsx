import React from "react";

import { CellSizeProvider } from "./useCellSize";
import { GridContextProvider } from "./useGrid";
import { ControlProvider } from "./useControl";
import { SpeedProvider } from "./useSpeed";

/**
 * AppContexts
 * @param
 * @returns
 */
const GridContexts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <CellSizeProvider>
    <ControlProvider>
      <GridContextProvider>
        <SpeedProvider>{children}</SpeedProvider>
      </GridContextProvider>
    </ControlProvider>
  </CellSizeProvider>
);

export default GridContexts;
