// components/3d/RobotCompanion.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useIdleDetection } from '@/hooks/useIdleDetection';
import { useChatStore } from '@/lib/store';

export default function RobotCompanion() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF('/models/robot.glb');
  const { actions, names } = useAnimations(animations, group);
  
  const mousePosition = useMousePosition();
  const isIdle = useIdleDetection(5000); // 5 seconds
  const { isThinking } = useChatStore();
  
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  // Play initial wave animation
  useEffect(() => {
    if (actions['Wave']) {
      actions['Wave'].reset().play();
      actions['Wave'].clampWhenFinished = true;
      actions['Wave'].setLoop(THREE.LoopOnce, 1);
    }
  }, [actions]);

  // Handle idle state
  useEffect(() => {
    if (isIdle && actions['Sleep']) {
      actions['Sleep']?.fadeIn(0.5).play();
    } else if (!isIdle && actions['Sleep']?.isRunning()) {
      actions['Sleep']?.fadeOut(0.5).stop();
      actions['Idle']?.fadeIn(0.5).play();
    }
  }, [isIdle, actions]);

  // Handle thinking animation
  useEffect(() => {
    if (isThinking && actions['Thinking']) {
      actions['Thinking']?.reset().fadeIn(0.3).play();
      
      // Glowing eyes effect
      scene.traverse((child: any) => {
        if (child.isMesh && child.name === 'Eyes') {
          child.material.emissive = new THREE.Color(0x00ffff);
          child.material.emissiveIntensity = 2;
        }
      });
    } else {
      actions['Thinking']?.fadeOut(0.3).stop();
      
      scene.traverse((child: any) => {
        if (child.isMesh && child.name === 'Eyes') {
          child.material.emissiveIntensity = 0;
        }
      });
    }
  }, [isThinking, actions, scene]);

  // Smooth cursor following
  useFrame((state, delta) => {
    if (!group.current) return;

    // Calculate target rotation based on mouse position
    targetRotation.current.x = mousePosition.y * 0.3;
    targetRotation.current.y = mousePosition.x * 0.5;

    // Smooth interpolation
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * delta * 2;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * delta * 2;

    // Apply rotation to head bone (adjust based on your model)
    const head = group.current.getObjectByName('Head');
    if (head) {
      head.rotation.x = currentRotation.current.x;
      head.rotation.y = currentRotation.current.y;
    }

    // Gentle floating animation
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.5} />
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#00ffff" />
    </group>
  );
}
