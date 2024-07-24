import React, { useEffect } from "react";
import { EdgeProvider } from "./useEdge";
import { VerticesProvider } from "./useVertices";

/**
 * AppContexts 
 * @param 
 * @returns 
 */
const GraphContexts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    console.log("GraphContexts mounted");
  });
  return (
    <>
      <VerticesProvider>

          {children}
    
      </VerticesProvider>
    </>
        
  );
};

export default GraphContexts;