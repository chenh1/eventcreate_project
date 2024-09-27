'use client'

import type { ProgressData } from "../../../../graphql/queries/myData";
import type { Coords, SessionWithJwt } from "@/components/constants/types";
import React, { useState, useRef, useEffect } from 'react';
import { Box } from '../../../containers/Box/Box';
import { Button } from '../../../core/Button/Button';
import { Heading } from '../../../core/Heading/Heading';
import { Badge } from './Badge';
import { BadgeDrawer } from './BadgeDrawer';
import getScoreRank from '../../../utils/getScoreRank';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { addCompletedModulesEntriesMutation } from '../../../../graphql/mutations/addCompletedModulesEntries';
import { updateCurrentModuleMutation } from '../../../../graphql/mutations/updateCurrentModule';
import { useSession } from 'next-auth/react';

interface ExamCompletedProps {
  lessonModule: number;
  getFirstIncompletedModuleInTree: () => string; 
  resetExam: () => void;
  numberOfCorrectAnswers: number;
  numberOfQuestions: number;
  myData: {
    progressData?: ProgressData;
  };
  getNextModuleUrl: () => string;
}

// add mutation to update user's rank via API call in auth/user content story
export const ExamCompleted: React.FC<ExamCompletedProps> = ({ lessonModule, getFirstIncompletedModuleInTree, resetExam, numberOfCorrectAnswers, numberOfQuestions, myData, getNextModuleUrl }: ExamCompletedProps) => {
  const session = useSession().data as SessionWithJwt | null;
  const router = useRouter()
  const [ isHoveringOnBadge, setIsHoveringOnBadge ] = useState<boolean>(false)
  const [ badgePosition, setBadgePosition ] = useState<Coords>({ x: 0, y: 0 })
  const [ progressSaved, setProgressSaved ] = useState<boolean>(false)

  const interactionAreaRef = useRef<HTMLDivElement | null>(null)
  const badgeRef = useRef<HTMLDivElement | null>(null)
  const score = numberOfCorrectAnswers / numberOfQuestions;
  const rank = getScoreRank(score)
  const nextModuleUrl = getNextModuleUrl()
  const atEndofPath = nextModuleUrl?.includes('dashboard')

  const [ addCompletedModulesEntries ] = useMutation(addCompletedModulesEntriesMutation, {
    context: {
      headers: {
        'Authorization': `Bearer ${session?.data?.jwt}` 
      }
    }
  })

  const [ updateCurrentModule, { data: updateCurrentModuleResponse } ] = useMutation(updateCurrentModuleMutation, {
    context: {
      headers: {
        'Authorization': `Bearer ${session?.data?.jwt}` 
      }
    }
  });

  useEffect(() => {
    if (session?.status === 'authenticated') {
      if (!atEndofPath && !progressSaved) {
        const name = getFirstIncompletedModuleInTree()

        if (!!name) {
          updateCurrentModule({
            variables: {
              moduleData: {
                lessonModule: parseFloat(name),
                examScore: null
              },
              completedModuleData: {
                lessonModule,
                examScore: score
              }
            }
          }).then(res => {
            setProgressSaved(true)
          })
        }
      } else {
        addCompletedModulesEntries({
          variables: {
            moduleData: [{
              lessonModule,
              examScore: score
            }]
          }
        })
      }
    }

    return () => {
      setProgressSaved(false)
    }
  }, [ session?.status ])

  return (
    <Box gap="xl" padding="0" className="place-items-center">
      <div 
        className="min-w-[100px] min-h-[162px] grid place-items-center" 
        onMouseEnter={() => setIsHoveringOnBadge(true)} 
        onMouseLeave={() => setIsHoveringOnBadge(false)}
      >
        <div className="absolute w-[150px] h-[150px] bg-force-yellow rounded-full blur-lg opacity-50"></div>
        <div className="absolute w-[80px] h-[80px] bg-force-yellow rounded-full blur-2xl animate-pulseEffect"></div>
        <Badge
          shouldLimitOverflow
          shouldIncludeConfetti={score === 1}
          withDragAndDrop
          rank={rank}
          badgeRef={badgeRef}
          onStartDragging={({ isTouchDragging }) => isTouchDragging && setIsHoveringOnBadge(true)}
          onStopDragging={({ position, mobileEventDetected, isTouchDragging }) => {
            if (mobileEventDetected && !isTouchDragging) {
              setIsHoveringOnBadge(false);
            }

            setBadgePosition({ x: position.x, y: position.y })
          }}
        />
      </div>
      
      <Heading type="h2" colorClass="text-hyper-red" className="text-center">
        {`You got ${numberOfCorrectAnswers} out of ${numberOfQuestions} (${Math.floor(score * 100)}%)`}
      </Heading>

      <Box gap="md" padding="0" className="justify-self-stretch">
        <Button label={atEndofPath ? "Back to Dashboard" : "Next module!"} primary onClick={async () => {
          if (session?.status === 'authenticated') {
            if (!progressSaved) {
              if (!atEndofPath) {
                const name = getFirstIncompletedModuleInTree()

                if (!!name) {
                  await updateCurrentModule({
                    variables: {
                      moduleData: {
                        lessonModule: parseFloat(name),
                        examScore: null
                      },
                      completedModuleData: {
                        lessonModule,
                        examScore: score
                      }
                    }
                  })
                }
              } else {
                await addCompletedModulesEntries({
                  variables: {
                    moduleData: [{
                      lessonModule,
                      examScore: score
                    }]
                  }
                })
              }
            }

            setProgressSaved(false)
            router.push(nextModuleUrl)
          } else {
            router.push('/dashboard')
          }
        }}/>
        <Button label="Test your knowledge again" onClick={() => resetExam()}/>
      </Box>

      <BadgeDrawer
        myData={myData}
        shouldOpenBadgeDrawer={isHoveringOnBadge}
        interactionAreaRef={interactionAreaRef}
        badgePosition={badgePosition}
        badgeRef={badgeRef}
        rank={rank}
      />
    </Box>
  )
}