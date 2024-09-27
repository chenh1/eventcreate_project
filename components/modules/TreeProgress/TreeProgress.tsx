'use client'

import type { RawTree } from "@/graphql/queries/learningPaths";
import type { ProgressData } from "@/graphql/queries/myData";
import type { VideoType } from "@/graphql/queries/videos";
import React from "react";
import { TreeNodes } from "../../charts/TreeNodes/TreeNodes";
import { Box } from "../../containers/Box/Box";
import { ParentSize } from "@visx/responsive";
import { useRouter, useParams } from "next/navigation";
import { buildLinearTree, formatTree } from "../../utils/treeDataUtils";

interface TreeProgressProps {
  rawTree: RawTree
  nameMap?: Record<string, string>;
  nameMapCallback?: (nameMap: Record<string, string>, name: string) => string;
  showAsList?: boolean;
  progressData: ProgressData;
  availableModules?: {
    attributes: VideoType;
  }[];
  highlightValue?: number;
  className?: string;
  nodeWidth?: number;
  nodeHeight?: number;
  isVertical?: boolean;
  hideRootNode?: boolean;
  globalOnMouseEnter?: (e: any) => void;
  parentNodeStroke?: string;
  background?: string;
}

export const TreeProgress: React.FC<TreeProgressProps> = ({ rawTree: learningPathTree, nameMap, nameMapCallback, showAsList, progressData, availableModules, highlightValue, className = 'h-screen w-screen md:w-[50vw]', nodeWidth, nodeHeight, ...props }: TreeProgressProps) => {
  const router = useRouter();
  const params = useParams();
  const { id = ''}: { id?: string } = params || {};
  const altHighlightValues = progressData?.completedModules?.map(({ lessonModule }) => {
    return lessonModule?.toString().replace('-', '.')
  })
  const highlightValues = [ highlightValue?.toString() || id.replace('-', '.') ];
  const rawTree = learningPathTree ? formatTree(learningPathTree, progressData) : buildLinearTree(availableModules, progressData);

  return (
    <Box padding="0" className={`overflow-y-auto ${className}`}>
      <ParentSize>
        {({ width, height }) => (
          <TreeNodes
            nameMap={nameMap}
            nameMapCallback={nameMapCallback}
            showAsList={showAsList}
            nodeWidth={nodeWidth}
            nodeHeight={nodeHeight}
            altHighlightValues={altHighlightValues}
            highlightValues={highlightValues}
            globalOnClick={e => {
              const { name } = e.data;
              router.push(`/module/${name.replace('.', '-')}`)
            }}
            width={width}
            height={height}
            rawTree={rawTree}
            {...props}
          />
        )}
      </ParentSize>
    </Box>
  )
}