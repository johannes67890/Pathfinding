import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Line, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vertex } from "@models/graphTypes";

const Edge: React.FC<{
  from: Vertex;
  to: Vertex;
  weight?: number;
  directed?: boolean;
}> = ({ from, to, weight, directed }) => {
  const [points, setPoints] = useState([
    new THREE.Vector3(),
    new THREE.Vector3(),
  ]);
  const [midpoint, setMidpoint] = useState(new THREE.Vector3());
  const arrowRef = useRef<THREE.ArrowHelper | null>(null);

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

      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);
      setMidpoint(mid);

      // Update the arrow helper
      if (arrowRef.current) {
        arrowRef.current.setDirection(direction);
        arrowRef.current.setLength(start.distanceTo(end), 0.5, 0.25);
        arrowRef.current.position.copy(start);
      }
    }
  });

  return (
    <>
      {directed ? (
        <arrowHelper
          renderOrder={1}
          ref={arrowRef}
          args={[new THREE.Vector3(), new THREE.Vector3(), 1, 0xff0000]}
        />
      ) : (
        <Line renderOrder={1} needsUpdate points={points} color="blue" />
      )}

      <mesh renderOrder={2} position={midpoint}>
        <meshBasicMaterial />
        <circleGeometry args={[0.4, 32]} />
      </mesh>

      <Text
        renderOrder={3}
        position={midpoint}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {weight || ""}
      </Text>
    </>
  );
};

export default Edge;
