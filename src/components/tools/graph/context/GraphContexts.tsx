import React from "react";
import { EdgeProvider } from "./useEdge";
import { VerticesProvider } from "./useVertices";
import { StartStopProvider } from "./useStartStop";

/**
 * AppContexts
 * @param
 * @returns
 */
// eslint-disable-next-line react/function-component-definition
const GraphContexts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <VerticesProvider>
    <EdgeProvider>
      <StartStopProvider>{children}</StartStopProvider>
    </EdgeProvider>
  </VerticesProvider>
);

export default GraphContexts;
