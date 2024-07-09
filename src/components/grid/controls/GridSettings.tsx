import { useContext, useState } from "react";
import { Button as FlowbiteBtn } from "flowbite-react/lib/esm/components/Button";
import { CellSize, CellSizeContext } from "../context/useCellSize";
import useControl from "../context/useControl";
import useGrid from "../context/useGrid";
import { InitlizeGridWithRandomWalls } from "../Grid";


const GridSettings = () => {
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

  export default GridSettings;