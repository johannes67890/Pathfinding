
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";




const ContextMenu = () => {
  const { pointer, camera } = useThree();

  return (
    <mesh position={new THREE.Vector3(pointer.x, pointer.y, 0).unproject(camera).addScaledVector(new THREE.Vector3(1,-1), 0.25)}>
      <Html>
        <div 
          className="absolute bg-white border border-gray-300 shadow-lg z-10"
          style={{ pointerEvents: 'auto' }}
          onContextMenu={(e) => e.preventDefault()}
        >
          TEST
        </div>
    </Html>
    </mesh>
  );
};

export default ContextMenu;
