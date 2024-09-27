'use client'

import React, { useState, useEffect, useRef, RefObject } from 'react';

interface UseStickyModuleReturn {
  moduleRef: RefObject<HTMLDivElement>;
  isStickyTop: boolean;
  isStickyBottom: boolean;
}

export const useStickyModule = (): UseStickyModuleReturn => {
  const moduleRef = useRef<HTMLDivElement | null>(null);
  const [isStickyTop, setIsStickyTop] = useState<boolean>(false);
  const [isStickyBottom, setIsStickyBottom] = useState<boolean>(false);
  const [originalY, setOriginalY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const moduleElement = moduleRef.current;
      if (!moduleElement) return;

      const moduleRect = moduleElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (!originalY) {
        // Set the original Y position if it's not set yet
        setOriginalY(moduleRect.top + scrollY);
      }

      if (scrollY >= originalY && moduleRect.top <= windowHeight) {
        // Stick the module to the top of the window when it's inside the viewable area
        setIsStickyTop(true);
        setIsStickyBottom(false);
        moduleElement.style.position = 'sticky';
        moduleElement.style.top = '0';
      } else if (scrollY <= originalY && moduleRect.top >= 0) {
        // Stick the module to the bottom of the window when it's inside the viewable area
        setIsStickyBottom(true);
        setIsStickyTop(false);
        moduleElement.style.position = 'sticky';
        moduleElement.style.top = 'auto';
        moduleElement.style.bottom = '0';
      } else {
        // Unstick the module and position it relative to the window
        setIsStickyTop(false);
        setIsStickyBottom(false);
        moduleElement.style.position = 'relative';
        moduleElement.style.top = 'auto';
        moduleElement.style.bottom = 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [originalY]);

  return { moduleRef, isStickyTop, isStickyBottom };
};

// Usage example:
export const YourComponent: React.FC = () => {
  const { moduleRef, isStickyTop, isStickyBottom } = useStickyModule();

  return (
    <div ref={moduleRef}>
      <p>Your sticky module content goes here.</p>
      {isStickyTop && <p>Module is sticky to the top.</p>}
      {isStickyBottom && <p>Module is sticky to the bottom.</p>}
    </div>
  );
};
