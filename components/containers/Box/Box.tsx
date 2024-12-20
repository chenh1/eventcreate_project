import type { IncrementKeys } from '@/components/constants/types';
import React, { useMemo, ReactNode } from 'react';
import getPaddingClass from '../../utils/getPaddingClass';
import getGapSizeClasses from '../../utils/getGapSizeClasses';

export type BoxProps = {
  className?: string;
  gap?: IncrementKeys;
  padding?: IncrementKeys;
  isRounded?: boolean;
  hasShadow?: boolean;
  children?: ReactNode;
  onClick?: (any) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

const getRoundedBorder = (isRounded?: boolean): string =>
  isRounded ? 'rounded-md' : '';

const getBoxShadowClass = (hasShadow?: boolean): string =>
  hasShadow ? 'shadow-lg' : '';

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(({
  className = '',
  gap = 'sm',
  padding = "0",
  isRounded,
  hasShadow,
  children,
  ...props
}, ref) => {
  const computedGapClass = useMemo(() => {
    const gapSizeClasses = getGapSizeClasses(gap);
    const roundedBorderClass = getRoundedBorder(isRounded);
    const boxShadowClass = getBoxShadowClass(hasShadow);
    const paddingClass = getPaddingClass(padding);
    return [roundedBorderClass, gapSizeClasses, boxShadowClass, paddingClass].join(' ');
  }, [gap, isRounded, hasShadow, padding]);

  return (
    <div
      ref={ref}
      className={`grid ${computedGapClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
