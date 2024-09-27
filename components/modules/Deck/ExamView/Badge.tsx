'use client'

import type { Rank } from '../../../utils/getScoreRank'
import { BRONZE } from '../../../utils/getScoreRank'
import React, { useEffect, useRef, ReactNode } from 'react';
import { Popup } from '../../../animations/Popup/Popup';
import { DragAndDropWrapper } from '../../../utils/DragAndDropWrapper';
import './badge.css'

function createConfetti(containerRef: React.RefObject<HTMLDivElement>, isLarge: boolean) {
  const colors = ['#f39c12', '#3498db', '#e74c3c', '#2ecc71', '#9b59b6'];
  const confettiContainer = containerRef?.current;

  if (!confettiContainer) {
    return;
  }

  const confetti = document.createElement('div');
  confetti.className = 'confetti' + (isLarge ? ' large' : '');
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  const xPos = Math.random() * window.innerWidth;
  const yPos = Math.random() * window.innerHeight;

  confetti.style.left = xPos + 'px';
  confetti.style.top = yPos + 'px';

  confettiContainer.appendChild(confetti);
}

function burstConfetti(count: number = 100, containerRef: React.RefObject<HTMLDivElement>, isLarge: boolean) {
  for (let i = 0; i < count; i++) {
    createConfetti(containerRef, isLarge);
  }
}

interface BadgeProps {
  rank: Rank;
  largeConfetti?: boolean;
  renderConfettiInWrapper?: boolean;
  confettiCount?: number;
  shouldLimitOverflow: boolean;
  children?: ReactNode;
  withDragAndDrop?: boolean;
  shouldIncludeConfetti?: boolean;
  badgeRef?: React.MutableRefObject<HTMLDivElement | null>;
  onStartDragging?: (any) => void; // TODO: CHANGE THIS ONCE useDragAndDrop is migrated
  onStopDragging?: (any) => void; // TODO: CHANGE THIS ONCE useDragAndDrop is migrated
}

const BadgeBase: React.FC<BadgeProps> = ({ rank = BRONZE, largeConfetti = false, renderConfettiInWrapper = false, confettiCount, shouldLimitOverflow, children }: BadgeProps) => {  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (renderConfettiInWrapper) {
      burstConfetti(confettiCount, containerRef, largeConfetti);
    }
  }, [])

  const confettiWrapper = renderConfettiInWrapper ? <div ref={containerRef} className={`confetti-container ${shouldLimitOverflow ? 'overflow-hidden' : ''}`}></div> : <></>;
  
  return (
    <Popup disable={false}>
      <div className={`award ${rank}`}>
        <div className="ribbon-star"></div>
        <div className="ribbon"></div>
        <div className="nested">
          <div className="ribbon-star grid place-items-center"></div>
        </div>
        <div className="nested-2">
          <div className="ribbon-star grid place-items-center">
            <div className="absolute z-50">
              {children}
            </div>
          </div>
        </div>
      </div>
      {confettiWrapper}
    </Popup>
  )
}



export const Badge: React.FC<BadgeProps> = ({ rank = BRONZE, confettiCount = 100, largeConfetti = false, withDragAndDrop, shouldLimitOverflow, shouldIncludeConfetti, renderConfettiInWrapper, children, badgeRef, ...rest }: BadgeProps) => {    
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldIncludeConfetti) {
      burstConfetti(confettiCount, containerRef, largeConfetti);
    }
  }, [])

  return (
    <>
      {shouldIncludeConfetti && !renderConfettiInWrapper && <div ref={containerRef} className={`confetti-container ${shouldLimitOverflow ? 'overflow-hidden' : ''}`}></div>}
      {withDragAndDrop ?
        <DragAndDropWrapper externalRef={badgeRef} className="z-[500] transition-transform origin-center" {...rest}>
          <BadgeBase rank={rank} largeConfetti={largeConfetti} confettiCount={confettiCount} renderConfettiInWrapper={renderConfettiInWrapper} shouldLimitOverflow={shouldLimitOverflow} children={children}/>
        </DragAndDropWrapper>
        :
        <BadgeBase rank={rank} largeConfetti={largeConfetti} confettiCount={confettiCount} renderConfettiInWrapper={renderConfettiInWrapper} shouldLimitOverflow={shouldLimitOverflow} children={children} />
      }
    </>
  )
}