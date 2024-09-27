"use client";

import type { IncrementKeys, Direction } from '@/components/constants/types';
import React, { useMemo, useState, useRef, useEffect, MouseEventHandler, ReactNode } from 'react';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import getPaddingClass from '../../utils/getPaddingClass';

export type BgColor = 
  "hyper-red" |
  "force-yellow" |
  "ultra-purple" |
  "cyber-teal" |
  "apex-blue" | 
  "max-white" | 
  "night-black" | 
  "bg-transparent";
  
export type DarkBgColor = "max-white" | "night-black" | "bg-transparent";

export type FixedDrawerProps =  {
  className?: string; // For setting width and height through classname
  padding?: IncrementKeys;
  hasShadow?: boolean;
  bgColor?: BgColor;
  darkBgColor?: DarkBgColor;
  openFrom?: Direction;
  hasTab?: boolean;
  hasSensors?: boolean;
  hasScroll?: boolean; // only supports y axis
  tabContent?: ReactNode;
  defaultOpenState?: boolean;
  onTopReached?: () => void;
  onTopLeave?: () => void;
  tabClasses?: string;
  tabIsFixed?: boolean;
  shouldDisableBodyScroll?: boolean;
  hasClickOutArea?: boolean;
  children?: ReactNode;
}

const getBgColorClass = (bgColor?: BgColor): string => {
  switch (bgColor) {
    case 'max-white':
      return 'bg-max-white';
    case 'night-black':
      return 'bg-night-black-300';
    default:
      return '';
  }
};

const getDarkBgColorClass = (darkBgColor?: DarkBgColor): string => {
  switch (darkBgColor) {
    case 'max-white':
      return 'dark:bg-max-white';
    case 'night-black':
      return 'dark:bg-night-black-300';
    default:
      return '';
  }
};

const getContainerPositionClass = (openFrom: Direction): `${Direction}-0` | '' => {
  switch (openFrom) {
    case 'left':
      return 'left-0';
    case 'right':
      return 'right-0';
    case 'top':
      return 'top-0';
    case 'bottom':
      return 'bottom-0';
    default:
      return '';
  }
};

const getClosedPosition = (openFrom: Direction): `${"-" | ""}translate-${"x" | "y"}-full` | "" => {
  switch (openFrom) {
    case 'left':
      return '-translate-x-full';
    case 'right':
      return 'translate-x-full';
    case 'top':
      return '-translate-y-full';
    case 'bottom':
      return 'translate-y-full';
    default:
      return '';
  }
};

const getOpenToClass = (openFrom: Direction): `translate-${"x" | "y"}-0` | "" => {
  switch (openFrom) {
    case 'left':
    case 'right':
      return 'translate-x-0';
    case 'top':
    case 'bottom':
      return 'translate-y-0';
    default:
      return '';
  }
};

const getShadowClass = (openFrom: Direction): `shadow-${string}` | "" => {
  switch (openFrom) {
    case 'left':
      return 'shadow-[10px_10px_15px_-3px_rgb(0_0_0_/_0.1),_10px_4px_6px_-4px_rgb(0_0_0_/_0.1)]';
    case 'right':
      return 'shadow-[-10px_10px_15px_-3px_rgb(0_0_0_/_0.1),_-10px_4px_6px_-4px_rgb(0_0_0_/_0.1)]';
    case 'top':
      return 'shadow-[0_20px_15px_-3px_rgb(0_0_0_/_0.1),_0_14px_6px_-4px_rgb(0_0_0_/_0.1)]';
    case 'bottom':
      return 'shadow-[0_-20px_15px_-3px_rgb(0_0_0_/_0.1),_0_-14px_6px_-4px_rgb(0_0_0_/_0.1)]';
    default:
      return '';
  }
};

const getOpenedTabPosition = (openFrom: Direction): `${Direction}-0 translate-${"x" | "y"}-0` | "" => {
  switch (openFrom) {
    case 'left':
      return 'right-0 translate-x-0';
    case 'right':
      return 'left-0 translate-x-0';
    case 'top':
      return 'bottom-0 translate-y-0';
    case 'bottom':
      return 'top-0 translate-y-0';
    default:
      return '';
  }
};

const getTabPositionClass = (openFrom: Direction): `${Direction}-0 ${"-" | ""}translate-${"x" | "y"}-full` | "" => {
  switch (openFrom) {
    case 'left':
      return 'right-0 translate-x-full';
    case 'right':
      return 'left-0 -translate-x-full';
    case 'top':
      return 'bottom-0 translate-y-full';
    case 'bottom':
      return 'top-0 -translate-y-full';
    default:
      return '';
  }
};

const getTabBorderRadiusClass = (openFrom: Direction): `rounded-${"r" | "l" | "b" | "t"}-lg` | "" => {
  switch (openFrom) {
    case 'left':
      return 'rounded-r-lg';
    case 'right':
      return 'rounded-l-lg';
    case 'top':
      return 'rounded-b-lg';
    case 'bottom':
      return 'rounded-t-lg';
    default:
      return '';
  }
};

const getSensorSizePositionClass = (openFrom: Direction): `${Direction}-0 w-${"4" | "screen"} h-${"4" | "screen"}` | "" => {
  switch (openFrom) {
    case 'left':
      return 'left-0 w-4 h-screen';
    case 'right':
      return 'right-0 w-4 h-screen';
    case 'top':
      return 'top-0 w-screen h-4';
    case 'bottom':
      return 'bottom-0 w-screen h-4';
    default:
      return '';
  }
};

export const FixedDrawer: React.FC<FixedDrawerProps> = ({
  className = '',
  padding = 'sm',
  hasShadow = true,
  bgColor = 'max-white',
  darkBgColor = 'night-black',
  openFrom = 'left',
  hasTab = true,
  hasSensors = false,
  hasScroll = false,
  tabContent = <Paragraph>OPEN</Paragraph>,
  defaultOpenState = false,
  onTopReached,
  onTopLeave,
  tabClasses = '',
  tabIsFixed = false,
  shouldDisableBodyScroll = true,
  hasClickOutArea = false,
  children
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpenState);
  const previousScrollYRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsOpen(defaultOpenState);
  }, [defaultOpenState]);

  const scrollCheck = () => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > 0) {
      onTopLeave && onTopLeave();
    } else {
      onTopReached && onTopReached();
    }

    if (
      (currentScrollTop > previousScrollYRef.current && openFrom === 'bottom') ||
      (currentScrollTop < previousScrollYRef.current && openFrom === 'top')
    ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    previousScrollYRef.current = currentScrollTop;
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && hasScroll) {
      window.addEventListener('scroll', scrollCheck);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', scrollCheck);
      }
    };
  }, [hasScroll, scrollCheck]);

  useEffect(() => {
    if (isOpen && shouldDisableBodyScroll) {
      document.body.style.overflow = 'hidden';
    } else if (!isOpen && shouldDisableBodyScroll) {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, shouldDisableBodyScroll]);

  const computedClasses = useMemo(() => getContainerPositionClass(openFrom), [openFrom]);
  const closedClass = useMemo(() => getClosedPosition(openFrom), [openFrom]);
  const sensorSizePositionClass = useMemo(() => getSensorSizePositionClass(openFrom), [openFrom]);
  const computedTabClasses = useMemo(() => getTabBorderRadiusClass(openFrom), [openFrom]);
  const tabPositionClass = useMemo(() => getTabPositionClass(openFrom), [openFrom]);

  const sharedClasses = useMemo(() => {
    const shadowClass = hasShadow ? getShadowClass(openFrom) : '';
    const bgColorClass = getBgColorClass(bgColor);
    const darkBgColorClass = getDarkBgColorClass(darkBgColor);
    const paddingClass = getPaddingClass(padding);
    return [shadowClass, paddingClass, bgColorClass, darkBgColorClass].join(' ');
  }, [hasShadow, openFrom, padding, bgColor, darkBgColor]);

  const openClass = useMemo(() => getOpenToClass(openFrom), [openFrom]);
  const openedTabPosition = useMemo(() => getOpenedTabPosition(openFrom), [openFrom]);

  return (
    <>
      {hasClickOutArea && isOpen &&
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget && isOpen) {
              setIsOpen(false);
            }
          }}
          className={`z-50 duration-300 ease-in-out fixed grid place-items-center left-0 top-0 w-screen h-screen`}
        />
      }
      <div
        ref={containerRef}
        onMouseLeave={() => !hasTab && hasSensors && setIsOpen(false)}
        className={`z-50 fixed duration-300 ease-in-out ${computedClasses} ${sharedClasses} ${className} ${isOpen ? openClass : closedClass}`}
      >
        {children}
        {hasTab &&
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`${tabIsFixed ? 'fixed' : 'absolute'} cursor-pointer duration-300 ease-in-out ${tabClasses} ${isOpen ? openedTabPosition : tabPositionClass} ${sharedClasses} ${computedTabClasses}`}
          >
            {tabContent}
          </div>
        }
      </div>
      {hasSensors &&
        <div
          data-testid="mouseEnterSensor"
          onMouseEnter={() => setIsOpen(true)}
          className={`z-50 fixed ${sensorSizePositionClass}`}
        />
      }
    </>
  );
};
