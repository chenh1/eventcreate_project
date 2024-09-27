'use client'

// tested in ExamCompleted.spec.tsx
import type { ProgressData } from '@/graphql/queries/myData';
import type { Coords } from '@/components/constants/types';
import type { Rank } from '../../../utils/getScoreRank';
import React, { useEffect, useState } from 'react';
import { Badge } from './Badge';
import { FixedDrawer } from '../../../containers/FixedDrawer/FixedDrawer';
import getScoreRank from '../../../utils/getScoreRank';
import './badge.css'

interface MedalPlacement { 
  randomLeft: number;
  randomTop: number;
  rank: Rank;
  lessonModule: number;
  shouldIncludeConfetti: boolean;
  confettiCount?: number;
  renderConfettiInWrapper?: boolean;
}

interface BadgeDrawerProps {
  myData: {
    progressData?: ProgressData;
  };
  shouldOpenBadgeDrawer: boolean;
  interactionAreaRef: React.MutableRefObject<HTMLDivElement | null>;
  badgeRef: React.MutableRefObject<HTMLDivElement | null>;
  badgePosition: Coords;
  rank: Rank;
}

// add mutation to update user's rank via API call in auth/user content story
export const BadgeDrawer: React.FC<BadgeDrawerProps> = ({ myData, shouldOpenBadgeDrawer, interactionAreaRef, badgeRef, badgePosition, rank }: BadgeDrawerProps) => {
  const [ medals, setMedals ] = useState<[] | MedalPlacement[] | ((prevMedals: MedalPlacement[]) => (MedalPlacement | { confettiCount: number; renderConfettiInWrapper: boolean; randomLeft: number; randomTop: number; rank: Rank; lessonModule: number; })[])>([])
  const [ keepDrawerOpen, setKeepDrawerOpen ] = useState<boolean>(false)

  // scatter medals/ribbons around the drawer
  useEffect(() => {
    // get progressData scores from myData
    const { progressData: { completedModules } = {} } = myData || {}

    // get the interaction area
    const interactionArea = interactionAreaRef.current
    const containerWidth = interactionArea?.offsetWidth ?? 0;
    const containerHeight = interactionArea?.offsetHeight ?? 0;

    const medalPlacements = completedModules?.map((props, i) => {
      const randomLeft = Math.floor(Math.random() * (containerWidth - 50)); // Random left position within container
      const randomTop = Math.floor(Math.random() * (containerHeight - 50)); // Random top position within container
      const rank = getScoreRank(props.examScore)
      const lessonModule = Number(props.lessonModule) // Convert the lessonModule value to a number
      return { randomLeft, randomTop, rank, lessonModule, shouldIncludeConfetti: false }
    }) || []

    setMedals(medalPlacements)
  }, [ myData ])

  useEffect(() => {
    const interactionArea = interactionAreaRef.current?.getBoundingClientRect()
    // if badge is in interactionArea
    
    if (badgePosition.x > (interactionArea?.left ?? 0) && badgePosition.x < (interactionArea?.right ?? 0) && badgePosition.y > (interactionArea?.top ?? 0) - 100 && badgePosition.y < (interactionArea?.bottom ?? 0)) {
      // add badge to medals
      setKeepDrawerOpen(true)
      if (badgeRef.current) {
        badgeRef.current.className += ' scale-0'
      }
      const lessonModule = 1.05
      setMedals((prevMedals: MedalPlacement[]) => [
        ...prevMedals, 
        { 
          confettiCount: 40, 
          renderConfettiInWrapper: true, 
          randomLeft: badgePosition.x + 60 - (interactionArea?.left ?? 0), 
          randomTop: badgePosition.y + 80 - (interactionArea?.top ?? 0), 
          rank, 
          lessonModule 
        }
      ])
    }

  }, [ badgePosition ])
  
  return (
    <FixedDrawer
      openFrom="right" 
      className="h-1/5 sm:h-1/2 top-1/2 w-[80vw] sm:w-1/4 -translate-y-3/4 sm:-translate-y-1/2" 
      hasSensors
      hasTab={false}
      padding="0"
      shouldDisableBodyScroll={false}
      defaultOpenState={shouldOpenBadgeDrawer || keepDrawerOpen}
    >
      <div className="fixed h-full w-screen sm:w-[calc(100%_+_5rem)] bg-[brown] sm:-translate-x-[15%] badge-drawer">
        <div className="absolute top-1/2 badge-drawer-handle w-[16px] h-[120px] -translate-x-[40px] -translate-y-full"></div>
        
        <div className="absolute top-0 badge-drawer top-face w-full h-[24px] -translate-y-[84px]"></div>
        <div className="absolute top-0 badge-drawer top-panel w-full h-[60px] -translate-y-[60px]"></div>

        <div className="absolute badge-drawer top-face h-full w-[24px] -translate-y-[60px]"></div>
        <div className="absolute shadow side-panel-shadow-on-top-panel h-[60px] w-[24px] translate-x-[24px] -translate-y-[60px]"></div>
        <div className="absolute shadow side-panel-shadow-on-base h-full w-[80px] translate-x-[24px]"></div>

        <div className="absolute w-full h-full p-8">
          <div ref={interactionAreaRef} className="w-full h-full">
            {(medals as MedalPlacement[])?.map(({ randomLeft, randomTop, rank, confettiCount, renderConfettiInWrapper, lessonModule }, i) => (
              <div key={i} style={{ top: `${randomTop}px`, left: `${randomLeft}px` }} className={`scale-50 absolute`}>
                <Badge shouldLimitOverflow={false} largeConfetti confettiCount={confettiCount} renderConfettiInWrapper={renderConfettiInWrapper} rank={rank}/>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 badge-drawer bottom-panel w-full h-[60px] translate-y-[24px]"></div>
        <div className="absolute bottom-0 badge-drawer top-face w-full h-[24px] -translate-y-[36px]"></div>
      </div>
      
    </FixedDrawer>
  )
}