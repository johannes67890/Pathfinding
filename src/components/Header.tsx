import { useContext, useState } from "react";
import * as utils from "../utils";
import { CellSize } from "./Cell";
import {
  Algorithm,
  ControlContext,
  GridContext,
} from "./context/Contexts";
import { SpeedContext } from "./context/Contexts";
import { Button as FlowbiteBtn } from "flowbite-react/lib/esm/components/Button";
import { InitlizeGridWithRandomWalls } from "./Grid";
import Watermark from "./statics/Watermark";
import CellSizeContext from "./context/useCellSize";

export const Header = () => {
  return (
    <div className="rounded-t-md grid grid-cols-4 grid-flow-col my-4">
      <Watermark />
      <CellSelectorMenu />
      <GridSettings />
      <AnimationSpeed />
    </div>
  );
};

export const GridSettings = () => {
  const { cellSize, setCellSize } = useContext(CellSizeContext);
  const { playing } = useContext(ControlContext);
  const { setGrid } = useContext(GridContext);

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

export enum CellVariant {
  startCell,
  endCell,
  wall,
  visited,
  visiting,
}

export const CellColorRecord: Record<CellVariant, string> = {
  [CellVariant.startCell]: "bg-green-600",
  [CellVariant.endCell]: "bg-red-600",
  [CellVariant.wall]: "bg-gray-900",
  [CellVariant.visited]: "bg-blue-700",
  [CellVariant.visiting]: "bg-yellow-300",
};

const CellTextRecord: Record<CellVariant, string> = {
  [CellVariant.startCell]: "Start Cell",
  [CellVariant.endCell]: "End Cell",
  [CellVariant.wall]: "Wall",
  [CellVariant.visited]: "Visited",
  [CellVariant.visiting]: "Currently Visiting",
};

const CellSelectorMenu = () => {
  let CellColorSelector: Array<string> = [];

  for (let i = 0; i < Object.keys(CellColorRecord).length; i++) {
    // loop though CellVariant
    const element = CellColorRecord[i as CellVariant]; // cast i as CellColor type
    CellColorSelector.push(element);
  }
  return (
    <div className="mx-auto">
      <ul className="flex gap-1 p-1 flex-col">
        {CellColorSelector.map((bgColor, index) => {
          return (
            <li className="flex gap-2" key={index}>
              <span className="w-28 my-auto text-xs font-bold">
                {CellTextRecord[index as CellVariant]}
              </span>
              <rect
                className={utils.classNames(
                  bgColor,
                  "h-6 w-6 my-auto rounded-md"
                )}
              ></rect>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const AnimationSpeed = () => {
  const { speed, setSpeed } = useContext(SpeedContext);
  const { playing } = useContext(ControlContext);

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
  
  const { playing, algorithm, setAlgorithm } = useContext(ControlContext);
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

export default Header;
