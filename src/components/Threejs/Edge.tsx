import React, { useContext } from "react";
import * as THREE from "three";
import { verticesContext } from "./Renderer";
import { Line, LineProps } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Edge: React.FC<{
line: LineProps;
  meshRef?: React.RefObject<THREE.Mesh>;
}> = ({line, meshRef }) => {
    

  return (
    <mesh ref={meshRef}>
        <Line lineWidth={3} color={"red"} points={line.points} />
    </mesh>
  );
};

export default Edge;
