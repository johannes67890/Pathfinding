import { Vertex } from "@models/graphTypes";
import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * Context for the start and stop vertices of the graph
 */
export const StartStopContext = createContext<{
  start: Vertex | undefined;
  setStart: React.Dispatch<React.SetStateAction<Vertex | undefined>>;
  stop: Vertex | undefined;
  setStop: React.Dispatch<React.SetStateAction<Vertex | undefined>>;
}>({
  start: undefined,
  setStart: () => {},
  stop: undefined,
  setStop: () => {},
});

export const StartStopProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [start, setStart] = useState<Vertex | undefined>();
  const [stop, setStop] = useState<Vertex | undefined>();

  const startStopContextValue = useMemo(
    () => ({ start, setStart, stop, setStop }),
    [start, stop],
  );

  return (
    <StartStopContext.Provider value={startStopContextValue}>
      {children}
    </StartStopContext.Provider>
  );
};

const useStartStop = () => {
  const context = useContext(StartStopContext);
  if (!context) {
    throw new Error("useEdge must be used within a EdgeProvider");
  }
  return context;
};

export default useStartStop;
