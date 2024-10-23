import React, { createContext, useContext, useMemo, useState } from "react";
import { Vertex } from "@models/graphTypes";

export const verticesContext = createContext<{
  vertices: Vertex[];
  setVertices: React.Dispatch<React.SetStateAction<Vertex[]>>;
}>({ vertices: [], setVertices: () => {} });

export const VerticesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vertices, setVertices] = useState<Vertex[]>([]);

  const verticesContextValue = useMemo(
    () => ({ vertices, setVertices }),
    [vertices],
  );

  return (
    <verticesContext.Provider value={verticesContextValue}>
      {children}
    </verticesContext.Provider>
  );
};

const useVertices = () => {
  const context = useContext(verticesContext);
  if (!context) {
    throw new Error("useVertices must be used within a VerticesProvider");
  }
  return context;
};

export default useVertices;
