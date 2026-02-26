import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Preload,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import RobotCompanion from "./RobotCompanion";

interface SceneProps {
  section: "hero" | "skills" | "lab";
}

function SceneLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#8B5CF6" wireframe />
    </mesh>
  );
}

export default function Scene({ section }: SceneProps) {
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);

  useEffect(() => {
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    setDpr([1, pixelRatio]);
  }, []);

  return (
    <div className="w-full h-full relative bg-transparent">
      <Canvas
        frameloop="always"
        shadows={false}
        dpr={dpr}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 1, 6], fov: 45 }}
      >
        <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={45} />

        <ambientLight intensity={0.8} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#ffffff"
        />
        
        {/* Colorful rim lights for depth */}
        <pointLight position={[-10, 0, -10]} intensity={2} color="#4F46E5" />
        <pointLight position={[10, 0, -10]} intensity={2} color="#06B6D4" />

        <Environment preset="city" />

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={1}
        />

        <Suspense fallback={<SceneLoader />}>
          {section === "hero" && <RobotCompanion />}
          <Preload all />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}