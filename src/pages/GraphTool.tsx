import React from "react";
import { HeaderGraph } from "src/components/static/Headers";
import Renderer from "src/components/tools/graph/Renderer";

const GraphTool = () => {
  return (
    <>
      <HeaderGraph />
      <Renderer />
    </>
  );
};

export default GraphTool;
