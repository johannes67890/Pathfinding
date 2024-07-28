import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "flowbite-react";
import useEdge from "../context/useEdge";
import { useEffect } from "react";

const ResetEdge = () => {
  const { edge, setEdge } = useEdge();

  return (
    <mesh position={new THREE.Vector3(0,10.5)}>
      <Html style={!edge ? { display: "none" } : { display: "block" }}>
        <Button onClick={() => setEdge(undefined)} className="absolute bg-red-300 text-black w-24 h-10 -translate-x-1/2">
          <h1>Reset</h1>
        </Button>
      </Html>
    </mesh>
  )
}

export default ResetEdge