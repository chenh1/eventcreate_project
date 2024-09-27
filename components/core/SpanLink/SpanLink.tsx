import type { GtmSet } from '../../constants/tagging';
import React, { useMemo } from 'react';
import { CLICK_CLASS, SECTION_VIEW_CLASS } from '../../constants/tagging';

const getClasses = (uncolored: boolean): `text-${string}` => {
  if (uncolored) {
    return "text-night-black dark:text-max-white"
  }

  return "text-apex-blue"
}

export type SpanLinkType = {
  uncolored?: boolean,
  children?: string | JSX.Element | JSX.Element[], 
} & GtmSet

export const SpanLink: React.FC<SpanLinkType> = ({ uncolored=false, gtmClick, gtmSectionView, dataGtmId, children }) => {
  const computedClasses = useMemo(() => {
    return getClasses(uncolored);
  }, [uncolored]);

  return (
    <span data-gtm-id={dataGtmId} className={`${gtmClick ? CLICK_CLASS : ''} ${gtmSectionView ? SECTION_VIEW_CLASS : ''} relative cursor-pointer font-body ${computedClasses} before:content-[""] before:absolute before:translate-y-[6px] before:bottom-0 before:duration-300 before:ease-in-out before:border-apex-blue before:w-0 before:border-2 before:opacity-0 hover:brightness-110 hover:before:w-full hover:before:opacity-100`}>
      {children}
    </span>
  )
};