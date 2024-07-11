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

  const addVertex = () => {
    setVertices((prev) => {
      return [
        ...prev,
        {
          id: prev.length,
          outdegree: [],
          indegree: [],
          text: `${prev.length + 1}`,
          meshRef: React.createRef(),
        },
      ];
    });
  };

  const addEdge = (from: vertex, to: vertex) => {
    if(from.outdegree.includes(to)) return;
    setVertices((prev) => {
      const newVertices: vertex[] = [...prev];
      newVertices[from.id].outdegree.push(to);
      newVertices[to.id].indegree.push(from);
      return newVertices;
    });
  }

  const [showMenu, setshowMenu] = useState<boolean>(false)

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    
    event.preventDefault();
    
    setshowMenu(true);
  };
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // only show menu on right click
    if (event.button !== 2 && !showMenu) return;
    setshowMenu(!showMenu);
  };

  return (
    <>
    
      <button className=" bg-gray-400 m-4" onClick={addVertex}>
        Add Vertex
      </button>
      <button className=" bg-gray-400" onClick={() => addEdge(vertices[0], vertices[1])}>
        Add Edge
      </button>
      <Canvas onContextMenu={handleContextMenu} onClick={handleClick} style={{ height: "70vh", border: "solid", borderWidth: "1px" }}>
      {showMenu && <ContextMenu />}
        <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={30} />
        <verticesContext.Provider value={verticesContextValue}>
          {vertices.map((v, index) => {
            return (
              <Vertex
                key={index}
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
        </verticesContext.Provider>
      </Canvas>
    </>
  );
};

export default Renderer;
