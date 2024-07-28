import Node from "./generics";

interface Cell extends Node {
  col: number;
  row: number;
  weight: number;
  className?: string;
  isFinish?: boolean;
  isStart?: boolean;
  isWall?: boolean;
  size?: CellSize | CellSize.default;
  onClick?: () => unknown;
}

/**
 * CellSizeContext - Context to manage the cell size.
 *
 */
export enum CellSize {
  small,
  default,
  big,
}

export default Cell;
