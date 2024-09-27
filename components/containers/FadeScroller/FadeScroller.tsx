import type { Orientation } from '@/components/constants/types';
import React, { useState, useEffect, useRef, RefObject } from 'react';
import { Box } from '../Box/Box';
import './fadeScroller.css';

export type GradientFilterProps = {
  orientation: Orientation;
  faderColor?: string;
  twFaderColor?: string;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

const HORIZONTAL_GRADIENT_CLASSES = 'absolute z-20 h-full w-8 from-transparent';
const VERTICAL_GRADIENT_CLASSES = 'absolute z-20 w-full h-20 from-transparent';

const GradientFilter: React.FC<GradientFilterProps> = ({
  orientation,
  faderColor,
  twFaderColor,
  left,
  right,
  top,
  bottom
}) => {
  const gradientColor = `to-${twFaderColor ? twFaderColor : `[${faderColor}]`}`;
  let bgGradient = '';
  let positionClass = '';

  if (orientation === 'horizontal') {
    bgGradient = left ? 'bg-gradient-to-l' : 'bg-gradient-to-r';
    positionClass = left ? 'left-0' : 'right-0';
  } else {
    bgGradient = top ? 'bg-gradient-to-t' : 'bg-gradient-to-b';
    positionClass = top ? 'top-0' : 'bottom-0';
  }

  return (
    <div className={`pointer-events-none ${orientation === 'horizontal' ? HORIZONTAL_GRADIENT_CLASSES : VERTICAL_GRADIENT_CLASSES} ${positionClass} ${bgGradient} ${gradientColor}`}></div>
  );
};

export type FadeScrollerProps = {
  orientation?: Orientation;
  faderColor?: string;
  twFaderColor?: string;
  className?: string;
  children?: React.ReactNode;
  deps?: React.DependencyList;
}

export const FadeScroller: React.FC<FadeScrollerProps> = ({
  orientation = 'horizontal',
  faderColor,
  twFaderColor,
  className = 'max-w-full',
  children,
  deps = []
}) => {
  const overflowClasses = orientation === 'horizontal' ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden';
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftFader, setShowLeftFader] = useState<boolean>(false);
  const [showRightFader, setShowRightFader] = useState<boolean>(false);
  const [showTopFader, setShowTopFader] = useState<boolean>(false);
  const [showBottomFader, setShowBottomFader] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const scrollListener = () => {
        if (orientation === 'horizontal') {
          const { scrollLeft, scrollWidth, clientWidth } = container;
          const scrollRight = scrollWidth - scrollLeft - clientWidth;
          setShowLeftFader(scrollLeft !== 0);
          setShowRightFader(scrollRight !== 0);
        } else {
          const { scrollTop, scrollHeight, clientHeight } = container;
          const scrollBottom = scrollHeight - scrollTop - clientHeight;
          setShowTopFader(scrollTop !== 0);
          setShowBottomFader(scrollBottom !== 0);
        }
      };

      scrollListener();
      container.addEventListener('scroll', scrollListener);

      return () => container.removeEventListener('scroll', scrollListener);
    }
  }, [orientation, ...deps]);

  return (
    <Box padding="0" className={`relative ${className}`}>
      {orientation === 'horizontal' && showLeftFader && <GradientFilter orientation={orientation} left twFaderColor={twFaderColor} faderColor={faderColor} />}
      {orientation === 'vertical' && showTopFader && <GradientFilter orientation={orientation} top twFaderColor={twFaderColor} faderColor={faderColor} />}
      <Box innerRef={containerRef} padding="0" className={`fade-scroller max-w-full ${overflowClasses}`}>
        {children}
      </Box>
      {orientation === 'horizontal' && showRightFader && <GradientFilter orientation={orientation} right twFaderColor={twFaderColor} faderColor={faderColor} />}
      {orientation === 'vertical' && showBottomFader && <GradientFilter orientation={orientation} bottom twFaderColor={twFaderColor} faderColor={faderColor} />}
    </Box>
  );
};
