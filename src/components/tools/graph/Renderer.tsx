import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import Edge from "./Edge";
import ContextMenu from "./controls/ContextMenu";
import useVertices from "./context/useVertices";
import GraphContexts from "./context/GraphContexts";
import { Vertex } from "@models/graphTypes";
import Node from "./Node";

const Renderer = () => {
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

  return (
      <Canvas
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        style={{
          height: "75vh",
          border: "solid",
          borderWidth: "1px",
          borderRadius: "5px",
        }}
      >
        <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={30} />
          <VerticesContent />
          <ContextMenu hidden={menuHidden} />
      </Canvas>
  );
};

const VerticesContent = () => {
  const { vertices } = useVertices();

  return (
    <>
      {vertices.map((v, index) => (
        <Node key={v.id} position={v.position} meshRef={v.meshRef} text={`${index}`}>
          {v.outdegree.map((out: Vertex, index: number) => (
            <Edge key={index} from={v} to={out} weight={1} directed={true} />
          ))}
        </Node>
      ))}
    </>
  );
};

export default Renderer;