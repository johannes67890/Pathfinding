import React from "react";
import { Button as FlowbiteBtn } from "flowbite-react";
import useControl, { Algorithm } from "../context/useControl";
import { classNames } from "../../../../utils/utils";

const AlgorithmSelector = () => {
  const { playing, algorithm, setAlgorithm } = useControl();
    <div className="flex flex-col gap-2 mx-auto">
      <h2 className="font-bold mx-auto">Algorithms</h2>
      <FlowbiteBtn.Group outline className="flex">
        <FlowbiteBtn
          className={classNames(
            algorithm === Algorithm.Dijksta
              ? "border-blue-700 border-1 bg-blue-200"
              : "",
            "min-w-20",
          )}
          color="gray"
          disabled={!!playing}
          onClick={() => {
            setAlgorithm(Algorithm.Dijksta);
          }}
        >
          Dijkstra
        </FlowbiteBtn>
        <FlowbiteBtn
          className={
            algorithm === Algorithm.Astar
              ? "border-blue-700 border-1 bg-blue-200"
              : ""
          }
          color="gray"
          disabled={!!playing}
          onClick={() => {
            setAlgorithm(Algorithm.Astar);
          }}
        >
          Astar (A*)
        </FlowbiteBtn>
      </FlowbiteBtn.Group>
    </div>;
};

export default AlgorithmSelector;
