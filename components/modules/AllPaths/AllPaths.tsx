'use client'

import type { ProgressData } from "@/graphql/queries/myData";
import React, { useState, FC } from "react";
import { useQuery } from "@apollo/client";
import { Section } from "../../containers/Section/Section";
import type { SessionWithJwt } from "@/components/constants/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { myDataQuery } from "../../../graphql/queries/myData";
import { videosQuery } from "../../../graphql/queries/videos";
import { TreeProgress } from "../TreeProgress/TreeProgress";
import { Heading } from "../../core/Heading/Heading";
import { Box } from "../../containers/Box/Box";
import { nightBlack, hyperRed, forceYellow, ultraPurple, cyberTeal, apexBlue } from '../../constants/colors';
import { colorClasses } from "../../constants/colors";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import { Badge } from "../Deck/ExamView/Badge";
import getScoreRank from "../../utils/getScoreRank";
import { allLearningPathsQuery } from "../../../graphql/queries/learningPaths";
import { QueryResult } from "@apollo/client";

const nodeColors = [hyperRed, forceYellow, ultraPurple, cyberTeal, apexBlue];

interface VideoAttributes {
  lessonModule: string;
  title: string;
  description: string;
}

interface Video {
  attributes: VideoAttributes;
}

interface LearningPathAttributes {
  rawTree: any;
  title: string;
  description: string;
  level: string;
}

interface LearningPath {
  attributes: LearningPathAttributes;
}

interface AllPathsQueryData {
  learningPaths: {
    data: LearningPath[];
  };
}

interface VideosQueryData {
  videos: {
    data: Video[];
  };
}

interface MyDataQueryData {
  myData: {
    progressData?: ProgressData;
  };
}

export const AllPaths: FC = () => {
  const session = useSession().data as SessionWithJwt | null;
  const router = useRouter();

  const { data: allLearningPathsData } = useQuery<AllPathsQueryData>(allLearningPathsQuery);
  const { data: videosData, loading, error } = useQuery<VideosQueryData>(videosQuery, { variables: { firstModule: 0, lastModule: 999 } });
  const { data: myData } = useQuery<MyDataQueryData>(myDataQuery, {
    context: {
      headers: {
        'Authorization': `Bearer ${session?.data?.jwt}`
      },
    },
    skip: session?.status !== 'authenticated'
  });

  const allLearningPaths = allLearningPathsData?.learningPaths.data || [];
  const videos = videosData?.videos.data || [];
  const progressData = myData?.myData.progressData || {};

  // const currentModule = videos.find(({ attributes: { lessonModule } }) => lessonModule === progressData?.currentModule?.lessonModule)?.attributes || {};
  const [nodeData, setNodeData] = useState<any[]>([]);
  
  return (
    <>
      {allLearningPaths.map(({ attributes: { rawTree, title, description, level } }, i) => {
        const targetNodeData = nodeData[i];
        const previewModule: VideoAttributes | undefined = videos.find(({ attributes: { lessonModule } }) => lessonModule === targetNodeData?.data.name)?.attributes!;
        const examScore = progressData?.completedModules?.find(({ lessonModule }) => lessonModule === targetNodeData?.data.name)?.examScore;
        const tree = JSON.parse(JSON.stringify(rawTree));
        const nodeCount = tree?.nodeCount;
        const rank = getScoreRank(examScore ?? 0);
        const scoreMessage = `You scored ${Math.round((examScore ?? 0) * 100)}%`
        
        return (
          <Section key={i}>
            <Box padding="0" gap="lg" className="sm:grid-cols-3">
              <Box padding="0" className="relative col-span-1 self-center">
                <div className={`absolute opacity-25 left-0 h-36 w-36 grid place-items-center rounded-full bg-${colorClasses[i]}`}>
                  <Heading type="h4" fontSizeClass="text-8xl">{level}</Heading>
                </div>
                <Box padding="0" className="z-10">
                  <Heading type="h3">{title}</Heading>
                  <Paragraph>{description}</Paragraph>
                </Box>
              </Box>
              {tree &&
                <div style={{ minHeight: `${nodeCount * 100}px` }}>
                  <TreeProgress
                    isVertical
                    hideRootNode
                    globalOnMouseEnter={(node) => {
                      const newNodeData = [...(nodeData || [])];
                      newNodeData[i] = node;
                      setNodeData(newNodeData);
                    }}
                    parentNodeStroke={nodeColors[i]}
                    progressData={progressData}
                    rawTree={tree}
                    highlightValue={parseInt(progressData?.currentModule?.lessonModule ?? "")}
                    className="col-span-1 w-full h-full"
                    background={nightBlack}
                  />
                </div>
              }
              <Box padding="0" gap="sm" className="self-center">
                {previewModule &&
                  <>
                    <div className="flex">
                      <div className="CodeMirror-merge-2pane">
                        <Heading type="h3">{previewModule?.title}</Heading>
                      </div>
                      {!!examScore &&
                        <div className="relative">
                          <div className="absolute left-0 bottom-0 scale-[.25] -mx-6 -my-16">
                            <Badge shouldLimitOverflow={false} rank={rank} />
                          </div>
                        </div>
                      }
                    </div>
                    <Paragraph>{previewModule?.description}</Paragraph>
                    {!!examScore && <Paragraph className="italic" textColor="hyper-red" darkTextColor="hyper-red">{scoreMessage}</Paragraph>}
                  </>
                }
              </Box>
            </Box>
          </Section>
        );
      })}
    </>
  );
}
