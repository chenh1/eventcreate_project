'use client'

import type { AnimationBase, FromDirection } from '../../constants/types';
import React, { useMemo, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import "./fallAndBounce.css"

const getPositionClass = (from: FromDirection): string => {
  switch(from) {
    case 'fromLeft': {
      return 'right-0'
    }
    case 'fromRight': {
      return 'left-0'
    }
    case 'fromTop': {
      return 'bottom-0'
    }
    case 'fromBottom': {
      return 'top-0'
    }
  }
}

export type FallAndBounceType = AnimationBase & {
  from: FromDirection,
  height?: number | `${number}px`,
  width?: number | `${number}px`,
  trackHeight?: number | `${number}px`,
  trackWidth?: number | `${number}px`,
}

export const FallAndBounce: React.FC<FallAndBounceType> = ({ disable, animateWhenInView = true, height = 0, width = 0, trackHeight = 0, trackWidth = 0, className = "", from = "fromLeft", children }) => {
  const computedClasses = useMemo(() => {
    const positionClass = getPositionClass(from);
    return [positionClass].join(' ');
  }, [from]);

  const [ isInView, setIsInView ] = useState(false);

  const moduleRef = useIntersectionObserver({
    inViewCallback: () => {
      setIsInView(true)
    },
    leaveViewCallback: () => {
      setIsInView(false)
    }
  })

  return (
    <div ref={moduleRef} className={`relative ${height ? `h-[${height}]` : ''} ${width ? `w-[${width}]` : ''}`}>
      <div className={`${!disable ? 'fallAndBounce' : ''} ${!animateWhenInView || (animateWhenInView && isInView) ? '' : 'freeze'} absolute ${from} ${computedClasses} ${trackHeight ? `h-[${trackHeight}]` : from === "fromBottom" || from === "fromTop" ? 'h-screen' : 'h-full'} ${trackWidth ? `w-[${trackWidth}]` : from === "fromLeft" || from === "fromRight" ? 'w-screen' : 'w-full'}`}>
        {children}
      </div>
    </div>
  )
};