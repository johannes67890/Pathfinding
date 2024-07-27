import Watermark from "./Watermark";
import CellColorGuide from "../grid/controls/CellColorGuide";
import GridSettings from "../grid/controls/GridSettings";
import AnimationSpeed from "../grid/controls/AnimationSpeed";
import AlgorithmSelector from "../grid/controls/AlgorithmSelector";
import Return from "./Return";

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

