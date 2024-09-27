import type { CoreColors } from '../../constants/colors'
import React, { useMemo, ReactNode } from 'react';

type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | `sm:text-${string}` | `md:text-${string}`
type FontSizeClass = string
export type HeadingType = { 
  type: HeaderType, 
  fontSizeClass?: FontSizeClass, 
  children?: string | JSX.Element | JSX.Element[] | ReactNode, 
  className?: string, 
  colorClass?: `text-${CoreColors}`, 
  darkColorClass?: `dark:text-${CoreColors}`
}

const getHeading = (type: HeaderType): string | ((arg0: any) => JSX.Element) => {
  switch(type) {
    case 'h1': {
      return (props) => <h1 {...props}/>;
    }
    case 'h2': {
      return (props) => <h2 {...props}/>;
    }
    case 'h3': {
      return (props) => <h3 {...props}/>;
    }
  }

  return 'h4'
}

const getSizeClasses = (type: HeaderType, fontSizeClass: FontSizeClass): string => {
  if (fontSizeClass) {
    return fontSizeClass;
  }

  switch(type) {
    case 'h1': {
      return 'text-4xl sm:text-6xl'
    }
    case 'h2': {
      return 'text-3xl sm:text-5xl'
    }
    case 'h3': {
      return 'text-2xl sm:text-4xl'
    }
    case 'h4': {
      return 'text-lg sm:text-md'
    }
  }

  if (typeof(type) !== 'undefined') {
    return type
  }

  return 'text-xl sm:text-2xl'
}

const BASE_HEADING_CLASSES: string = 'font-headings font-semibold';

export const Heading: React.FC<HeadingType> = ({ type, fontSizeClass = "", children, className = "", colorClass="text-night-black", darkColorClass="dark:text-max-white", ...rest }) => {
  const H = useMemo(() => {
    return getHeading(type)
  }, [type])

  const computedClasses = useMemo(() => {
    return getSizeClasses(type, fontSizeClass);
  }, [type, fontSizeClass]);

  return (
    <H className={`${colorClass} ${darkColorClass} ${BASE_HEADING_CLASSES} ${computedClasses} ${className}`} {...rest}>
      {children}
    </H>
  )
};