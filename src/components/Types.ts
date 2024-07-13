import { CellSize } from "./grid/context/useCellSize";
import * as THREE from "three";

type VertexType = { id: number };

export interface cell extends VertexType {
  col: number;
  row: number;
  weight: number;
  className?: string;
  isFinish?: boolean;
  isStart?: boolean;
  isWall?: boolean;
  size?: CellSize | CellSize.default;
  onClick?: () => unknown;
};

export interface vertex extends VertexType {
  text: string;
  position: THREE.Vector3;
  outdegree: vertex[];
  indegree: vertex[];
  meshRef: React.RefObject<THREE.Mesh>;
}

export default VertexType;


