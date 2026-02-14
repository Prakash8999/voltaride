import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import heroScooter from "@/assets/hero-scooter.jpg";

const ScooterPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(heroScooter.src);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  // Auto-rotate when not dragging
  useFrame(() => {
    if (meshRef.current && !isDragging) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  const handlePointerDown = (e: any) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging || !meshRef.current) return;

    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;

    meshRef.current.rotation.y += deltaX * 0.01;
    meshRef.current.rotation.x += deltaY * 0.01;

    // Clamp X rotation to prevent flipping
    meshRef.current.rotation.x = Math.max(
      -Math.PI / 4,
      Math.min(Math.PI / 4, meshRef.current.rotation.x)
    );

    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <mesh
      ref={meshRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      rotation={[rotation.x, rotation.y, 0]}
    >
      <planeGeometry args={[4, 3]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

const ScooterViewer3D = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <ScooterPlane />
      </Canvas>
    </div>
  );
};

export default ScooterViewer3D;
