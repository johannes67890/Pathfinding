import vertexIcon from "../assets/plus.svg";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Button, ListGroup, ListGroupItem } from "flowbite-react";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import useVertices from "../context/useVertices";
import useEdge from "../context/useEdge";
import ResetEdge from "./ResetEdge";
import { Vertex } from "@models/graphTypes";



const ContextMenu: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  const { pointer, camera } = useThree();
  const {vertices, setVertices} = useVertices();
  const {edge, setEdge} = useEdge();
  const mousePos = new THREE.Vector3(pointer.x, pointer.y, 0).unproject(camera);

  const addVertex = () => {
    setVertices((prev) => {
      return [
        ...prev,
        {
          id: prev.length,
          position: mousePos,
          outdegree: [],
          indegree: [],
          text: `${prev.length}`,
          meshRef: React.createRef(),
        },
      ];
    });
  };


  const addEdge = () => {
    const v = getIntersectedVertex(mousePos);
    
    if (v == undefined) return;
    if (edge == undefined) {
      setEdge(v);
      // Change the color of the vertex to indicate that it is the start of the edge
      v.meshRef.current!.material = new THREE.MeshBasicMaterial({ color: 0x50c3ff });

    }else if (v.id == edge.id) {
      edge.meshRef.current!.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      setEdge(undefined);
    } else {
      if (v.id == edge.id) return;
      setVertices((prev) => {
        const newVertices: Vertex[] = [...prev];

        // Check and add vertex to outdegree if not already present
        if (!newVertices[edge.id].outdegree.some(vertex => vertex.id === v.id)) {
          newVertices[edge.id].outdegree.push(v);
        }

        // Check and add vertex to indegree if not already present
        if (!newVertices[v.id].indegree.some(vertex => vertex.id === edge.id)) {
          newVertices[v.id].indegree.push(edge);
        }
        return newVertices;
      });
      edge.meshRef.current!.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      setEdge(undefined);
      

    }
  };


  const removeVertex = () => {
    const intersectedVertex = getIntersectedVertex(mousePos);

    if (intersectedVertex == undefined) return;
    else {
      setVertices((prev) => {
        const newVertices: Vertex[] = [...prev];
        // Set the new id for each vertex
        newVertices.splice(intersectedVertex.id, 1);
        for (let i = 0; i < newVertices.length; i++) {
          newVertices[i].id = i;
        }
        // Remove the connected edges from the other vertices
        newVertices.forEach((v) => {
          v.outdegree = v.outdegree.filter((out) => out.id !== intersectedVertex.id);
          v.indegree = v.indegree.filter((indegree) => indegree.id !== intersectedVertex.id);
        });
        return newVertices;
      });
    }
  };

  /**
   * Get the vertex that intersects with a vector
   * @param vector The vector to check for intersection
   * @returns The vertex that intersects with the vector
   */
  function getIntersectedVertex(vector: THREE.Vector3): Vertex | undefined {
    const currVector = new THREE.Box3().setFromCenterAndSize(vector, new THREE.Vector3(1, 1, 1));

    for (let i = 0; i < vertices.length; i++) {
      const v = new THREE.Box3().setFromObject(vertices[i].meshRef.current!);
      if (v.intersectsBox(currVector)) {
        return vertices[i];
      }
    }
    return undefined;
  }


  return (
    <>
    <mesh position={mousePos.addScaledVector(new THREE.Vector3(1, -1), 0.25)}>
        <Html style={hidden ? { display: "none" } : { display: "block" }}>
          <div>
            <ListGroup className="w-24 px-1">
              <ListGroupItem onClick={addVertex}>Add Vertex</ListGroupItem >
              <ListGroupItem
                onClick={addEdge}>
                {`${edge == undefined ? "Start edge" : "End edge"}`}
              </ListGroupItem >
              <ListGroupItem onClick={removeVertex}>Remove</ListGroupItem >
            </ListGroup>
          </div>
        </Html>
    </mesh>
    </>
  );
};

export default ContextMenu;
