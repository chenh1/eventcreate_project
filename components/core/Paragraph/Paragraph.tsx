import type { IncrementKeys } from '@/components/constants/types';
import type { CoreColors } from '../../constants/colors';
import React, { useMemo, ReactNode } from 'react';

const getSizeClasses = (size: IncrementKeys = "md"): `text-${string}` | "" => {
  switch(size) {
    case 'lg': {
      return 'text-lg'
    }
    case 'sm': {
      return 'text-sm'
    }
    case "md": {
      return 'text-base'
    }
    default: {
      return ""
    }
  }
}

const BASE_PARAGRAPH_CLASSES: string = 'font-body';

export type ParagraphType = {
  size?: IncrementKeys,
  isInlineBlock?: boolean,
  children?: string | JSX.Element | JSX.Element[] | ReactNode, 
  textColor?: CoreColors,
  darkTextColor?: CoreColors,
  className?: string
}

export const Paragraph: React.FC<ParagraphType> = ({ size, isInlineBlock, children, textColor, darkTextColor = "max-white", className }) => {
  const computedClasses = useMemo(() => {
    return getSizeClasses(size);
  }, [size]);

  const colorClass = useMemo(() => {
    if (textColor) {
      return `text-${textColor}`
    } else if (darkTextColor) {
      return `text-${darkTextColor}`
    }
  }, [textColor])

  return (
    <p className={`${isInlineBlock ? 'inline-block' : ''} ${colorClass || 'text-night-black'} font-body ${BASE_PARAGRAPH_CLASSES} ${computedClasses} ${className}`}>
      {children}
    </p>
  )
};