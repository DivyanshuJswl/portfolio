// components/interactive/CursorFollower.tsx
"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useVelocity,
  useTransform,
} from "framer-motion";

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // 1. Raw Mouse Position (High Performance MotionValues)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Smooth "Fluid" Physics for the Follower
  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3. Optional: Velocity-based deformation (Subtle squish effect on movement)
  // Can add this if you want it to look "jelly-like" when moving fast
  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);
  const scaleVelocity = useTransform(
    [velocityX, velocityY],
    ([vx, vy]: number[]) => {
      const v = Math.sqrt(vx * vx + vy * vy);
      return Math.min(1 + v / 1000, 1.25); // Cap stretch at 1.25x
    },
  );

  useEffect(() => {
    // Optimization: Early exit for touch devices to save resources
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window)
    ) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      // Direct updates bypass React render cycle for 60fps performance
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    // OPTIMIZATION: Replaced expensive getComputedStyle with efficient Selector matching
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for clickable elements efficiently
      const isInteractive =
        target.matches("a, button, input, textarea, select") ||
        target.closest("a, button, input, .clickable"); // Add .clickable class to custom interactive elements

      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mouseover", handleHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. The Core: Precision Dot (Inverts color for visibility) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 2. The Aura: Fluid Glass Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale: scaleVelocity, // Subtle stretch on move
        }}
        animate={{
          width: isHovering ? 60 : 24,
          height: isHovering ? 60 : 24,
          backgroundColor: isHovering
            ? "rgba(99, 102, 241, 0.15)" // Indigo glow on hover
            : "transparent",
          borderWidth: isHovering ? "0px" : "1.5px",
          borderColor: isClicking
            ? "rgba(20, 184, 166, 0.8)" // Teal on click
            : isHovering
              ? "transparent"
              : "rgba(99, 102, 241, 0.4)", // Indigo idle
          filter: isHovering ? "blur(0px)" : "none", // Remove blur on hover for sharpness? Or add it?
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
          mass: 0.5,
        }}
      >
        {/* Inner Blur Effect for "Glass" look */}
        <div className="w-full h-full rounded-full backdrop-blur-[1px]" />
      </motion.div>
    </>
  );
}
