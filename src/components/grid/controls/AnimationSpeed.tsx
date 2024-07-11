import { Button as FlowbiteBtn } from "flowbite-react";
import useControl from "../context/useControl";
import useSpeed from "../context/useSpeed";

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
      </div>
    );
  };
  export default AnimationSpeed;

  