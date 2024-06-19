import React from "react";

import {CellSizeProvider} from "./useCellSize";
import {GridContextProvider} from "./useGrid";
import {ControlProvider} from "./useControl";
import { SpeedProvider } from "./useSpeed";


// Creat nested context for CelllSize and Speed
const AppContexts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CellSizeProvider>
      <ControlProvider>
        <GridContextProvider>
          <SpeedProvider>
            {children}
          </SpeedProvider>
        </GridContextProvider>
      </ControlProvider>
    </CellSizeProvider>
  );
};

export default AppContexts;