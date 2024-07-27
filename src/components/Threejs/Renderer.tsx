import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import Vertex from "./Vertex";
import Edge from "./Edge";
import ContextMenu from "./controls/ContextMenu";
import useVertices, { VerticesProvider } from "./context/useVertices";
import useEdge, { EdgeProvider } from "./context/useEdge";
import ResetEdge from "./controls/ResetEdge";
import GraphContexts from "./context/GraphContexts";

const Renderer = () => {
  const [menuHidden, setMenuHidden] = useState<boolean>(true);
  const {edge} = useEdge();
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
        <GraphContexts>
          <VerticesContent />
          <ResetEdge />
          <ContextMenu hidden={menuHidden} />
        </GraphContexts>
      </Canvas>
  );
};

const VerticesContent = () => {
  const { vertices } = useVertices();

  return (
    <>
      {vertices.map((v, index) => (
        <Vertex key={v.id} position={v.position} meshRef={v.meshRef} text={`${index}`}>
          {v.outdegree.map((out, index) => (
            <Edge key={index} from={v} to={out} weight={1} directed={true} />
          ))}
        </Vertex>
      ))}
    </>
  );
};

export default Renderer;