import { useState, useEffect, useRef } from "react";

/**
 * useScrollStack hook
 * Tracks scroll progress within a container and provides a smoothed index for stacking animations.
 */
export const useScrollStack = (itemCount: number) => {
  const [smoothIndex, setSmoothIndex] = useState(0);
  const targetIndex = useRef(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Get the bounding rect of the container (which is 500vh tall)
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Total height available for scrolling the sticky content
      const scrollableHeight = rect.height - viewportHeight;
      
      // How much we have scrolled into the section
      const scrolled = -rect.top;
      
      // Clamp progress between 0 and 1
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      // Target index within [0, itemCount - 1]
      targetIndex.current = progress * (itemCount - 1);
    };

    let rafId: number;
    const animate = () => {
      setSmoothIndex((prev) => {
        const diff = targetIndex.current - prev;
        // Optimization: stop re-rendering if the change is negligible
        if (Math.abs(diff) < 0.0001) return targetIndex.current;
        // Standard LERP formula: current + (target - current) * factor
        return prev + diff * 0.15;
      });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [itemCount]);

  return { smoothIndex, containerRef };
};
