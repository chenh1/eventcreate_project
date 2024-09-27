'use client'

import type { VideoType } from "@/graphql/queries/videos";
import type { ProgressData } from "@/graphql/queries/myData";
import type { RawTree } from "@/graphql/queries/learningPaths";
import type { BgColor } from "@/components/containers/FixedDrawer/FixedDrawer";
import React from "react";
import { Box } from "../../containers/Box/Box";
import { useParams } from "next/navigation";
import { buildLinearTree, formatTree } from "../../utils/treeDataUtils";
import { Heading } from "../../core/Heading/Heading";
import { LinkNode } from "./LinkNode";
import { FadeScroller } from "../../containers/FadeScroller/FadeScroller";


interface Video {
  attributes: VideoType;
}

interface ListProgressProps {
  isVertical?: boolean;
  highlightValue?: number;
  background?: string;
  showAsList?: boolean;
  nodeWidth?: number;
  nodeHeight?: number;
  rawTree: RawTree;
  faderColor?: string;
  twFaderColor?: string;
  allLearningPaths: {
    title: string;
    level: string;
    description: string;
    rawTree: RawTree;
  }
  className?: string;
  nameMap?: Record<string, string>;
  nameMapCallback?: (nameMap: Record<string, string> | undefined, name: string) => string;
  progressData: ProgressData;
  availableModules: Video[];
  dataCy: string;
  globalOnMouseEnter?: (e: any) => void;
}

// recursively dig into tree's nested nodes to create a flattened array of nodes in order
const mapTree = (tree: RawTree, userData: ProgressData): { [key: string]: { name: `${number}.${number}`; isCompleted: boolean; }[] } => {
  const completedModules = userData?.completedModules || [];
  const nodes = {};
  const traverse = (node) => {
    if (node.children) {
      node.children.forEach(child => {
        traverse(child);
      });
    }

    if (node.name) {
      node.isCompleted = completedModules.filter(({ lessonModule: lm }) => lm == node.name)?.length > 0
    }

    const mappedNode = {...node}
    mappedNode.children = null;
    const nodeCategoryKey = "s" + (parseInt(mappedNode?.name) - 1)

    if (isNaN(parseInt(mappedNode?.name))) {

    } else if (nodes[nodeCategoryKey]) {
      nodes[nodeCategoryKey].push(mappedNode)
    } else {
      nodes[nodeCategoryKey] = [mappedNode]
    }
  }

  traverse(tree);
  return nodes;
}

const borderKeys: `border-${BgColor}`[] = [
  'border-hyper-red',
  'border-force-yellow',
  'border-ultra-purple',
  'border-cyber-teal',
  'border-apex-blue'
]

const bgKeys: `bg-${BgColor}`[] = [
  'bg-hyper-red',
  'bg-force-yellow',
  'bg-ultra-purple',
  'bg-cyber-teal',
  'bg-apex-blue'
]

export const ListProgress: React.FC<ListProgressProps> = (props: ListProgressProps) => {
  const { rawTree: learningPathTree, twFaderColor, faderColor, allLearningPaths = {}, nameMap, nameMapCallback, progressData, availableModules } = props || {}
  
  const rawTree = learningPathTree ? formatTree(learningPathTree, progressData) : buildLinearTree(availableModules, progressData);
  const mappedTree = mapTree(JSON.parse(JSON.stringify(rawTree)), progressData)
  const mapKeys = Object.keys(mappedTree)?.reverse()
  const guideToFirstNode = progressData?.completedModules?.length === 0 || !progressData?.completedModules
  
  return (
    <FadeScroller deps={[ progressData, learningPathTree, allLearningPaths ]} orientation="vertical" className="max-h-[70vh] sm:max-h-[80vh]" twFaderColor={twFaderColor} faderColor={faderColor}>
      <Box padding="0" className="py-12">
        {mapKeys?.map((key, i) => {
          const nodes = mappedTree[key]?.reverse()
          const index = parseInt(key.replace('s', ''));
          const { attributes: { title } = {} } = allLearningPaths[index] || {}

          return (
            <Box key={i}>
              <Heading type="h4" fontSizeClass="text-lg">{title}</Heading>
              <Box padding="0" gap="sm" className="">
                {nodes.map((node, j) => {
                  const title = nameMapCallback ? nameMapCallback(nameMap, node.name) : ""
                  return (
                    <div key={j} className="relative">
                      {j !== 0 && <div className={`absolute border ${borderKeys[index]} h-[48px] w-px left-2 -translate-y-[32px] -translate-x-1/2`}></div>}
                      <LinkNode guideToFirstNode={guideToFirstNode && i === 0 && j === 0} bgColor={bgKeys[index]} borderColor={borderKeys[index]} isCompleted={node.isCompleted} title={title} module={node.name}/>
                    </div>
                  )
                })}
              </Box>
            </Box>
          )
        })}
      </Box>
    </FadeScroller>
  )
}