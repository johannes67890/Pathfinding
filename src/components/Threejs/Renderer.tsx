import React, { MutableRefObject, Ref, createContext, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

import Bubble from './Vertex';

export const verticesContext = createContext<{ 
  vertices: JSX.Element[]; 
  setVertices: React.Dispatch<React.SetStateAction<JSX.Element[]>> 
}>
({ vertices: [], setVertices: () => {} })

const Renderer = () => {
  const [vertices, setVertices] = useState<JSX.Element[]>([]);

  const verticesContextValue = useMemo(() => ({ vertices, setVertices }), [vertices]);

  const addVertex = () => {
    const newVertex = <Bubble  key={vertices.length} position={new THREE.Vector2(0, 0)} text={`${vertices.length + 1}`} />;
    setVertices((prev) => [...prev, newVertex]);
  }

  return (
    <>
    <button className=" bg-gray-400" onClick={addVertex}>Add Vertex</button>   
    <Canvas style={{height: "60vh", background: "grey"}}>
      <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={30} />
      <verticesContext.Provider value={verticesContextValue}>
        {vertices}
      </verticesContext.Provider>
    </Canvas>
    </>
  );
}


export default Renderer;
