'use client'

import type { Orientation, AnimationBase } from '../../constants/types';
import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import "./expand.css"

export type ExpandType = AnimationBase & {
  orientation: Orientation
}

export const Expand: React.FC<ExpandType> = ({ className = "", disable, animateWhenInView = true, orientation = "horizontal", children }) => {
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
    <div ref={moduleRef} className={`${!disable ? 'expand' : ''} ${!animateWhenInView || (animateWhenInView && isInView) ? '' : 'freeze'} ${orientation} ${className}`}>
      {children}
    </div>
  )
};