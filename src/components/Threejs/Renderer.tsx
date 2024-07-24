import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import Vertex from "./Vertex";
import Edge from "./Edge";
import ContextMenu from "./controls/ContextMenu";
import GraphContexts from "./context/GraphContexts";
import useVertices, { VerticesProvider } from "./context/useVertices";
import useEdge from "./context/useEdge";

const Renderer = () => {
  const { vertices } = useVertices();
  const { edge } = useEdge();
  const [menuHidden, setMenuHidden] = useState<boolean>(true);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMenuHidden(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 2 && !menuHidden) {
      setMenuHidden(true);
    }
  };

  useEffect(() => {
    console.log("Renderer mounted", vertices);
  });
  return (
    <>
      <Canvas
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        style={{
          height: "70vh",
          border: "solid",
          borderWidth: "1px",
          borderRadius: "5px",
        }}
      >
        <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={30} />
          <VerticesProvider>
            {vertices.map((v, index) => (
              console.log(vertices),
              <Vertex key={v.id} position={v.position} meshRef={v.meshRef} text={`${index}`}>
                {v.outdegree.map((out, index) => (
                  <Edge key={index} from={v} to={out} weight={1} />
                ))}
              </Vertex>
            ))}
            <ContextMenu hidden={menuHidden} />
          </VerticesProvider>
      </Canvas>
    </>
  );
};

export default Renderer;