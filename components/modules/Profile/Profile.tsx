'use client'

import type { CoreColors } from '@/components/constants/colors';
import type { SessionWithJwt } from '@/components/constants/types';
import { useSession } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import { Overlay } from '../../containers/Overlay/Overlay';
import { Button } from '../../core/Button/Button';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { useQuery } from '@apollo/client';
import { myDataQuery } from '../../../graphql/queries/myData';
import { Divider } from '../../core/Divider/Divider';
import getScoreRank, { BRONZE, ranks } from '../../utils/getScoreRank';
import { Badge } from '../Deck/ExamView/Badge';
import { Heading } from '../../core/Heading/Heading';
import { Box } from '../../containers/Box/Box';
import Link from 'next/link';
import { videosQuery } from '../../../graphql/queries/videos';
import { RadioSet } from '../../fields/RadioSet/RadioSet';
import { archetypeIcons } from "../../constants/archetypes";

const AWARD_STATS = 'award_stats'
const MODULES_COMPLETED = 'modules_completed'

interface ProfileProps {
  setIsLoggingOut: (boolean) => void;
}

export const Profile: React.FC<ProfileProps> = ({ setIsLoggingOut }: ProfileProps) => {
  const session = useSession().data as SessionWithJwt | null;
  const [ showProfile, setShowProfile ] = useState(false)
  const [ achievementView, setAchievementView ] = useState(MODULES_COMPLETED)
  const awardStatsCheckboxRef = useRef(null)
  const completedModulesCheckboxRef = useRef(null)

  const { data: { myData: { progressData = {} } = {} } = {} } = useQuery(myDataQuery, { 
    context: { 
      headers: { 
        'Authorization': `Bearer ${session?.data?.jwt}` 
      },
    } ,
    skip: session?.status !== 'authenticated'
  })

  const { data: { videos: { data: videos = [] } = {} } = {} } = useQuery(videosQuery, { 
    variables: { firstModule: 0, lastModule: 999 } ,
    skip: session?.status !== 'authenticated'
  })
  const { completedModules = [] } = progressData || {};

  let awardStats = {}

  if (achievementView === AWARD_STATS) {
    completedModules.forEach(({ examScore }) => {
      const rank = getScoreRank(examScore)

      if (awardStats[rank]) {
        awardStats[rank] += 1
      } else {
        awardStats[rank] = 1
      }
    })
  }

  const iconUrl = archetypeIcons[progressData?.archetype]
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div data-testid="toggleProfile" className="cursor-pointer relative w-12 h-12" onClick={() => setShowProfile(!showProfile)}>
        <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
          {iconUrl && <img title={`Greetings, ${progressData?.archetype}! You're logged in as ${session?.data?.email}`} src={iconUrl} alt="archetype icon" width={160} height={160}/>}
        </div>
      </div>

      <Overlay className="fixed top-24 right-4 bg-night-black-300 dark:bg-night-black-300 dark" shouldDisableBodyScroll={false} noDimmer noPopup visibility={showProfile} toggleVisibility={setShowProfile}>
        <Paragraph>Logged in as {session?.data?.email}</Paragraph>
        <Button onClick={()=> setIsLoggingOut(true)} label="Logout"/>
        <Divider/>

        <Box padding="0" className="grid-cols-2">
          <RadioSet
            onCheck={(value) => setAchievementView(value)}
            initialValue={achievementView}
            name="achievementView"
            data={[
              { label: 'Show award stats', value: AWARD_STATS },
              { label: 'Show completed modules', value: MODULES_COMPLETED }
            ]}
          />
        </Box>

        <div className="max-h-[50vh] overflow-y-auto">
          {achievementView === AWARD_STATS ?
            <Box padding="0" gap="sm" className="place-items-center">
              {ranks.map((rank, i) => (
                !!awardStats[rank] && (
                  <Box key={i} padding="0" className="place-items-center grid-cols-2">
                    <div className="scale-50 -m-6">
                      <Badge shouldLimitOverflow={false} rank={rank} />
                    </div>
                    <Heading type="h4" fontSizeClass="text-xl">x {awardStats[rank]}</Heading>
                  </Box>
                )
              ))}
            </Box>
            :
            <Box padding="0" gap="sm" className="justify-start">
              {completedModules.map(({ examScore, lessonModule }, i) => {
                const rank = getScoreRank(examScore)
                const scoreTextColor: `text-${CoreColors}` = rank === BRONZE ? 'text-max-white' : 'text-night-black-300'
                const scoreMessage = `${Math.round(examScore * 100)}`

                return (
                  <Box key={i} padding="0" className="justify-start items-center grid-cols-4">
                    <div className="scale-[.25] -m-12 col-span-1">
                      <Badge shouldLimitOverflow={false} rank={rank}>
                        <Heading type="h4" fontSizeClass="text-8xl" colorClass={scoreTextColor} darkColorClass={`dark:${scoreTextColor}`} className="z-50">
                          {scoreMessage}
                        </Heading>
                      </Badge>
                    </div>
                    <div className="col-span-3">
                      <Link href={`/module/${lessonModule.toString().replace('.', '-')}`}>
                        <Heading type="h4" fontSizeClass="text-xl">
                          {`${lessonModule}: ${videos?.length > 0 ? videos?.filter(({ attributes: { lessonModule: modNo } }) => lessonModule === modNo)[0]?.attributes?.title : ''}`}
                        </Heading>
                      </Link>
                    </div>
                  </Box>
                )
              })}
            </Box>
          }
        </div>
      </Overlay>
    </div>
  )
}