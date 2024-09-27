'use client'

import React, { useRef } from 'react';
import './hover3dCard.css';

const THRESHOLD = 3;

export const Hover3dCard: React.FC<{ children?: string | JSX.Element | JSX.Element[] }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;
  
    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;

    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

    if (!!containerRef.current) {
      containerRef.current.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
    }
  }
  
  const resetStyles = (e) => {
    if (!!containerRef.current) {
      containerRef.current.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
    }
  }

  return (
    <div data-testid="hover-3d-card" ref={containerRef} onMouseMove={handleHover} onMouseLeave={resetStyles} className="card-3d">
      {children}
    </div>
  )
}