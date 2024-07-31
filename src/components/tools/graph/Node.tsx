// src/App.tsx

import React, { useContext, useEffect, useState } from "react";
import { ThreeEvent, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import useVertices from "./context/useVertices";
import { calculateViewportBounds } from "@utils/utils";

const Vertex: React.FC<{
  text: String;
  position: THREE.Vector3;
  meshRef: React.RefObject<THREE.Mesh>;
  children?: React.ReactNode;
}> = ({ text, position, meshRef, children }) => {
  const { camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  
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
    setIsDragging(false);
  };
  
  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        onPointerDown={onMouseDown}
        onPointerMove={onMouseMove}
        onPointerUp={onMouseUp}
      >
        <circleGeometry args={[1, 64]} />
        <Text
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
