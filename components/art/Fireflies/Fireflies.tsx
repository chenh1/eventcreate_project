'use client';

import React, { useEffect } from 'react';
import { initFireflies } from './initFireflies';
import './fireflies.css';
import colors from '../../constants/colors';

// Define the type for the props
interface FirefliesProps {
  qty?: number;
  fixedColor?: string;
  maxMouseDistance?: number;
  moveTowardsMouseMultiplier?: number;
  viewableWidthClass?: string;
  viewableHeightClass?: string;
  className?: string;
}

// Functional component with props type annotation
export const Fireflies: React.FC<FirefliesProps> = ({
  qty = 50,
  fixedColor = colors['forceYellow'],
  maxMouseDistance = 500,
  moveTowardsMouseMultiplier = 1.5,
  viewableWidthClass = 'w-screen',
  viewableHeightClass = 'h-[90vh]',
  className = '',
}) => {
  const initFirefliesWithParams = () => {
    const viewportSize = window.innerWidth;
    const fireflies = viewportSize > 1280 ? qty
      : viewportSize > 768 ? qty * 0.75
      : qty * 0.5;

    initFireflies({
      qty: fireflies,
      fixedColor,
      maxMouseDistance,
      moveTowardsMouseMultiplier,
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initFirefliesWithParams();

      window.addEventListener('resize', initFirefliesWithParams);
      return () => window.removeEventListener('resize', initFirefliesWithParams);
    }
  }, []);

  return (
    <div className={`dot-container ${viewableWidthClass} ${viewableHeightClass} ${className}`}></div>
  );
};
