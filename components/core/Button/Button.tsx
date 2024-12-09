"use client"

import type { CoreColors } from '../../constants/colors'
import type { IncrementKeys } from '@/components/constants/types';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const getSizeClasses = (size: IncrementKeys): string => {
  switch (size) {
    case 'sm': {
      return 'px-4 py-2.5';
    }
    case 'lg': {
      return 'px-6 py-3';
    }
    default: {
      return 'px-5 py-2.5';
    }
  }
};

const getColorClasses = (color: CoreColors): string => {
  switch(color) {
    case 'ultra-purple': {
      return 'bg-ultra-purple border-ultra-purple dark:bg-ultra-purple dark:border-ultra-purple'
    }
    case 'hyper-red': {
      return 'bg-hyper-red border-hyper-red dark:bg-hyper-red dark:border-hyper-red'
    }
    default: {
      return "";
    }
  }
}

const getModeClasses = (isPrimary: boolean): string =>
  isPrimary
    ? 'font-headings relative text-max-white'
    : 'font-headings relative text-slate-700 bg-transparent border-slate-700 dark:text-max-white dark:border-max-white active:text-max-white active:bg-slate-700 active:border-slate-700 dark:active:bg-max-white dark:active:border-max-white dark:active:text-night-black';

const BASE_BUTTON_CLASSES: string =
  'w-full sm:w-auto cursor-pointer border-2 font-bold leading-none inline-block rounded-lg text-center';

export type ButtonType = { 
  value?: string; 
  type?: string; 
  disabled?: boolean; 
  primary?: boolean, 
  color?: CoreColors, 
  size?: IncrementKeys, 
  label: string, 
  url?: string, 
  textAlign?: string, 
  onClick?: (any) => void
}
/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonType> = (
  { primary = false, color = "hyper-red", size = 'md', label, url, textAlign, onClick, ...props }
) => {
  const [ isHover, setIsHover ] = useState(false);
  const computedClasses = useMemo(() => {
    const modeClass = getModeClasses(primary);
    const sizeClass = getSizeClasses(size);
    const textAlignClass = textAlign ? `text-${textAlign}` : '';
    return [modeClass, sizeClass, textAlignClass, url ? 'w-full' : ''].join(' ');
  }, [primary, size, textAlign, url]);

  const computedColorClasses = useMemo(() => {
    return primary ? getColorClasses(color) : '';
  }, [color])

  const ClickElement = !!url ?
    props => <Link {...props}/> :
    props => <button {...props}/>;

  return (
    <ClickElement 
      href={url}
      type="button" 
      onMouseOver={() => !isHover && setIsHover(true)} 
      onMouseOut={() => setIsHover(false)} 
      onMouseLeave={() => setIsHover(false)} 
      className={`${!primary ? 'secondary' : ''} ${BASE_BUTTON_CLASSES} ${computedClasses} ${computedColorClasses}`} 
      onClick={(e) => {
        onClick && onClick(e)
      }}
      {...props}
    > 
      {primary && <div className={`${computedColorClasses} rounded-lg absolute left-0 top-0 w-full h-full`}></div>}
      <span className="pointer-events-none relative z-10">
        {label}
      </span>
    </ClickElement>
  );
};
