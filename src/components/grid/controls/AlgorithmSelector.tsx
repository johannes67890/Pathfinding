
import { Button as FlowbiteBtn } from "flowbite-react";
import useControl, { Algorithm } from "../context/useControl";

const AlgorithmSelector = () => {
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

  export default AlgorithmSelector;