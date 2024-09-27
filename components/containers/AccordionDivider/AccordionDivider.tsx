'use client';

import React, { useState, ReactNode } from 'react';
import { Divider } from '../../core/Divider/Divider';
import { Box } from '../Box/Box';
import "./accordionDivider.css";

export type AccordionDividerProps = {
  className?: string;
  label: ReactNode;
  dividerShouldExpand?: boolean;
  children?: ReactNode;
  iconShow?: ReactNode;
  iconHide?: ReactNode;
  alwaysPushTriangle?: boolean;
}

export const AccordionDivider: React.FC<AccordionDividerProps> = ({
  className = "",
  label,
  dividerShouldExpand = false,
  children,
  iconShow,
  iconHide,
  alwaysPushTriangle
}) => {
  const [showContent, setShowContent] = useState<boolean>(false);

  return (
    <Box padding="0" className={`${className}`}>
      <div
        data-testid="accordionLabelClick"
        className={`cursor-pointer flex justify-between ${alwaysPushTriangle ? '' : 'md:justify-start'}`}
        onClick={() => setShowContent(!showContent)}
      >
        {label}
        {showContent ? iconHide : iconShow}
        {!iconHide && !iconShow &&
          <div className="relative w-5 ml-4">
            <div className={`triangle accordion ${showContent ? 'up' : 'down'}`}>
              <div></div>
            </div>
          </div>
        }
      </div>
      {!dividerShouldExpand && <Divider orientation="horizontal" />}
      <div
        className={`relative overflow-hidden duration-300 ease-in-out ${showContent ? 'h-full' : dividerShouldExpand ? 'h-[1px]' : 'h-0'}`}
      >
        <Box
          padding="0"
          gap="sm"
          className={`duration-300 ease-in-out ${showContent ? 'translate-y-0' : dividerShouldExpand ? 'dividerShouldExpand' : '-translate-y-full'}`}
        >
          {children}
          {dividerShouldExpand && <Divider orientation="horizontal" />}
        </Box>
      </div>
    </Box>
  );
};
