import React from "react";
import { HeaderGraph } from "src/components/static/Headers";
import Return from "src/components/static/Return";
import Watermark from "src/components/static/Watermark";
import GraphContexts from "src/components/tools/graph/context/GraphContexts";
import { VerticesProvider } from "src/components/tools/graph/context/useVertices";
import Renderer from "src/components/tools/graph/Renderer";

function GraphTool() {
  return (
    <>
      <div className="rounded-t-md grid grid-cols-[min-content,1fr,1fr,1fr,1fr] gap-4 my-4">
        <Return />
        <Watermark />
      </div>
      <GraphContexts>
        <HeaderGraph />
        <Renderer />
      </GraphContexts>
    </>
  );
}

export default GraphTool;
