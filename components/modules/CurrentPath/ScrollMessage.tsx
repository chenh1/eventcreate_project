'use client'

import React, { useState, useEffect } from "react";
import { Box } from "../../containers/Box/Box";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import './currentPath.css';
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export const ScrollMessage: React.FC = () => {
  const [ showScrollDownMessage, setShowScrollDownMessage ] = useState<boolean>(false)
  const [ isMobile, setIsMobile ] = useState<boolean>(false)
  
  useEffect(() => {
    // scroll listener with scroll top is x number of pixels equal to 20% of the viewport height
    if (typeof window !== 'undefined') {
      if (!showScrollDownMessage) {
        setTimeout(() => {
          if (window.scrollY <= window.innerHeight * .2) {
            setShowScrollDownMessage(true)
          }
        }, 5000)
      }

      setIsMobile(window.innerWidth < 640)
    }
  }, [])

  const moduleRef = useIntersectionObserver({
    inViewCallback: () => {
      setShowScrollDownMessage(false)
    }
  })

  return (
    <Box padding="0" gap="0" className={`absolute translate-y-full bottom-4 left-1/4 transition-opacity duration-[3000ms] ${showScrollDownMessage ? 'opacity-100' : 'opacity-0'}`}>
      <Box padding="0" gap="xs" className="relative place-items-center">
        <div className="scroll-wheel-graphic"></div>
        <Paragraph size="sm" className="italic">
          {isMobile ? "Swipe up to see all modules" : "Scroll down to see all modules"}
        </Paragraph>
        {/* scroll marker */}
        <div ref={moduleRef} className="absolute top-[300%]"></div>
      </Box>
    </Box>
  )
}
