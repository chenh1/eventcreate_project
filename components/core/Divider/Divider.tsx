import type { Orientation } from '../../constants/types';
import React, { useMemo } from 'react';

export type DividerType = { orientation?: Orientation, className?: string }

const getOrientationClass = (orientation: Orientation): string => {
  if (orientation === "horizontal") {
    return "w-full h-0 border-0 border-t-[1px] border-night-black-300 dark:border-max-white"
  } else {
    return "h-full w-0 border-0 border-l-[1px] border-night-black-300 dark:border-max-white"
  }
}

export const Divider: React.FC<DividerType> = ({ orientation = "horizontal", className = "" }) => {
  const computedClasses = useMemo(() => {
    return getOrientationClass(orientation);
  }, [orientation]);

  return (
    <hr className={`${computedClasses} ${className}`}/>
  )
};