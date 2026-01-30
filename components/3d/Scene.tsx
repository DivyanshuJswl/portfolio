// components/3d/Scene.tsx
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
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#8B5CF6" />
    </mesh>
  );
}

export default function Scene({ section }: SceneProps) {
  return (
    <div className="absolute inset-0 z-0" style={{ background: 'transparent' }}>
      <Canvas 
        shadows 
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          color="#ffffff"
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4F46E5" />
        <pointLight position={[10, 0, -10]} intensity={0.6} color="#EC4899" />
        <pointLight position={[-10, 5, 5]} intensity={0.6} color="#3B82F6" />

        {/* Environment */}
        <Environment preset="city" />
        
        {/* Ground shadow */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4}
          resolution={512}
        />

        {/* Conditional 3D content */}
        <Suspense fallback={<SceneLoader />}>
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
