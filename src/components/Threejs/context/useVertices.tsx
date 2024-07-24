import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { vertex } from "../../Types";

export const verticesContext = createContext<{
  vertices: vertex[];
  setVertices: React.Dispatch<React.SetStateAction<vertex[]>>;
}>({ vertices: [], setVertices: () => {} });

export const VerticesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vertices, setVertices] = useState<vertex[]>([]);

  const verticesContextValue = useMemo(
    () => ({ vertices, setVertices }),
    [vertices]
  );
  useEffect(() => {
    console.log("VerticesProvider mounted");
  });
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
