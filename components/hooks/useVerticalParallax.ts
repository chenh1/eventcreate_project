'use client'

import { useRef, useEffect } from 'react';
import debounce from '../utils/debounce';

interface UseVerticalParallaxOptions {
  parallaxAmount?: number;
  offsetAmt?: number;
}

export const useVerticalParallax = ({ parallaxAmount = 0.5, offsetAmt = 0 }: UseVerticalParallaxOptions = {}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const element = elementRef.current;
    if (!element) return; 

    const scrollY = window.scrollY;
    const originalY = element.getBoundingClientRect().top + element.offsetHeight + scrollY;
    const viewportHeight = window.innerHeight;

    // Calculate the current midpoint of the visible viewport area
    const currentMidpoint = scrollY + viewportHeight / 2;

    const translateY = (scrollY - originalY + currentMidpoint + offsetAmt) * parallaxAmount;
    element.style.transform = `translateY(${translateY}px)`;
  };

  const debouncedHandleScroll = debounce(handleScroll, 40);

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener('scroll', debouncedHandleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [parallaxAmount, offsetAmt, debouncedHandleScroll]);

  return { elementRef };
};
