import type { IncrementKeys, PaddingValues } from '@/components/constants/types';
import React, { useMemo, RefObject, HTMLProps, ReactNode } from 'react';
import getPaddingClass from '../../utils/getPaddingClass';
import getGapSizeClasses from '../../utils/getGapSizeClasses';
import { SECTION_VIEW_CLASS } from '../../constants/tagging';

export type BoxProps = {
  innerRef?: RefObject<HTMLDivElement>; // To use with `ref` prop in React
  className?: string;
  gap?: IncrementKeys;
  padding?: IncrementKeys;
  isRounded?: boolean;
  hasShadow?: boolean;
  children?: ReactNode;
  gtmSectionView?: boolean;
  dataGtmId?: string;
  onClick?: (any) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const getRoundedBorder = (isRounded?: boolean): string =>
  isRounded ? 'rounded-md' : '';

const getBoxShadowClass = (hasShadow?: boolean): string =>
  hasShadow ? 'shadow-lg' : '';

export const Box: React.FC<BoxProps> = ({
  innerRef,
  className = '',
  gap = 'sm',
  padding = 'md',
  isRounded,
  hasShadow,
  children,
  gtmSectionView,
  dataGtmId,
  ...props
}) => {
  const computedGapClass = useMemo(() => {
    const gapSizeClasses = getGapSizeClasses(gap);
    const roundedBorderClass = getRoundedBorder(isRounded);
    const boxShadowClass = getBoxShadowClass(hasShadow);
    const paddingClass = getPaddingClass(padding);
    return [roundedBorderClass, gapSizeClasses, boxShadowClass, paddingClass].join(' ');
  }, [gap, isRounded, hasShadow, padding]);

  return (
    <div
      ref={innerRef}
      data-gtm-id={dataGtmId}
      className={`${gtmSectionView ? SECTION_VIEW_CLASS : ''} grid ${computedGapClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
