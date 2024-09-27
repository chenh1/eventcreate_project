"use client";

import { getTextColorClass, getBorderColorClass } from '../../constants/colors';
import type { CoreColors } from '../../constants/colors';
import React, { useMemo, useState, useEffect, ChangeEvent } from 'react';
import { CLICK_CLASS, SECTION_VIEW_CLASS } from '../../constants/tagging';

interface Data {
  value: string;
  label: string;
}

export type RadioSetProps = {
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onCheck?: (string) => void;
  useLabelPlaceholder?: boolean;
  disabled?: boolean;
  iconAlign?: 'left' | 'right';
  isError?: boolean;
  isConfirmed?: boolean;
  isInlineBlock?: boolean;
  name?: string;
  initialValue?: string;
  highlightColor?: CoreColors;
  fullWidth?: boolean;
  gtmClick?: boolean;
  gtmSectionView?: boolean;
  dataGtmId?: string;
  data: Data[]
}

export const RadioSet: React.FC<RadioSetProps> = ({ name = "radio-set", data, highlightColor = "hyper-red", initialValue, onCheck, gtmClick, gtmSectionView, dataGtmId }) => {
  const [ checkedValue, setCheckedValue ] = useState<string>("");
  const [ initialValueChecked, setInitialValueChecked ] = useState(false);

  const computedTextColorClass = useMemo(() => {
    return getTextColorClass(highlightColor);
  }, [highlightColor])

  const computedBorderColorClass = useMemo(() => {
    return getBorderColorClass(highlightColor);
  }, [highlightColor])
  
  return (
    <>
      {data.map((item, index) => {
        const [ isChecked, setIsChecked ] = useState(false);

        useEffect(() => {
          if (initialValue === item.value && !initialValueChecked) {
            setCheckedValue(initialValue);
            setInitialValueChecked(true);
          }
        }, [ initialValue, initialValueChecked ])
        
        useEffect(() => {
          if (checkedValue == item.value) {
            setIsChecked(true);
          } else {
            setIsChecked(false);
          }
        }, [ checkedValue, setCheckedValue ])

        const id = `${item.value}_${index}`;
        return (
          <div key={id}>
            <input data-gtm-id={dataGtmId} key={index} value={item.value} name={name} onChange={e => { setCheckedValue(e.target.value); onCheck && onCheck(e.target.value) }} id={id} type='radio' className={`${gtmClick ? CLICK_CLASS : ''} ${gtmSectionView ? SECTION_VIEW_CLASS : ''} h-0 w-0`}/>
            <label data-gtm-id={dataGtmId} htmlFor={id} className={`${gtmClick ? CLICK_CLASS : ''} ${gtmSectionView ? SECTION_VIEW_CLASS : ''} font-body relative flex my-[.6em] items-center text-night-black dark:text-max-white transition-colors duration-[250ms] ease-[cubic-bezier(.4,.0,.23,1)]`}>
            {/* <span className={`flex rounded-full justify-center items-center mr-[.9em] w-[1.1em] h-[1.1em] bg-transparent border-2 border-solid cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(.4,.0,.23,1)] ${isChecked ? `border-[.55em] border-solid ${computedBorderColorClass} animate-shrinkbounce before:content-[""] before:min-w-[7px] before:min-h-[14px] before:absolute before:top-[.7em] before:left-[.4em] before:border-r-[3px] before:border-b-[3px] before:border-solid before:border-transparent before:rotate-45 before:origin-[0% 100%] before:animate-check` : 'border-night-black dark:border-max-white'}`}></span> */}
              <span className={`pointer-events-none flex rounded-full justify-center items-center mr-[.9em] w-[1.1em] h-[1.1em] bg-transparent border-2 border-solid cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(.4,.0,.23,1)] before:content-[""] before:duration-300 before:origin-[0% 100%] before:w-[8px] before:h-[8px] before:absolute before:top-[0.49em] before:left-[0.3em] before:bg-night-black before:rounded-full before:scale-0 before:delay-300 ${isChecked ? `border-[.55em] border-solid ${computedBorderColorClass} animate-shrinkbounce before:scale-100` : 'border-night-black dark:border-max-white'}`}></span>
              <span className={`pointer-events-none duration-500 ${isChecked ? 'opacity-0' : 'opacity-1'}`}>
                {item.label}
              </span>
              <ins className={`pointer-events-none absolute block bottom-0 left-[2em] h-0 w-full overflow-hidden no-underline transition-[height] duration-300 ease-[cubic-bezier(.4,.0,.23,1)] ${isChecked ? 'h-full' : ''}`}>
                <i className={`pointer-events-none absolute bottom-0 not-italic ${computedTextColorClass}`}>{item.label}</i>
              </ins>
            </label>
          </div>
        )
      })}
    </>
  )
};