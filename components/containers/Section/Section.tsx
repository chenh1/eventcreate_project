import React from 'react';
import { SECTION_VIEW_CLASS } from '../../constants/tagging';

export type SectionProps = {
  className?: string;
  fullBleed?: boolean;
  addNavSpace?: boolean;
  heightClass?: string;
  gtmSectionView?: boolean;
  dataGtmId?: string;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  className = "",
  fullBleed = false,
  addNavSpace = false,
  heightClass = "py-24",
  gtmSectionView = false,
  dataGtmId,
  children
}) => {
  return (
    <div 
      data-gtm-id={dataGtmId} 
      className={`${gtmSectionView ? SECTION_VIEW_CLASS : ''} flex border-box justify-around w-full ${addNavSpace ? 'pt-48 pb-24' : heightClass} ${className}`}
    >
      <div className={`w-full ${fullBleed ? '' : 'max-w-7xl'} px-4 xl:px-0`}>
        {children}
      </div>
    </div>
  );
};
