"use client";

import { getTextColorClass, getBorderColorClass } from '../../constants/colors';
import type { CoreColors } from '../../constants/colors';
import React, { useMemo, useState, ChangeEvent } from 'react';
import { CLICK_CLASS, SECTION_VIEW_CLASS } from '../../constants/tagging';

export type InputTextProps = {
  id?: string;
  dataCy?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  iconAlign?: 'left' | 'right';
  isError?: boolean;
  isConfirmed?: boolean;
  isInlineBlock?: boolean;
  name?: string;
  highlightColor?: CoreColors;
  password?: boolean;
  fullWidth?: boolean;
  gtmClick?: boolean;
  gtmSectionView?: boolean;
  dataGtmId?: string;
  className?: string;
}

export const InputText: React.FC<InputTextProps> = ({ dataCy, placeholder, disabled, iconAlign, isError, isConfirmed, isInlineBlock, name, highlightColor = "hyper-red", password, fullWidth, gtmClick, gtmSectionView, dataGtmId }) => {
  const [ isFocused, setIsFocused ] = useState<boolean>(false);
  const [ inputVal, setInputVal ] = useState<string>('');

  const computedTextColorClass = useMemo(() => getTextColorClass(highlightColor), [highlightColor])
  const computedBorderColorClass = useMemo(() => getBorderColorClass(highlightColor), [highlightColor])
  const computedWidthClass = useMemo(() => (fullWidth ? 'w-full' : ''), [fullWidth]);
  
  return (
    <div className={`relative ${isInlineBlock ? 'inline-block' : ''}`}>
      <label 
        data-gtm-id={dataGtmId}
        htmlFor={name} 
        className={`${gtmClick ? CLICK_CLASS : ''} ${gtmSectionView ? SECTION_VIEW_CLASS : ''} pointer-events-none font-body duration-300 absolute block text-md font-light ${isFocused ? `${computedTextColorClass} -top-5 text-sm` : `${inputVal === '' ? 'text-night-black dark:text-max-white top-0 left-0' : `${computedTextColorClass} -top-5 text-sm`} `} `}
      >
        {placeholder}
      </label>
      <input 
        data-cy={dataCy}
        data-gtm-id={dataGtmId}
        disabled={disabled}
        onChange={(e) => setInputVal(e.target.value)} 
        onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)} 
        name={name} 
        type={password ? "password" : "text"}
        className={`${gtmClick ? CLICK_CLASS : ''} ${gtmSectionView ? SECTION_VIEW_CLASS : ''} max-w-full ${computedWidthClass} text-night-black dark:text-max-white font-body bg-transparent border-b-2 focus:outline-none ${isFocused || inputVal !== '' ? `${computedBorderColorClass}` : 'border-night-black dark:border-max-white'}`}
      />
      {isError && <div className={`absolute pointer-events-none ${iconAlign === 'right' ? 'right-0' : 'left-0'} top-0 -translate-x-full`}>&#10060;</div>}
      {isConfirmed && <div className={`absolute pointer-events-none ${iconAlign === 'right' ? 'right-0' : 'left-0'} top-0 -translate-x-full`}>&#x2705;</div>}
    </div>
  )
};