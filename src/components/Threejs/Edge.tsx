import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { verticesContext } from "./Renderer";
import { Line, LineProps, RenderCubeTexture, Text } from "@react-three/drei";
import { vertex } from "../Types";
import { useFrame } from "@react-three/fiber";

const Edge: React.FC<{
  from: vertex;
  to: vertex;
}> = ({ from, to }) => {
  const [points, setPoints] = useState([
    new THREE.Vector3(),
    new THREE.Vector3(),
  ]);
  const [midpoint, setMidpoint] = useState(new THREE.Vector3());


  useFrame(() => {
    if (from.meshRef.current && to.meshRef.current) {
      // Calculate the direction vector
      const direction = new THREE.Vector3()
        .copy(to.meshRef.current.position)
        .sub(from.meshRef.current.position)
        .normalize();
      // Scale the direction vector by the radius of the vertex size (1)
      const scaledDirection = direction.multiplyScalar(1);

      // Calculate the start and end points of the line
      const start = new THREE.Vector3(0, 0, 0).add(scaledDirection);
      const end = new THREE.Vector3()
        .copy(from.meshRef.current.position)
        .negate()
        .add(to.meshRef.current.position)
        .sub(scaledDirection);
      setPoints([start, end]);

      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      setMidpoint(mid);
    }
  });

  return(
    <>
      <Line needsUpdate={true} points={points} color="blue"  />
      
      <Text
        position={midpoint}
        fontSize={0.4}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Label
      </Text>
    </>
  );
};

export default Edge;
