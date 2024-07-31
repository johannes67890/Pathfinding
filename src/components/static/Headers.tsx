import Watermark from "./Watermark";

import Return from "./Return";
import CellColorGuide from "../tools/grid/controls/CellColorGuide";
import GridSettings from "../tools/grid/controls/GridSettings";
import AnimationSpeed from "../tools/grid/controls/AnimationSpeed";
import AlgorithmSelector from "../tools/grid/controls/AlgorithmSelector";
import { Button } from "flowbite-react";
import Pathfinding from "@algorithms/Pathfinding";
import useVertices from "../tools/graph/context/useVertices";
import GraphContexts from "../tools/graph/context/GraphContexts";
import Animator from "../tools/graph/Animator";
import Digraph from "@structures/Digraph";
import { Vertex } from "@models/graphTypes";
import DirectedEdge from "@structures/DirectedEdge";

export const HeaderGrid = () => {
  return (
    <div className="rounded-t-md grid grid-cols-[min-content,1fr,1fr,1fr,1fr] gap-5 grid-flow-col my-4">
      <Return />
      <Watermark />
      <CellColorGuide />
      <GridSettings />
      <div className="flex flex-col gap-2">
        <AnimationSpeed />
        <AlgorithmSelector />
      </div>
    </div>
  );
};



export const HeaderGraph = () => {
  const { vertices } = useVertices();
  
  function animate(vertices: Vertex[], start: Vertex, finish: Vertex) {
      const di = new Digraph<Vertex>(vertices);

      vertices.map((v, index) => {
          v.outdegree.map((out: Vertex, index: number) => {
            const edge = new DirectedEdge(v.id, out.id, 1);
              di.addEdge(edge);
          });
      });

      const p = new Pathfinding(di, start, finish);
      console.log(p.pathTo(finish.id));
      return p.pathTo(finish.id);
  }

  return (
    <>
        <Button className="text-black w-16 h-10 border border-black" onClick={() => animate(vertices, vertices[0], vertices[vertices.length -1])}>Dijkstra</Button>
       
    </>

  );
};

