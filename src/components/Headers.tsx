import Watermark from "./static/Watermark";
import CellColorGuide from "./grid/controls/CellColorGuide";
import GridSettings from "./grid/controls/GridSettings";
import AnimationSpeed from "./grid/controls/AnimationSpeed";
import AlgorithmSelector from "./grid/controls/AlgorithmSelector";

export const HeaderGrid = () => {
  return (
    <div className="rounded-t-md grid grid-cols-4 grid-flow-col my-4">
      <Watermark />
      <CellColorGuide />
      <GridSettings />
      <div className="flex flex-col gap-2">
        <AnimationSpeed />
        <AlgorithmSelector />
      </div>
    </div>
  );
};

export const HeaderGraph = () => {
  return (
    <div className="rounded-t-md grid grid-cols-4 grid-flow-col my-4">
      <Watermark />
      
    </div>
  );
};

