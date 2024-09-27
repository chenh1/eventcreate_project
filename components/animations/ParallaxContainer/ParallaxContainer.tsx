'use client'

import React from 'react';
import { useVerticalParallax } from '../../hooks/useVerticalParallax';

type ParallaxContainer = {
  children: string | JSX.Element | JSX.Element[], 
  className?: string, 
  parallaxAmount?: number,
  offsetAmt?: number,
  animationSpeedClass?: `duration-${number}`
}

export const ParallaxContainer: React.FC<ParallaxContainer> = ({ className = "", children, parallaxAmount = 0.5, offsetAmt = 0, animationSpeedClass = 'duration-300' }) => {
  const { elementRef } = useVerticalParallax({ parallaxAmount, offsetAmt });

  return (
    <div ref={elementRef} className={`${animationSpeedClass} ${className}`}>
      {children}
    </div>
  );
};