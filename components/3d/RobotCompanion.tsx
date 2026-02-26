
import { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";

export default function RobotCompanion() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/models/robot.glb");
  const { actions } = useAnimations(animations, group);

  // Responsive Scale State
  const [scale, setScale] = useState(1.5);
  const [yOffset, setYOffset] = useState(-1);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setScale(1.8);
        setYOffset(-2);
      } else {
        setScale(1.5);
        setYOffset(-1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Play Default Animation
  useEffect(() => {
    const animationName = actions["Idle"] ? "Idle" : Object.keys(actions)[0];

    if (animationName && actions[animationName]) {
      const action = actions[animationName];
      action?.reset().fadeIn(0.5).play();
      action?.setEffectiveTimeScale(0.5);
    }
  }, [actions]);

  return (
    <group ref={group} position={[0, yOffset, 0]} dispose={null}>
      <primitive object={scene} scale={scale} />
      {/* Simple ambient glow */}
      <pointLight position={[0, 2, 1]} intensity={1} color="#3b82f6" />
    </group>
  );
}

useGLTF.preload("/models/robot.glb");
