'use client'

import type { VideoType } from '@/graphql/queries/videos';
import React, { useState } from 'react';
import { Heading } from '../../../core/Heading/Heading';
import { VideoPlayer } from '../../../core/VideoPlayer/VideoPlayer';
import { Box } from '../../../containers/Box/Box';
import { AccordionDivider } from '../../../containers/AccordionDivider/AccordionDivider';
import { Overlay } from '../../../containers/Overlay/Overlay';
import { Button } from '../../../core/Button/Button';
import { useSession } from "next-auth/react";
import { EXAM } from '../Deck';
import { Markdown } from '../../../utils/Markdown';

interface LearnViewProps {
  video: VideoType;
  setMode: (string) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ video, setMode }: LearnViewProps) => {
  const [ videoEnded, setVideoEnded ] = useState<boolean>(false)
  const session = useSession();

  return (
    <>
      <Box padding="0" gap="md" className="place-items-center w-full mt-[50%] md:mt-[20%]">
        <Box padding="0" className="w-full place-self-center place-items-center">
          <Heading type="h2" fontSizeClass="text-xl sm:text-5xl" className="text-center">{video?.title}</Heading>
          <Box padding="0" className="justify-self-stretch sm:justify-self-center">
            <Button onClick={() => setMode(EXAM)} label={videoEnded ? "Test your knowledge!" : "Skip to quiz"} primary={videoEnded}/>
          </Box>
        </Box>
        <VideoPlayer 
          isResponsive 
          url={video?.url}
          onEnded={() => setVideoEnded(true)}
          controls
        />
        {/* <Button label="Add entry" onClick={() => addCompletedModulesEntries({ variables: { moduleData: [{ lessonModule: 1.05, examScore: 0.8 }] } })} />
        <Button label="Delete entry" onClick={() => deleteCompletedModulesEntries({ variables: { moduleData: [{ lessonModule: 1.05, examScore: 0.8 }] } })} />
        <Button label="Update entry" onClick={() => updateCompletedModulesEntries({ variables: { moduleData: [{ lessonModule: 1.05, examScore: 0.3 }] } })} /> */}
        {video?.description &&
          <Box padding="0" className="w-full">
            <AccordionDivider label={<Heading type="h4">Transcript</Heading>} dividerShouldExpand>
              <Markdown gap="md">{video?.transcript}</Markdown>
            </AccordionDivider>
          </Box>
        }
        {videoEnded &&
          <Overlay visibility={videoEnded} toggleVisibility={setVideoEnded}>
            <Box padding="0" className="w-full">
              <Heading type="h2">You've completed this video!</Heading>
              <Button onClick={() => setMode(EXAM)} label="Test your knowledge!" primary/>
            </Box>
          </Overlay>
        }
      </Box>
    </>
  )
}