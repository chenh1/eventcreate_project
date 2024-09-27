import type { CoreColors } from '../../constants/colors';
import type { GtmSet } from '../../constants/tagging'
import React, { useMemo } from 'react';
import { CLICK_CLASS, SECTION_VIEW_CLASS } from '../../constants/tagging';

const getColorClasses = (color: CoreColors): string => {
  switch(color) {
    case 'hyper-red': {
      return 'bg-hyper-red text-night-black'
    }
    case 'ultra-purple': {
      return 'bg-ultra-purple text-max-white'
    }
    case 'cyber-teal': {
      return 'bg-cyber-teal text-night-black'
    }
    case 'force-yellow': {
      return 'bg-force-yellow text-night-black'
    }
    case 'mach-indigo': {
      return 'bg-mach-indigo text-max-white'
    }
    case 'apex-blue': {
      return 'bg-apex-blue text-night-black'
    }
    default: {
      return "";
    }
  }
}

export type PillType = {
  children?: string | JSX.Element | JSX.Element[], 
  onClick?: (any) => void,
  color?: CoreColors, 
  className?: string, 
} & GtmSet

export const Pill: React.FC<PillType> = ({ children, onClick, color = "hyper-red", className="", gtmClick, gtmSectionView, dataGtmId }) => {
  const computedColorClasses = useMemo(() => {
    return getColorClasses(color);
  }, [color])

  return (
    <span data-gtm-id={dataGtmId} onClick={onClick} className={`${gtmClick ? CLICK_CLASS : ''} ${gtmSectionView ? SECTION_VIEW_CLASS : ''} cursor-pointer inline-block font-headings text-sm italic px-2 rounded-lg ${computedColorClasses} ${className}`}>
      {children}
    </span>
  )
};