import vertexIcon from "../assets/plus.svg";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { ListGroup, ListGroupItem } from "flowbite-react";


const ContextMenu = () => {
  const { pointer, camera } = useThree();

  return (
    <mesh position={new THREE.Vector3(pointer.x, pointer.y, 0).unproject(camera).addScaledVector(new THREE.Vector3(1,-1), 0.25)}>
      <Html>
        <div className="w-32">
          <ListGroup>
            <ListGroupItem>Add Vertex</ListGroupItem >
            <ListGroupItem>Add Edge</ListGroupItem >
            <ListGroupItem>Messages</ListGroupItem >
            <ListGroupItem className="bg-red-200">Remove</ListGroupItem >
          </ListGroup>
        </div>
      </Html>
    </mesh>
  );
};

export default ContextMenu;
