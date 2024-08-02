import React, {
  createContext,
  useMemo,
  useState,
  ReactNode,
  useContext,
} from "react";

export enum Algorithm {
  Dijksta = "Dijksta",
  Astar = "A*",
}

// Controlflow context
export const ControlContext = createContext<{
  algorithm: Algorithm;
  setAlgorithm: React.Dispatch<React.SetStateAction<Algorithm>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  solved: boolean;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  algorithm: Algorithm.Dijksta,
  setAlgorithm: () => {},
  playing: false,
  setPlaying: () => {},
  solved: false,
  setSolved: () => {},
});

export const ControlProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.Dijksta);
  const ControlValue = useMemo(
    () => ({
      algorithm,
      setAlgorithm,
      playing,
      setPlaying,
      solved,
      setSolved,
    }),
    [algorithm, setAlgorithm, playing, setPlaying, solved, setSolved],
  );
  return (
    <ControlContext.Provider value={ControlValue}>
      {children}
    </ControlContext.Provider>
  );
};

const useControl = () => {
  const context = useContext(ControlContext);
  if (!context) {
    throw new Error("useControl must be used within a ControlProvider");
  }
  return context;
};

export default useControl;
