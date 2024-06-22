import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useGLTF, AccumulativeShadows, RandomizedLight, Edges, OrbitControls, Outlines, Environment } from "@react-three/drei"

import Bubble from './Bubble';

function App() {
  return (
    <Canvas style={{height: "60vh"}}>
      <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={50} />
      <Bubble position={new THREE.Vector3(-2, 0, 0)} text="Bubble 1" />
      <Bubble position={new THREE.Vector3(2, 0, 0)} text="Bubble 2" />
    </Canvas>
  );
}

export default App;
