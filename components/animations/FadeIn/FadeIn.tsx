'use client'

import type { AnimationBase, FromDirection } from '../../constants/types';
import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import "./fadeIn.css"

export type FadeInType = AnimationBase & {
  from: FromDirection
}

export const FadeIn: React.FC<FadeInType> = ({ disable, animateWhenInView = true, className = "", from = "fromLeft", children }) => {
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
    <div ref={moduleRef} className={`${!disable ? 'fadeIn' : ''} ${!animateWhenInView || (animateWhenInView && isInView) ? '' : 'freeze'} ${from} ${className}`}>
      {children}
    </div>
  )
};