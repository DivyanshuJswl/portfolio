// components/3d/Scene.tsx
"use client";

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
import SkillsGalaxy from "./SkillsGalaxy";

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
  // OPTIMIZATION: Detect low power mode or mobile to reduce quality
  const [dpr, setDpr] = useState([1, 2]);

  useEffect(() => {
    // Cap pixel ratio at 1.5 for better performance on high-res screens
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    setDpr([1, pixelRatio]);
  }, []);

  return (
    <div className="w-full h-full relative bg-transparent">
      <Canvas
        shadows={false} // OPTIMIZATION: Disable dynamic cast shadows (expensive)
        dpr={dpr as [min: number, max: number]}
        gl={{
          alpha: true,
          antialias: true, // Keep generic antialiasing
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: true,
        }}
        camera={{ position: [0, 1, 6], fov: 45 }}
      >
        <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={45} />

        {/* OPTIMIZATION: Use fewer lights, rely on Environment */}
        <ambientLight intensity={0.8} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          // castShadow // OPTIMIZATION: Disabled casting shadows
          color="#ffffff"
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#4F46E5"
        />

        {/* Lightweight Environment lighting */}
        <Environment preset="city" />

        {/* OPTIMIZATION: Cheaper Ground shadow */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={1}
          resolution={256} // Lower resolution is faster
        />

        <Suspense fallback={<SceneLoader />}>
          {section === "hero" && <RobotCompanion />}
          {section === "skills" && <SkillsGalaxy />}
          <Preload all />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
