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
import { Suspense, useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion"; // Use Framer Motion's lightweight observer
import RobotCompanion from "./RobotCompanion";
import SkillsGalaxy from "./SkillsGalaxy";
import * as THREE from "three";

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
  const [dpr, setDpr] = useState([1, 2]);

  // OPTIMIZATION: Ref to track visibility
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    margin: "0px 0px 500px 0px", // Keep rendering slightly off-screen for smooth scroll back
    once: false,
  });

  useEffect(() => {
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    setDpr([1, pixelRatio]);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-transparent">
      {/* OPTIMIZATION: Only render Canvas if we are near the viewport */}
      <Canvas
        // OPTIMIZATION: 'frameloop' switches to 'never' when out of view, stopping the CPU usage
        frameloop={isInView ? "always" : "never"}
        shadows={false}
        dpr={dpr as [min: number, max: number]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: true,
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
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#4F46E5"
        />

        <Environment preset="city" />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={1}
          resolution={256}
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
