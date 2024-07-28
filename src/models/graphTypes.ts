import Node from "./generics";
import * as THREE from "three";

export interface Vertex extends Node {
  text: string;
  position: THREE.Vector3;
  outdegree: Vertex[];
  indegree: Vertex[];
  meshRef: React.RefObject<THREE.Mesh>;
}

export interface Edge {
  from: Vertex;
  to: Vertex;
  weight: number;
}
