import React, {
  createContext,
  useMemo,
  useState,
} from "react";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { Html, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import Vertex from "./Vertex";
import { vertex } from "../Types";
import Edge from "./Edge";
import ContextMenu from "./controls/ContextMenu";

// Create a context to store the vertices
export const verticesContext = createContext<{
  vertices: vertex[];
  setVertices: React.Dispatch<
    React.SetStateAction<vertex[]>
  >;
}>({ vertices: [], setVertices: () => {} });

const Renderer = () => {
  const [vertices, setVertices] = useState<vertex[]>([]);

  const verticesContextValue = useMemo(
    () => ({ vertices, setVertices }),
    [vertices]
  );

  const [menuHidden, setMenuHidden] = useState<boolean>(true);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMenuHidden(false);
  };
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // only show menu on right click
    if(event.button != 2 && !menuHidden){
      setMenuHidden(true);
    }
  };

  return (
    <>
      <Canvas onContextMenu={handleContextMenu} onClick={handleClick} style={{ height: "70vh", border: "solid", borderWidth: "1px", borderRadius: "5px" }}>
        <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={30} />
        <verticesContext.Provider value={verticesContextValue}>
          {vertices.map((v, index) => {
            return (
              <Vertex
              key={index}
              position={v.position}
              meshRef={v.meshRef}
              text={`${index}`}
              >
                {v.outdegree.map((out, index) => {
                  return (
                    <Edge
                    key={index}
                    from={v}
                    to={out}
                    />
                  );
                })
              }
              </Vertex>
            );
          })}
          <ContextMenu hidden={menuHidden}/>
        </verticesContext.Provider>
      </Canvas>
    </>
  );
};

export default Renderer;
