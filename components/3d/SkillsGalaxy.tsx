// components/3d/SkillsGalaxy.tsx - Add this wrapper
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  { name: "Go", color: "#00ADD8", size: 1.2 },
  { name: "Kafka", color: "#231F20", size: 1.1 },
  { name: "Docker", color: "#2496ED", size: 1.0 },
  { name: "React", color: "#61DAFB", size: 1.0 },
  { name: "Node.js", color: "#339933", size: 0.9 },
  { name: "MongoDB", color: "#47A248", size: 0.9 },
  { name: "C++", color: "#00599C", size: 0.9 },
  { name: "Podman", color: "#892CA0", size: 0.8 },
];

export default function SkillsGalaxy() {
  const groupRef = useRef<THREE.Group>(null);

  const skillNodes = useMemo(() => {
    return skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;

      return {
        ...skill,
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ),
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    skillNodes.forEach((skill, index) => {
      const mesh = groupRef.current!.children[index];
      if (!mesh) return;

      // Apply velocity with physics
      mesh.position.add(skill.velocity.clone().multiplyScalar(delta * 10));

      // Boundary collision (sphere)
      const distance = mesh.position.length();
      if (distance > 5) {
        const normal = mesh.position.clone().normalize();
        skill.velocity.reflect(normal).multiplyScalar(0.8);
      }

      // Gentle individual rotation
      mesh.rotation.x += delta * 0.5;
      mesh.rotation.y += delta * 0.3;
    });

    // Group rotation with parallax effect
    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {skillNodes.map((skill, index) => (
        <Float
          key={skill.name}
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <group position={skill.position}>
            <mesh castShadow>
              <sphereGeometry args={[skill.size * 0.5, 32, 32]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={0.3}
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
            <Text
              position={[0, skill.size * 0.7, 0]}
              fontSize={0.4}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {skill.name}
            </Text>
          </group>
        </Float>
      ))}
    </group>
  );
}
