import React, { useEffect, useLayoutEffect } from "react";
import * as THREE from "three";
import { verticesContext } from "./Renderer";
import { Line, LineProps } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { vertex } from "../statics/Types";

const Edge: React.FC<{
  from: vertex;
  to: vertex;
  meshRef: React.RefObject<THREE.Mesh>;
}> = ({from, to, meshRef }) => {
  // useLayoutEffect(() => {
  //   meshRef.current!.geometry.setFromPoints([
  //     from.meshRef.current!.position,
  //     to.meshRef.current!.position,
  //   ]);
  // }, [from, to]);

  const s = new THREE.Vector3(0, 0, 0);
  const v = from.meshRef.current!.position.negate().add(to.meshRef.current!.position);

  return (
          <Line
            points={[
              s,
              v,
            ]}
            color="blue"
          />
  );
};

export default Edge;
