import React from "react";
import { Button } from "flowbite-react";
import Pathfinding from "@algorithms/Pathfinding";
import Digraph from "@structures/Digraph";
import { Vertex } from "@models/graphTypes";
import DirectedEdge from "@structures/DirectedEdge";
import * as THREE from "three";
import Watermark from "./Watermark";
import Return from "./Return";
import CellColorGuide from "../tools/grid/controls/CellColorGuide";
import GridSettings from "../tools/grid/controls/GridSettings";
import AnimationSpeed from "../tools/grid/controls/AnimationSpeed";
import AlgorithmSelector from "../tools/grid/controls/AlgorithmSelector";
import useVertices from "../tools/graph/context/useVertices";
import useStartStop from "../tools/graph/context/useStartStop";

export const HeaderGrid = () => {
  <div className="rounded-t-md grid grid-cols-[min-content,1fr,1fr,1fr,1fr] gap-5 grid-flow-col my-4">
    <Return />
    <Watermark />
    <CellColorGuide />
    <GridSettings />
    <div className="flex flex-col gap-2">
      <AnimationSpeed />
      <AlgorithmSelector />
    </div>
  </div>;
};

export const HeaderGraph = () => {
  const { vertices } = useVertices();
  const { start, stop } = useStartStop();

  function animate() {
    const di = new Digraph<Vertex>(vertices);

    vertices.map((v) => {
      v.outdegree.map((out: Vertex) => {
        const edge = new DirectedEdge(v.id, out.id, 1);
        di.addEdge(edge);
        return out;
      });
      return v;
    });
    if (start === undefined || stop === undefined) return;

    const c = new Pathfinding(di, start, stop);

    c.pathTo(stop.id).map((v) => {
      vertices[v.from()].outdegree.map((out: Vertex) => {
        if (out.id === v.to())
          vertices[out.id].meshRef.current!.material =
            new THREE.MeshBasicMaterial({ color: 0x50c3ff });
        return out;
      });
      return v;
    });

    return c.pathTo(stop.id);
  }

  return (
    <Button
      className="text-black w-16 h-10 border border-black"
      onClick={animate}
    >
      Dijkstra
    </Button>
  );
};
