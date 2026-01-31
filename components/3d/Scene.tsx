'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Preload } from '@react-three/drei';
import { Suspense } from 'react';
import RobotCompanion from './RobotCompanion';
import SkillsGalaxy from './SkillsGalaxy';
import * as THREE from 'three';

interface SceneProps {
  section: 'hero' | 'skills' | 'lab';
}

function SceneLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#8B5CF6" wireframe />
    </mesh>
  );
}

export default function Scene({ section }: SceneProps) {
  return (
    <div className="w-full h-full relative bg-transparent">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        camera={{ position: [0, 1, 6], fov: 45 }}
      >
        <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={45} />
        
        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          castShadow
          color="#ffffff"
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4F46E5" />
        <pointLight position={[10, 0, -10]} intensity={0.6} color="#EC4899" />

        <Environment preset="city" />
        
        {/* UPDATED: Lowered shadow position to match the new robot height */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4}
        />

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