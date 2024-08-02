import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { Vertex } from "@models/graphTypes";
import Edge from "./Edge";
import ContextMenu from "./controls/ContextMenu";
import useVertices from "./context/useVertices";
import Node from "./Node";

const VerticesContent = () => {
  const { vertices } = useVertices();

  return (
    <>
      {vertices.map((v, index) => (
        <Node
          key={v.id}
          position={v.position}
          meshRef={v.meshRef}
          text={`${index}`}
        >
          {v.outdegree.map((out: Vertex) => (
            <Edge key={out.id} from={v} to={out} weight={1} directed />
          ))}
        </Node>
      ))}
    </>
  );
};

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
export default Renderer;
