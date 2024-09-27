'use client'

import type { BgColor } from "@/components/containers/FixedDrawer/FixedDrawer";
import React, { useState } from "react";
import { Box } from "../../containers/Box/Box";
import { useRouter } from "next/navigation";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import './linkNode.css'
import '../../core/Button/button.css'

interface LinkNodeProps{
  title: string
  isCompleted: boolean;
  module: `${number}.${number}`;
  borderColor: `border-${BgColor}`;
  bgColor: `bg-${BgColor}`;
  guideToFirstNode: boolean;
}

export const LinkNode: React.FC<LinkNodeProps> = ({ title, isCompleted, module, borderColor, bgColor, guideToFirstNode }: LinkNodeProps) => {
  const router = useRouter();
  const [ isHover, setIsHover ] = useState<boolean>(false);
  
  return (
    <Box onClick={() => router.push(`/module/${module.replace('.', '-')}`)} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} padding="0" className="z-10 relative cursor-pointer grid-cols-[16px,_auto] items-center">
      {guideToFirstNode &&
        <Box padding="0" className="attention-chevron absolute">
          <div className="triangle static left">
            <div></div>
          </div>
        </Box>
      }
      <div className={`relative w-4 h-4 border-2 ${borderColor} rounded-full ${isHover || isCompleted || guideToFirstNode ? bgColor : 'bg-night-black'}`}>
        {isHover || isCompleted || guideToFirstNode && <div className={`origin-center absolute -top-0.5 -left-0.5 w-4 h-4 border-2 rounded-full ${borderColor} ${bgColor} animate-pulseEffect`}></div>}
      </div>
      {title && <Paragraph className={`${guideToFirstNode ? 'font-bold link-node-text' : ''}`} darkTextColor={isHover ? "apex-blue" : undefined} textColor={isHover ? "apex-blue" : undefined}>{`${guideToFirstNode ? 'START HERE: ' : ''}${title}`}</Paragraph>}
      {/* <Heading fontSizeClass="text-lg">{title}</Heading> */}
    </Box>
  )
}