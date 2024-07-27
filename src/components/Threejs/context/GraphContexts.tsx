import React, { useEffect } from "react";
import { EdgeProvider } from "./useEdge";
import { VerticesProvider } from "./useVertices";
import ResetEdge from "../controls/ResetEdge";
import ContextMenu from "../controls/ContextMenu";

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
        {children}
      </EdgeProvider>
    </VerticesProvider>
  );
};

export default GraphContexts;
