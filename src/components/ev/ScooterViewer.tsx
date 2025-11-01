import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function Scooter() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Simplified scooter representation */}
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.3, 0.5]} />
        <meshStandardMaterial color="#00D9FF" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Handlebar */}
      <mesh position={[0.6, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8]} />
        <meshStandardMaterial color="#B8FF3C" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Front Wheel */}
      <mesh position={[0.7, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color="#1E0E3E" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Rear Wheel */}
      <mesh position={[-0.7, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color="#1E0E3E" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Seat */}
      <mesh position={[-0.2, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.4]} />
        <meshStandardMaterial color="#FF6B35" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

export default function ScooterViewer() {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden glass-effect">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 2, 3]} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Scooter />
      </Canvas>
    </div>
  );
}
