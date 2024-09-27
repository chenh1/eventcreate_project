'use client'

import type { AnimationBase } from '../../constants/types';
import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import "./popup.css"

export const Popup: React.FC<AnimationBase> = ({ className = "", disable, animateWhenInView = true, children }) => {
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
    <div ref={moduleRef} className={`relative ${!disable ? 'popup' : ''} ${!animateWhenInView || (animateWhenInView && isInView) ? '' : 'freeze'} ${className}`}>
      {children}
    </div>
  )
};