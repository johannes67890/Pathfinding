// src/App.tsx

import React, { useContext, useEffect, useState } from "react";
import { ThreeEvent} from "@react-three/fiber";
import {  Text } from "@react-three/drei";
import * as THREE from "three";
import Edge from "./Edge";
import { verticesContext } from "./Renderer";


const Vertex: React.FC<{
  text: String;
  meshRef: React.RefObject<THREE.Mesh>;
  children?: React.ReactNode;
}> = ({ text, meshRef, children }) => {
  const [isDragging, setIsDragging] = useState(false);


  const onMouseDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    
    if (event.point.distanceTo(meshRef.current!.position) < 1) {
      setIsDragging(true);
    }
  };

  const onMouseMove = (event: ThreeEvent<PointerEvent>) => {
    if (isDragging) {
      const mousePos = new THREE.Vector2( event.point.x, event.point.y);
      meshRef.current!.position.x = mousePos.x;
      meshRef.current!.position.y = mousePos.y;
    }
  };

  const onMouseUp = () => {
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
