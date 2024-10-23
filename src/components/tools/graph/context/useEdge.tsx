import { Vertex } from "@models/graphTypes";
import React, { createContext, useContext, useMemo, useState } from "react";

export const EdgeContext = createContext<{
  edge: Vertex | undefined;
  setEdge: React.Dispatch<React.SetStateAction<Vertex | undefined>>;
}>({
  edge: undefined,
  setEdge: () => {},
});

export const EdgeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [edge, setEdge] = useState<Vertex | undefined>();
  const edgeContextValue = useMemo(() => ({ edge, setEdge }), [edge]);
  return (
    <EdgeContext.Provider value={edgeContextValue}>
      {children}
    </EdgeContext.Provider>
  );
};

const useEdge = () => {
  const context = useContext(EdgeContext);
  if (!context) {
    throw new Error("useEdge must be used within a EdgeProvider");
  }
  return context;
};

export default useEdge;
