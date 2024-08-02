import React from "react";
import * as utils from "@utils/utils";

enum CellVariant {
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

const CellColorGuide = () => {
  const CellColorSelector: Array<string> = [];

  for (let i = 0; i < Object.keys(CellColorRecord).length; i++) {
    // loop though CellVariant
    const element = CellColorRecord[i as CellVariant]; // cast i as CellColor type
    CellColorSelector.push(element);
  }
  return (
    <div className="mx-auto">
      <ul className="flex gap-1 p-1 flex-col">
        {CellColorSelector.map((bgColor, index) => (
          <li className="flex gap-2" key={bgColor}>
            <span className="w-28 my-auto text-xs font-bold">
              {CellTextRecord[index as CellVariant]}
            </span>
            <rect
              className={utils.classNames(
                bgColor,
                "h-6 w-6 my-auto rounded-md",
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CellColorGuide;
