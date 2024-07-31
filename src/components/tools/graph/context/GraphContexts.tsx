import React, { useEffect } from "react";
import { EdgeProvider } from "./useEdge";
import { VerticesProvider } from "./useVertices";
import ContextMenu from "../controls/ContextMenu";
import { StartStopProvider } from "./useStartStop";

/**
 * AppContexts
 * @param
 * @returns
 */
const GraphContexts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <VerticesProvider>
      <EdgeProvider>
        <StartStopProvider>
          {children}
        </StartStopProvider>
      </EdgeProvider>
    </VerticesProvider>
  );
};

export default GraphContexts;
