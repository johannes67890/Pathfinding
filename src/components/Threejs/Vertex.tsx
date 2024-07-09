// src/App.tsx

import React, { useContext, useState } from "react";
import { ThreeEvent, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { verticesContext } from "./Renderer";

const Vertex: React.FC<{
  text: String;
  meshRef: React.RefObject<THREE.Mesh>;
  children?: React.ReactNode;
}> = ({ text, meshRef, children }) => {
  const { vertices } = useContext(verticesContext);

  const { camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);

  // Calculate the viewport boundaries in world coordinates
  const calculateViewportBounds = () => {
    const leftBottom = new THREE.Vector3(-1, -1, 0).unproject(camera);
    const rightTop = new THREE.Vector3(1, 1, 0).unproject(camera);

    return {
      minX: leftBottom.x + 1,
      maxX: rightTop.x -1,
      minY: leftBottom.y + 1,
      maxY: rightTop.y - 1,
    };
  };

  const onMouseDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    if (event.point.distanceTo(meshRef.current!.position) < 1) {
      setIsDragging(true);
    }
  };

  const onMouseMove = (event: ThreeEvent<PointerEvent>) => {
    if (isDragging) {
      const bounds = calculateViewportBounds();
      const mousePos = new THREE.Vector3(event.point.x, event.point.y, event.point.z);


      // Clamp the newPosition to be within the viewport bounds
      meshRef.current!.position.x = THREE.MathUtils.clamp(mousePos.x, bounds.minX, bounds.maxX);
      meshRef.current!.position.y = THREE.MathUtils.clamp(mousePos.y, bounds.minY, bounds.maxY);
    }
  };

  const onMouseUp = () => {
    const currVertex = new THREE.Box3().setFromObject(meshRef.current!);

    vertices.forEach((vertex) => {
      if (vertex.meshRef.current && vertex.meshRef.current !== meshRef.current) {
        const v = new THREE.Box3().setFromObject(vertex.meshRef.current!);
        if (v.intersectsBox(currVertex)) {
          console.log("Intersected");
        }
      }
    });


    setIsDragging(false);
  };

  return (
    <>
      <mesh
        ref={meshRef}
        onPointerDown={onMouseDown}
        onPointerMove={onMouseMove}
        onPointerUp={onMouseUp}
      >
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial />
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.5}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
        {children}
      </mesh>
    </>
  );
};

export default Vertex;
