// src/App.tsx

import React, { useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { OrthographicCamera, Text } from '@react-three/drei';
import * as THREE from 'three';
import Header from '../Header';

interface BubbleProps {
    position: THREE.Vector3;
    text: string;
  }


const Bubble: React.FC<BubbleProps> = ({ position, text }) => {
    const meshRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(new THREE.Vector2());
  const [originalPosition, setOriginalPosition] = useState(new THREE.Vector2());

  useFrame(() => {
    if (meshRef.current && !isDragging) {
      meshRef.current.position.x = originalPosition.x + (Math.random() - 0.5) * 0.01;
      meshRef.current.position.y = originalPosition.y + (Math.random() - 0.5) * 0.01;
    }
  });

  const onMouseDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const mousePos = new THREE.Vector2(event.point.x, event.point.y);
    const bubblePos = new THREE.Vector2(meshRef.current!.position.x, meshRef.current!.position.y);
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
    setOriginalPosition(new THREE.Vector2(meshRef.current!.position.x, meshRef.current!.position.y));
  };

  return (
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
        1
      </Text>
    </mesh>
  );
}


export default Bubble;
