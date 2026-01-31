// components/interactive/CursorFollower.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // OPTIMIZATION: Reduce spring stiffness/damping calculations
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Lighter spring config
  const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // OPTIMIZATION: Strict check to ensure this never runs on mobile/tablets
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      // Direct updates to motion values bypass React renders
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Debounced or simplified hover check
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Simplified check using pointer-events logic
      const style = window.getComputedStyle(target);
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        style.cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true }); // Passive listener
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-white pointer-events-none z-[100] mix-blend-difference will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-indigo-500/50 pointer-events-none z-[99] will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 48 : 20,
          height: isHovering ? 48 : 20,
          opacity: isClicking ? 0.8 : 1,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }} // Switch to duration for simple scaling (faster than spring)
      />
    </>
  );
}
