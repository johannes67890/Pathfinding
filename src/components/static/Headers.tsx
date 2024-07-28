import Watermark from "./Watermark";

import Return from "./Return";
import CellColorGuide from "../tools/grid/controls/CellColorGuide";
import GridSettings from "../tools/grid/controls/GridSettings";
import AnimationSpeed from "../tools/grid/controls/AnimationSpeed";
import AlgorithmSelector from "../tools/grid/controls/AlgorithmSelector";

export const HeaderGrid = () => {
  return (
    <div className="rounded-t-md grid grid-cols-[min-content,1fr,1fr,1fr,1fr] gap-5 grid-flow-col my-4">
      <Return />
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
    <div className="rounded-t-md grid grid-cols-[min-content,1fr,1fr,1fr,1fr] gap-4 my-4">
      <Return />
      <Watermark />
    </div>
  );
};

