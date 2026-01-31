"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIdleDetection } from "@/hooks/useIdleDetection";
import { useChatStore } from "@/lib/store";

export default function RobotCompanion() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/models/robot.glb");
  const { actions } = useAnimations(animations, group);

  const mousePosition = useMousePosition();
  const isIdle = useIdleDetection(5000);
  const { isThinking } = useChatStore();

  // Responsive Scale State
  const [scale, setScale] = useState(1.5);
  const [yOffset, setYOffset] = useState(-1);

  // Handle Resize for Responsive Scaling
  useEffect(() => {
    const handleResize = () => {
      // 'lg' breakpoint is 1024px. Below this, we are in the "Top Robot / Bottom Text" layout.
      const isMobileOrTablet = window.innerWidth < 1024;

      if (isMobileOrTablet) {
        // Mobile: Make robot bigger (2.3) and lower (-1.5) to fit the 45vh container nicely
        setScale(2.3);
        setYOffset(-1.5);
      } else {
        // Desktop: Standard scale (1.5) and position (-1) for side-by-side layout
        setScale(1.5);
        setYOffset(-1);
      }
    };

    // Initial check
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (actions["Wave"]) {
      actions["Wave"].reset().play();
      actions["Wave"].clampWhenFinished = true;
      actions["Wave"].setLoop(THREE.LoopOnce, 1);
    }
  }, [actions]);

  useEffect(() => {
    if (isIdle && actions["Sleep"]) {
      actions["Sleep"]?.fadeIn(0.5).play();
      actions["Idle"]?.fadeOut(0.5);
    } else if (!isIdle) {
      actions["Sleep"]?.fadeOut(0.5);
      if (actions["Idle"] && !actions["Idle"].isRunning()) {
        actions["Idle"]?.fadeIn(0.5).play();
      }
    }
  }, [isIdle, actions]);

  useEffect(() => {
    if (isThinking && actions["Thinking"]) {
      actions["Thinking"]?.reset().fadeIn(0.3).play();
      scene.traverse((child: any) => {
        if (child.isMesh && child.name === "Eyes") {
          child.material.emissive = new THREE.Color(0x00ffff);
          child.material.emissiveIntensity = 2;
        }
      });
    } else {
      actions["Thinking"]?.fadeOut(0.3).stop();
      scene.traverse((child: any) => {
        if (child.isMesh && child.name === "Eyes") {
          child.material.emissiveIntensity = 0;
        }
      });
    }
  }, [isThinking, actions, scene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    const mouseX = mousePosition.x || 0;
    const mouseY = mousePosition.y || 0;

    targetRotation.current.x = mouseY * 0.3;
    targetRotation.current.y = mouseX * 0.5;

    currentRotation.current.x +=
      (targetRotation.current.x - currentRotation.current.x) * delta * 2;
    currentRotation.current.y +=
      (targetRotation.current.y - currentRotation.current.y) * delta * 2;

    const head =
      group.current.getObjectByName("Head") ||
      group.current.getObjectByName("Neck");
    if (head) {
      head.rotation.x = currentRotation.current.x;
      head.rotation.y = currentRotation.current.y;
    }

    // Apply the responsive yOffset + floating animation
    group.current.position.y =
      yOffset + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={scale} />
      <pointLight
        position={[0, 2, 0]}
        intensity={0.5}
        color="#00ffff"
        distance={3}
        decay={2}
      />
    </group>
  );
}

// OPTIMIZATION: Add this line at the VERY END of the file
useGLTF.preload("/models/robot.glb");
