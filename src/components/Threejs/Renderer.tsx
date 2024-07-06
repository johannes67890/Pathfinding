import React, {
  MutableRefObject,
  Ref,
  createContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

import Vertex from "./Vertex";
import Edge from "./Edge";

// Create a context to store the vertices
export const verticesContext = createContext<{
  vertices: React.RefObject<THREE.Mesh>[];
  setVertices: React.Dispatch<
    React.SetStateAction<React.RefObject<THREE.Mesh>[]>
  >;
}>({ vertices: [], setVertices: () => {} });

const Renderer = () => {
  const [vertices, setVertices] = useState<React.RefObject<THREE.Mesh>[]>([React.createRef<THREE.Mesh>()]);

  const verticesContextValue = useMemo(
    () => ({ vertices, setVertices }),
    [vertices]
  );

  const addVertex = () => {
    setVertices((prev) => {
      const newRef = React.createRef<THREE.Mesh>();
      return [...prev, newRef];
    });
  };

  return (
    <>
      <button className=" bg-gray-400" onClick={addVertex}>
        Add Vertex
      </button>
      <Canvas style={{ height: "60vh", background: "grey" }}>
        <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={30} />
        <verticesContext.Provider value={verticesContextValue}>
          {vertices.map((ref, index) => {
            return (
              <Vertex
                key={index}
                meshRef={ref}
                position={new THREE.Vector2(0, 0)}
                text={`${index + 1}`}
              />
            );
          })}
        </verticesContext.Provider>
      </Canvas>
    </>
  );
};

export default Renderer;
