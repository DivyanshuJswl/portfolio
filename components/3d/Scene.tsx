// components/3d/Scene.tsx - Optimized version
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Preload } from '@react-three/drei';
import { Suspense } from 'react';
import RobotCompanion from './RobotCompanion';
import SkillsGalaxy from './SkillsGalaxy';
import { ACESFilmicToneMapping } from 'three';

interface SceneProps {
  section: 'hero' | 'skills' | 'lab';
}

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Scene({ section }: SceneProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          powerPreference: 'high-performance',
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        
        {/* Optimized Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4F46E5" />

        {/* Environment with performance preset */}
        <Environment preset="city" />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.5}
          scale={20}
          blur={2}
          far={4}
          resolution={256}
        />

        {/* Conditional 3D content with Suspense */}
        <Suspense fallback={null}>
          {section === 'hero' && <RobotCompanion />}
          {section === 'skills' && <SkillsGalaxy />}
          <Preload all />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
