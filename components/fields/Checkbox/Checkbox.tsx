"use client";

import { getTextColorClass, getBorderColorClass } from '../../constants/colors';
import type { CoreColors } from '../../constants/colors';
import React, { useMemo, useState, ChangeEvent } from 'react';
import { CLICK_CLASS, SECTION_VIEW_CLASS } from '../../constants/tagging';

export type CheckboxProps = {
  label: string | number;
  checkboxRef?: React.RefObject<HTMLInputElement>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  disabled?: boolean;
  name?: string;
  id?: string;
  highlightColor?: CoreColors;
  gtmClick?: boolean;
  gtmSectionView?: boolean;
  dataGtmId?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checkboxRef,
  onChange,
  value,
  disabled,
  name,
  id = "tempId",
  highlightColor = "hyper-red",
  gtmClick,
  gtmSectionView,
  dataGtmId
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const computedTextColorClass = useMemo(() => {
    return getTextColorClass(highlightColor);
  }, [highlightColor]);

  const computedBorderColorClass = useMemo(() => {
    return getBorderColorClass(highlightColor);
  }, [highlightColor]);

  return (
    <span className="relative">
      <input
        data-testid="checkbox"
        data-gtm-id={dataGtmId}
        ref={checkboxRef}
        value={value}
        disabled={disabled}
        name={name}
        onChange={e => {
          setIsChecked(e.target.checked);
          onChange && onChange(e);
        }}
        id={id}
        type='checkbox'
        className={`${gtmClick ? CLICK_CLASS : ''} ${gtmSectionView ? SECTION_VIEW_CLASS : ''} h-0 w-0 absolute`}
      />
      <label
        data-gtm-id={dataGtmId}
        htmlFor={id}
        className={`${gtmClick ? CLICK_CLASS : ''} ${gtmSectionView ? SECTION_VIEW_CLASS : ''} font-body relative flex my-[.6em] items-center text-night-black dark:text-max-white transition-colors duration-[250ms] ease-[cubic-bezier(.4,.0,.23,1)]`}
      >
        <span
          className={`pointer-events-none flex justify-center items-center mr-[.9em] w-[1.1em] h-[1.1em] bg-transparent border-2 border-solid rounded-sm cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(.4,.0,.23,1)] ${isChecked ? `border-[.55em] border-solid ${computedBorderColorClass} animate-shrinkbounce before:content-[""] before:min-w-[7px] before:min-h-[14px] before:absolute before:top-[.7em] before:left-[.4em] before:border-r-[3px] before:border-b-[3px] before:border-solid before:border-transparent before:rotate-45 before:origin-[0% 100%] before:animate-check` : 'border-night-black dark:border-max-white'}`}
        ></span>
        <span className={`pointer-events-none duration-500 ${isChecked ? 'opacity-0' : 'opacity-1'}`}>
          {label}
        </span>
        <ins className={`pointer-events-none absolute block bottom-0 left-[2em] h-0 w-full overflow-hidden no-underline transition-[height] duration-300 ease-[cubic-bezier(.4,.0,.23,1)] ${isChecked ? 'h-full' : ''}`}>
          <i className={`pointer-events-none absolute bottom-0 not-italic ${computedTextColorClass}`}>{label}</i>
        </ins>
      </label>
    </span>
  );
};
