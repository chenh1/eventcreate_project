"use client";

import { getTextColorClass, getBorderColorClass } from '../../constants/colors';
import type { CoreColors } from '../../constants/colors';
import React, { useMemo, useState, ChangeEvent } from 'react';
import { CLICK_CLASS, SECTION_VIEW_CLASS } from '../../constants/tagging';

interface Option {
  value: string;
  label: string;
  isPlaceholder?: boolean;
}

export type DropdownProps = {
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  useLabelPlaceholder?: boolean;
  options: Option[];
  disabled?: boolean;
  iconAlign?: 'left' | 'right';
  isError?: boolean;
  isConfirmed?: boolean;
  isInlineBlock?: boolean;
  name?: string;
  highlightColor?: CoreColors;
  fullWidth?: boolean;
  gtmClick?: boolean;
  gtmSectionView?: boolean;
  dataGtmId?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  onChange = () => {},
  useLabelPlaceholder,
  options,
  disabled,
  iconAlign,
  isError,
  isConfirmed,
  isInlineBlock,
  name,
  highlightColor = 'hyper-red',
  fullWidth,
  gtmClick,
  gtmSectionView,
  dataGtmId
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const computedTextColorClass = useMemo(() => getTextColorClass(highlightColor), [highlightColor]);
  const computedBorderColorClass = useMemo(() => getBorderColorClass(highlightColor), [highlightColor]);
  const computedWidthClass = useMemo(() => (fullWidth ? 'w-full' : ''), [fullWidth]);

  const placeholder = options.find(option => option.isPlaceholder)?.label || 'Select an option';

  return (
    <div className={`relative ${isInlineBlock ? 'inline-block' : ''}`}>
      {useLabelPlaceholder &&
        <label 
          data-gtm-id={dataGtmId}
          htmlFor={name} 
          className={`${gtmClick ? CLICK_CLASS : ''} ${gtmSectionView ? SECTION_VIEW_CLASS : ''} pointer-events-none font-body duration-300 absolute block text-md font-medium ${computedTextColorClass} -top-5 text-sm`}
        >
          {placeholder}
        </label>
      }
      <select 
        data-gtm-id={dataGtmId}
        disabled={disabled}
        onChange={onChange} 
        onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)} 
        name={name} 
        className={`${gtmClick ? CLICK_CLASS : ''} ${gtmSectionView ? SECTION_VIEW_CLASS : ''} max-w-full ${computedWidthClass} text-night-black dark:text-max-white font-body bg-transparent border-b-2 focus:outline-none ${isFocused ? computedBorderColorClass : 'border-night-black dark:border-max-white'}`}
      >
        {options.map((option, i) => (
          <option disabled={option.isPlaceholder} key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isError && <div className={`pointer-events-none absolute ${iconAlign === 'right' ? 'right-0' : 'left-0'} top-0 -translate-x-full`}>&#10060;</div>}
      {isConfirmed && <div className={`pointer-events-none absolute ${iconAlign === 'right' ? 'right-0' : 'left-0'} top-0 -translate-x-full`}>&#x2705;</div>}
    </div>
  );
};
