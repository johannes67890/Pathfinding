import Node from "./Node";
import { MakeNode } from "./Node";

const Grid = () => {
  return <div className="grid">{InitilizeGrid}</div>;
};

const InitilizeGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow: Array<number> = [];
    for (let col = 0; col < 15; col++) {
      currentRow.push(MakeNode(col, row));
    }
    grid.push(currentRow);
  }

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div key={index}>
            {row.map((node, nodeIndex) => {
              const { row, col } = node;
              return (
                <Node row={row} col={col}>
                  {nodeIndex}
                </Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
