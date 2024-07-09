import { useContext, useState } from "react";
import * as utils from "../utils";
import { Button as FlowbiteBtn } from "flowbite-react/lib/esm/components/Button";
import { InitlizeGridWithRandomWalls } from "./grid/Grid";
import Watermark from "./static/Watermark";
import { CellSize, CellSizeContext } from "./grid/context/useCellSize";
import useControl, { Algorithm } from "./grid/context/useControl";
import useGrid from "./grid/context/useGrid";
import useSpeed from "./grid/context/useSpeed";
import CellColorGuide from "./grid/static/CellColorGuide";

export const HeaderGrid = () => {
  return (
    <div className="rounded-t-md grid grid-cols-4 grid-flow-col my-4">
      <Watermark />
      <CellColorGuide />
      <GridSettings />
      <AnimationSpeed />
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

export const GridSettings = () => {
  const { cellSize, setCellSize } = useContext(CellSizeContext);
  const { playing } = useControl();
  const { setGrid } = useGrid();

  const [strength, setStrength] = useState<number>(5);

  return (
    <div className="flex flex-col gap-1 mx-auto">
      <h2 className="font-bold mx-auto">Cell Size</h2>
      <FlowbiteBtn.Group outline={true} >
        <FlowbiteBtn
          disabled={playing}
          color="gray"
          onClick={() => setCellSize(CellSize.big)}
        >
          Big
        </FlowbiteBtn>
        <FlowbiteBtn
          disabled={playing}
          color="gray"
          onClick={() => setCellSize(CellSize.default)}
        >
          Default
        </FlowbiteBtn>
        <FlowbiteBtn
          disabled={playing}
          color="gray"
          onClick={() => setCellSize(CellSize.small)}
        >
          Small
        </FlowbiteBtn>
      </FlowbiteBtn.Group>
      <FlowbiteBtn
        color="gray"
        outline={true}
        className="focus:ring-0"
        onClick={() => {
          setGrid(InitlizeGridWithRandomWalls(cellSize, strength));
        }}
        disabled={playing ? true : false}
      >
        Random Walls
      </FlowbiteBtn>
      <div className="flex gap-3">
        <div className="w-52">
          <input
            list="tickmarks-strength"
            id="minmax-range"
            onChange={(e) => setStrength(parseInt(e.target.value))}
            type="range"
            step={1}
            max={10}
            min={1}
            disabled={playing}
            value={strength}
            className="w-52 h-3 border border-black bg-white rounded-lg cursor-pointer dark:bg-gray-700"
          />
          <datalist
            id="tickmarks-strength"
            className="flex text-black  justify-between"
          >
            <option value="1" label="1"></option>
            <option value="5" label="5"></option>
            <option value="10" label="10"></option>
          </datalist>
        </div>
      </div>
    </div>
  );
};

const AnimationSpeed = () => {
  const { speed, setSpeed } = useSpeed();
  const { playing } = useControl();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">Animation Speed</h2>
      <div className="flex gap-3">
        <div>
          <input
            list="tickmarks"
            id="minmax-range"
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            type="range"
            step={1}
            max={20}
            min={1}
            disabled={playing}
            value={speed}
            className="w-60 h-3 border border-black bg-white rounded-lg cursor-pointer dark:bg-gray-700"
          />
          <datalist
            id="tickmarks"
            className="flex text-black w-60 justify-between"
          >
            <option value="1" label="1 ms"></option>
            <option value="10" label="10 ms"></option>
            <option value="20" label="20 ms"></option>
          </datalist>
        </div>
        <FlowbiteBtn
          disabled={playing}
          outline={true}
          color="gray"
          className="w-20"
          onClick={() => setSpeed(10)}
        >
          Reset
        </FlowbiteBtn>
      </div>
      <Algortims />
    </div>
  );
};

const Algortims = () => {
  
  const { playing, algorithm, setAlgorithm } = useControl();
  return (
    <div className="flex flex-col gap-2 mx-auto">
      <h2 className="font-bold mx-auto">Algorithms</h2>
      <FlowbiteBtn.Group outline={true}>
        <FlowbiteBtn
          className={algorithm == Algorithm.Dijksta ? "border-blue-700 border-1 bg-blue-200" : ""}
          color="gray"
          disabled={playing ? true : false}
          onClick={() => {
            setAlgorithm(Algorithm.Dijksta);
          }}
        >
          Dijkstra
        </FlowbiteBtn>
        <FlowbiteBtn
          className={algorithm == Algorithm.Astar ? "border-blue-700 border-1 bg-blue-200" : ""}

          color="gray"
          disabled={playing ? true : false}
          onClick={() => {
            setAlgorithm(Algorithm.Astar);
          }}
        >
          Astar (A*)
        </FlowbiteBtn>
      </FlowbiteBtn.Group>
    </div>
  );
};

