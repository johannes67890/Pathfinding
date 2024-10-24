import React, {
  createContext,
  useMemo,
  useState,
  ReactNode,
  useContext,
} from "react";

// setSpeed context
export const SpeedContext = createContext<{
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
}>({
  speed: 10,
  setSpeed: () => {},
});

export const SpeedProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [speed, setSpeed] = useState<number>(10);
  const SpeedValue = useMemo(
    () => ({
      speed,
      setSpeed,
    }),
    [speed, setSpeed],
  );
  return (
    <SpeedContext.Provider value={SpeedValue}>{children}</SpeedContext.Provider>
  );
};

const useSpeed = () => {
  const context = useContext(SpeedContext);
  if (!context) {
    throw new Error("useSpeed must be used within a SpeedProvider");
  }
  return context;
};

export default useSpeed;
