// hooks/useIdleDetection.ts
'use client';

import { useState, useEffect, useRef } from 'react';

export function useIdleDetection(timeout: number = 5000) {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const resetTimer = () => {
      setIsIdle(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsIdle(true), timeout);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    
    resetTimer(); // Initialize

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeout]);

  return isIdle;
}