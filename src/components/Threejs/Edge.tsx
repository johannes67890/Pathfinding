import React, { useEffect } from "react";
import * as THREE from "three";
import { verticesContext } from "./Renderer";
import { Line, LineProps } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { vertex } from "../statics/Types";

const Edge: React.FC<{
  from: vertex;
  to: vertex;
  meshRef: React.RefObject<THREE.Mesh>;
}> = ({from, to, meshRef }) => {
  useFrame(() => {
  });

  return (
    <mesh ref={meshRef}>
          <Line
            points={[
              from.meshRef.current!.position,
              to.meshRef.current!.position,
            ]}
            color="blue"
          />
    </mesh>
  );
};

export default Edge;
