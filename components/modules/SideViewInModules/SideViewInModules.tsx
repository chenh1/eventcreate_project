'use client'

import type { RawTree } from "../../../graphql/queries/learningPaths";
import type { VideoType } from "../../../graphql/queries/videos";
import type { SessionWithJwt } from "../../constants/types";
import React from "react";
import { archetypeIcons } from "../../constants/archetypes";
import { useQuery } from "@apollo/client";
import { Box } from "../../containers/Box/Box";
import { TreeProgress } from "../TreeProgress/TreeProgress";
import { ListProgress } from "../ListProgress/ListProgress";
import { myDataQuery } from "../../../graphql/queries/myData";
import { useSession } from "next-auth/react";
import { allLearningPathsQuery } from "../../../graphql/queries/learningPaths";
import colors from "../../constants/colors";
import { videosQuery } from "../../../graphql/queries/videos";

interface SideViewInModulesProps {
  isVertical: boolean;
  lessonModule: number;
  availableModules: { attributes: VideoType }[]
  rawTree: RawTree
}

export const SideViewInModules: React.FC<SideViewInModulesProps> = ({ isVertical, lessonModule, availableModules, rawTree }: SideViewInModulesProps) => {
  const session = useSession().data as SessionWithJwt | null;

  const { data: { myData: { progressData } = {} } = {} } = useQuery(myDataQuery, { 
    context: { 
      headers: { 
        'Authorization': `Bearer ${session?.data?.jwt}` 
      },
    },
    skip: session?.status !== 'authenticated'
  })

  const learningPathTree = JSON.parse(JSON.stringify(progressData?.customPath || {}))
  const showList = !!progressData
  const archetype = progressData?.archetype

  const { data: { learningPaths: { data: allLearningPaths } = {} } = {} } = useQuery(allLearningPathsQuery)

  const nameMapCallback = (nameMap, nodeName) => {
    return nameMap?.filter(({ attributes: { lessonModule } }) => lessonModule?.toString() === nodeName?.toString())[0]?.attributes?.title
  }

  const firstModule = Math.floor(lessonModule);
  const lastModule = firstModule + 0.999;

  const { data: { videos: { data: videos } = {} } = {} } = useQuery(videosQuery, {
    variables: {
      firstModule: showList ? 0 : firstModule,
      lastModule: showList ? 100 : lastModule
    }
  })
  
  return showList ?
    <Box gap="md">
      {!!archetype &&
        <Box padding="0" className="justify-self-center">
          <img src={archetypeIcons[archetype]} alt="archetype icon" width={120} height={120}/>
        </Box>
      }
      <ListProgress
        isVertical
        nameMapCallback={nameMapCallback}
        nameMap={videos}
        dataCy="current-path"
        // globalOnMouseEnter={(node) => setNodeData(node)}
        progressData={progressData}
        //globalOnMouseLeave={() => setNodeData(null)}
        rawTree={learningPathTree}
        highlightValue={progressData?.currentModule?.lessonModule}
        // className={`col-span-1 w-full min-h-[${nodeCount * 100}px]`}
        background={colors.nightBlack}
        allLearningPaths={allLearningPaths}
        faderColor={colors.nightBlack300}
        availableModules={availableModules}
        showAsList
        nodeWidth={12}
        nodeHeight={12}
      />
    </Box>
    :
    <TreeProgress
      progressData={progressData}
      isVertical={isVertical}
      availableModules={availableModules}
      rawTree={rawTree}
    />
}