import { useEffect, useState } from 'react';

interface AnimatedCounterOptions {
  duration?: number;
  isActive?: boolean;
}

export const useAnimatedCounter = (
  start: number,
  end: number,
  options: AnimatedCounterOptions = {}
) => {
  const {
    duration = 1000,
    isActive = false
  } = options;

  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isActive) {
      setCount(start);
      return;
    }

    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);

      setCount(currentCount);

      if (now >= endTime) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [start, end, duration, isActive]);

  return count;
};

// Convenience exports for backward compatibility
export const useCountUp = (
  end: number,
  duration: number = 1000,
  isActive: boolean = false
) => useAnimatedCounter(0, end, { duration, isActive });

export const useCountDown = (
  start: number,
  end: number,
  duration: number = 1000,
  isActive: boolean = false
) => useAnimatedCounter(start, end, { duration, isActive });