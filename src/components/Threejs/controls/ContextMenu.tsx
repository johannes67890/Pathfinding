import vertexIcon from "../assets/plus.svg";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { ListGroup, ListGroupItem } from "flowbite-react";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { verticesContext } from "../Renderer";
import { vertex } from "../../Types";



const ContextMenu: React.FC<{hidden: boolean}> = ({hidden}) => {
  const { pointer, camera } = useThree();
  const { vertices, setVertices } = useContext(verticesContext);
  const [edge, setEdge] = useState<vertex | undefined>();
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
    console.log(v);
    if (v == undefined) return;
    if (edge == undefined) {
      setEdge(v);
    } else {
      if (v.id == edge.id) return;
      setVertices((prev) => {
        const newVertices: vertex[] = [...prev];
        
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
      setEdge(undefined);
    }
  };


  const removeVertex = () => {
    const intersectedVertex = getIntersectedVertex(mousePos);

    if(intersectedVertex == undefined) return;
    else {
      setVertices((prev) => {
        const newVertices: vertex[] = [...prev];
        newVertices.splice(intersectedVertex.id, 1);
        for (let i = 0; i < newVertices.length; i++) {
          newVertices[i].id = i;
        }
        return newVertices;
      });
    }
  };

  /**
   * Get the vertex that intersects with a vector
   * @param vector The vector to check for intersection
   * @returns The vertex that intersects with the vector
   */
  function getIntersectedVertex(vector: THREE.Vector3): vertex | undefined {
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
    <mesh position={mousePos.addScaledVector(new THREE.Vector3(1,-1), 0.25)}>
      <Html style={hidden ? {display: "none"} : {display: "block{}"}}>
        <div>
          <ListGroup className="w-24 px-1">
            <ListGroupItem onClick={addVertex}>Add Vertex</ListGroupItem >
            <ListGroupItem 
            onClick={addEdge}>
              {`${edge == undefined ? "Start edge" : "End edge"}`}
              <div className="w-4 h-4 bg-red-200">
                  del
              </div>
            </ListGroupItem >
            <ListGroupItem onClick={removeVertex}>Remove</ListGroupItem >
          </ListGroup>
        </div>
      </Html>
    </mesh>
  );
};

export default ContextMenu;
