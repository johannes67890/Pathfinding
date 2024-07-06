// src/App.tsx

import React, { Component, useContext, useRef, useState } from "react";
import { Canvas, ThreeEvent, Vector2, useFrame } from "@react-three/fiber";
import { OrthographicCamera, Text } from "@react-three/drei";
import * as THREE from "three";
import Edge from "./Edge";
import { verticesContext } from "./Renderer";

const Vertex: React.FC<{
  position: THREE.Vector2;
  text: String;
  meshRef: React.RefObject<THREE.Mesh>;
}> = ({ position, text, meshRef }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(new THREE.Vector2());
  const [originalPosition, setOriginalPosition] = useState(position);

  const onMouseDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const mousePos = new THREE.Vector2(event.point.x, event.point.y);
    const bubblePos = new THREE.Vector2(
      meshRef.current!.position.x,
      meshRef.current!.position.y
    );
    if (mousePos.distanceTo(bubblePos) < 1) {
      setIsDragging(true);
      setOffset(bubblePos.sub(mousePos));
    }
  };

  const onMouseMove = (event: ThreeEvent<PointerEvent>) => {
    if (isDragging) {
      const mousePos = new THREE.Vector2(event.point.x, event.point.y);
      meshRef.current!.position.x = mousePos.x + offset.x;
      meshRef.current!.position.y = mousePos.y + offset.y;
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    setOriginalPosition(
      new THREE.Vector2(
        meshRef.current!.position.x,
        meshRef.current!.position.y
      )
    );
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
    </mesh>
    <Edge line={{ points: [originalPosition] }} />
  </>
);
};

export default Vertex;
