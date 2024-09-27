'use client';

import React, { useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { LinkHorizontal, LinkVertical } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { fontFamilyHeadings } from '../../constants/typography';
import { apexBlue, machIndigo } from '../../constants/colors';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';

const NODE_WIDTH = 56;
const NODE_HEIGHT = 56;

type HierarchyNode = {
  onClick?: (node: HierarchyPointNode<any>) => void
} & HierarchyPointNode<any>

interface NodeData {
  name: string;
  isCompleted?: boolean;
  [key: string]: any; // Allow additional properties
}

interface RootNodeProps {
  dataCy: string;
  node: HierarchyNode;
  shouldHighlight: boolean;
  top: number;
  left: number;
  rootNodeFill: string;
  index?: number;
  globalOnClick?: (node: HierarchyNode) => void;
  globalOnMouseLeave?: (node: HierarchyNode) => void;
  globalOnMouseEnter?: (node: HierarchyNode) => void;
  shouldAltHighlight?: boolean;
  background?: string
}

interface ParentNodeProps {
  dataCy: string;
  nameMap?: Record<string, string>;
  nameMapCallback?: (nameMap: Record<string, string>, name: string) => string;
  index: number;
  node: HierarchyNode;
  showAsList: boolean;
  nodeWidth: number;
  nodeHeight: number;
  linkDist?: number;
  shouldAltHighlight?: boolean;
  shouldHighlight: boolean;
  top: number;
  left: number;
  globalOnMouseEnter?: (node: HierarchyNode) => void;
  globalOnMouseLeave?: (node: HierarchyNode) => void;
  globalOnClick?: (node: HierarchyNode) => void;
  background: string;
  parentNodeStroke: string;
  altNodeStroke: string;
  textColor: string;
}

interface NodeProps {
  dataCy: string;
  showAsList: boolean;
  nameMap?: Record<string, string>;
  nameMapCallback?: (nameMap: Record<string, string>, name: string) => string;
  hideRootNode?: boolean;
  index: number;
  node: HierarchyNode;
  nodeWidth?: number;
  nodeHeight?: number;
  altHighlightValues?: string[];
  highlightValues?: string[];
  isVertical?: boolean;
  globalOnClick?: (node: HierarchyNode) => void;
  globalOnMouseEnter?: (node: HierarchyNode) => void;
  globalOnMouseLeave?: (node: HierarchyNode) => void;
  background: string;
  parentNodeStroke: string;
  altNodeStroke: string;
  nodeBaseColor: string;
  rootNodeFill: string;
  textColor: string;
}

export type TreeNodesProps = {
  dataCy?: string;
  showAsList?: boolean;
  width?: number;
  height?: number;
  margin?: { top: number; left: number; right: number; bottom: number };
  rawTree: NodeData;
  globalOnClick?: (node: HierarchyNode) => void;
  globalOnMouseEnter?: (node: HierarchyNode) => void;
  globalOnMouseLeave?: (node: HierarchyNode) => void;
  background?: string;
  linearGradentFrom?: string;
  linearGradentTo?: string;
  parentNodeStroke?: string;
  altNodeStroke?: string;
  rootNodeFill?: string;
  linkStroke?: string;
  nodeBaseColor?: string;
  textColor?: string;
  highlightValues?: string[];
  altHighlightValues?: string[];
  minWidth?: number;
  minHeight?: number;
  isVertical?: boolean;
  hideRootNode?: boolean;
  nodeWidth?: number;
  nodeHeight?: number;
  nameMap?: Record<string, string>;
  nameMapCallback?: (nameMap: Record<string, string>, name: string) => string;
}

function RootNode({
  dataCy = '',
  node,
  shouldHighlight,
  top,
  left,
  rootNodeFill,
  globalOnClick
}: RootNodeProps) {
  const stringLength = node.data.name.length * 1.2;
  const width = `${stringLength}ch`;
  const height = NODE_HEIGHT;
  const centerX = `${-stringLength / 2}ch`;
  const centerY = -height / 2;

  return (
    <Group className="cursor-pointer" top={top} left={left}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill="url('#lg')"
        strokeWidth={1}
        strokeDasharray="2,2"
        strokeOpacity={0.6}
        rx={10}
        onClick={() => {
          if (globalOnClick) globalOnClick(node);
          if (node?.onClick) node.onClick(node);
        }}
      />
      <text
        data-cy={`${dataCy}-root-text`}
        dy=".33em"
        fontSize={18}
        fontFamily={fontFamilyHeadings}
        textAnchor="middle"
        style={{ pointerEvents: 'none', width: "200px" }}
        fill={rootNodeFill}
        width={"300px"}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function ParentNode({
  dataCy,
  nameMap,
  nameMapCallback = (arg1, arg2) => { return " "},
  index,
  node,
  showAsList,
  nodeWidth,
  nodeHeight,
  linkDist = 32,
  shouldAltHighlight,
  shouldHighlight: defaultHighlight,
  top: originalTop,
  left,
  globalOnMouseEnter,
  globalOnMouseLeave,
  globalOnClick,
  background,
  parentNodeStroke,
  altNodeStroke,
  textColor
}: ParentNodeProps) {
  const width = nodeWidth;
  const height = nodeHeight;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isCompleted = node.data.isCompleted;

  const [isHover, setIsHover] = useState(false);
  const shouldHighlight = isHover || defaultHighlight;

  const categorySpacing = parseInt(node.data.name, 10) - 1;
  let top = originalTop;

  if (showAsList) {
    top = originalTop + (categorySpacing * 24);
  }

  return (
    <Group
      onMouseEnter={() => {
        setIsHover(true);
        if (globalOnMouseEnter) globalOnMouseEnter(node);
      }}
      onMouseLeave={() => {
        setIsHover(false);
        if (globalOnMouseLeave) globalOnMouseLeave(node);
      }}
      className="cursor-pointer relative"
      top={top}
      left={left}
    >
      {showAsList && (
        <rect
          x={centerX + width}
          width={linkDist}
          height="1"
          stroke="#374469"
          fill="#374469"
        />
      )}
      {shouldHighlight && (
        <circle
          className="animate-pulseEffect"
          height={height}
          width={width}
          r={width / 2}
          y={centerY}
          x={centerX}
          fill={parentNodeStroke}
          stroke={parentNodeStroke}
          strokeWidth={5}
        />
      )}
      <circle
        data-cy={`${dataCy}-node-${index}`}
        height={height}
        width={width}
        r={width / 2}
        y={centerY}
        x={centerX}
        fill={shouldHighlight ? parentNodeStroke : isCompleted || shouldAltHighlight ? altNodeStroke : background}
        stroke={isCompleted || shouldAltHighlight ? altNodeStroke : parentNodeStroke}
        strokeWidth={(isCompleted || shouldHighlight || shouldAltHighlight) ? 5 : 1}
        onClick={() => {
          if (globalOnClick) globalOnClick(node);
          if (node?.onClick) node.onClick(node);
        }}
      />
      <text
        data-cy={`${dataCy}-node-text-${index}`}
        dy=".33em"
        dx={showAsList ? linkDist : 0}
        fontSize={18}
        fontFamily={fontFamilyHeadings}
        textAnchor={showAsList ? "start" : 'middle'}
        style={{ pointerEvents: 'none' }}
        className={showAsList ? "cursor-pointer" : ""}
        fill={showAsList && isHover ? parentNodeStroke : textColor}
        onMouseEnter={() => {
          setIsHover(true);
          if (globalOnMouseEnter) globalOnMouseEnter(node);
        }}
        onMouseLeave={() => {
          setIsHover(false);
          if (globalOnMouseLeave) globalOnMouseLeave(node);
        }}
      >
        {nameMap ? nameMapCallback(nameMap, node.data.name) : node.data.name}
      </text>
    </Group>
  );
}

function Node({
  dataCy,
  showAsList,
  nameMap,
  nameMapCallback,
  hideRootNode,
  index,
  node,
  nodeWidth = NODE_WIDTH,
  nodeHeight = NODE_HEIGHT,
  altHighlightValues,
  highlightValues,
  isVertical,
  globalOnClick,
  globalOnMouseEnter,
  globalOnMouseLeave,
  background,
  parentNodeStroke,
  altNodeStroke,
  nodeBaseColor,
  rootNodeFill,
  textColor
}: NodeProps) {
  const width = NODE_WIDTH;
  const height = NODE_HEIGHT;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;
  const shouldHighlight = highlightValues?.includes(node.data.name) ?? false;
  const shouldAltHighlight = altHighlightValues?.includes(node.data.name) ?? false;

  const left = isVertical ? node.x : node.y;
  const top = isVertical ? node.y : node.x;

  if (isRoot && !hideRootNode) {
    return (
      <RootNode
        dataCy={dataCy}
        index={index}
        globalOnMouseLeave={globalOnMouseLeave}
        globalOnMouseEnter={globalOnMouseEnter}
        shouldAltHighlight={shouldAltHighlight}
        shouldHighlight={shouldHighlight}
        left={left}
        top={top}
        rootNodeFill={rootNodeFill}
        node={node}
        globalOnClick={globalOnClick}
        background={background}
      />
    );
  }
  return (
    <ParentNode
      nameMap={nameMap}
      nameMapCallback={nameMapCallback}
      showAsList={showAsList}
      nodeWidth={nodeWidth}
      nodeHeight={nodeHeight}
      dataCy={dataCy}
      index={index}
      globalOnMouseLeave={globalOnMouseLeave}
      globalOnMouseEnter={globalOnMouseEnter}
      shouldAltHighlight={shouldAltHighlight}
      shouldHighlight={shouldHighlight}
      left={left}
      top={top}
      textColor={textColor}
      altNodeStroke={altNodeStroke}
      parentNodeStroke={parentNodeStroke}
      node={node}
      globalOnClick={globalOnClick}
      background={background}
    />
  );
}

const defaultMargin = { top: 80, left: 80, right: 80, bottom: 80 };

export const TreeNodes = ({
  dataCy = "",
  showAsList = false,
  width: widthRaw,
  height: heightRaw,
  margin = defaultMargin,
  rawTree: tree,
  globalOnClick,
  globalOnMouseEnter,
  globalOnMouseLeave,
  background = '#272b4d',
  linearGradentFrom = '#fd9b93',
  linearGradentTo = '#fe6e9e',
  parentNodeStroke = apexBlue,
  altNodeStroke = machIndigo,
  rootNodeFill = apexBlue,
  linkStroke = '#374469',
  nodeBaseColor = apexBlue,
  textColor = '#ffffff',
  highlightValues,
  altHighlightValues,
  minWidth = 0,
  minHeight = 0,
  isVertical,
  hideRootNode,
  nodeWidth,
  nodeHeight,
  nameMap,
  nameMapCallback
}: TreeNodesProps) => {
  const rawTree = hideRootNode ? tree?.children?.[0] : tree;
  const width = (widthRaw ?? 0) < minWidth ? minWidth : widthRaw;
  const height = (heightRaw ?? 0) < minHeight ? minHeight : heightRaw;
  const data = useMemo(() => hierarchy(rawTree), [rawTree]);
  const innerWidth = (width ?? 0) - margin.left - margin.right;
  const innerHeight = (height ?? 0) - margin.top - margin.bottom - 20;
  const sizeWidth = isVertical ? innerWidth : innerHeight;
  const sizeHeight = isVertical ? innerHeight : innerWidth;

  return (width ?? 0) < 10 ? null : (
    <svg width={width} height={height}>
      <LinearGradient id="lg" from={linearGradentFrom} to={linearGradentTo} />
      <rect width={width} height={height} rx={14} fill={background} />
      <Tree root={data} size={[sizeWidth, sizeHeight]}>
        {(tree) => (
          <Group top={margin.top} left={margin.left}>
            {tree.links().map((link, i) => (
              isVertical ? (
                <LinkVertical
                  key={`link-${i}`}
                  data={link}
                  stroke={linkStroke}
                  strokeWidth="2"
                  fill="none"
                />
              ) : (
                <LinkHorizontal
                  key={`link-${i}`}
                  data={link}
                  stroke={linkStroke}
                  strokeWidth="2"
                  fill="none"
                />
              )
            ))}
            {tree.descendants().map((node, i) => (
              <Node
                nameMap={nameMap}
                nameMapCallback={nameMapCallback}
                showAsList={showAsList}
                nodeWidth={nodeWidth}
                nodeHeight={nodeHeight}
                hideRootNode={hideRootNode}
                dataCy={dataCy}
                index={i}
                highlightValues={highlightValues}
                altHighlightValues={altHighlightValues}
                isVertical={isVertical}
                key={`node-${i}`}
                node={node}
                globalOnClick={globalOnClick}
                globalOnMouseEnter={globalOnMouseEnter}
                globalOnMouseLeave={globalOnMouseLeave}
                background={background}
                parentNodeStroke={parentNodeStroke}
                altNodeStroke={altNodeStroke}
                nodeBaseColor={nodeBaseColor}
                rootNodeFill={rootNodeFill}
                textColor={textColor}
              />
            ))}
          </Group>
        )}
      </Tree>
    </svg>
  );
};
