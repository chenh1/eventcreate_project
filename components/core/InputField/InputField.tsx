"use client";

import { getBorderColorClass } from '../../constants/colors';
import type { CoreColors } from '../../constants/colors';
import React, { useMemo, useState, ChangeEvent } from 'react';
import type { UseFormRegister, FieldValues } from 'react-hook-form';

export type InputFieldProps = {
  id?: string;
  value?: string;
  dataCy?: string;
  "data-testid"?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  iconAlign?: 'left' | 'right';
  isError?: boolean;
  isConfirmed?: boolean;
  isInlineBlock?: boolean;
  name: string;
  highlightColor?: CoreColors;
  type?: "text" | "password" | "number" | "email";
  fullWidth?: boolean;
  className?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({
  dataCy,
  id,
  placeholder,
  disabled,
  iconAlign,
  isError,
  isConfirmed,
  isInlineBlock,
  name,
  highlightColor = "max-white",
  type,
  fullWidth,
  onBlur,
  ...props
}, ref: React.ForwardedRef<HTMLInputElement>) => {
  const [ isFocused, setIsFocused ] = useState<boolean>(false);
  const [ inputVal, setInputVal ] = useState<string>('');

  const computedBorderColorClass = useMemo(() => getBorderColorClass(highlightColor), [highlightColor])
  const computedWidthClass = useMemo(() => (fullWidth ? 'w-full' : ''), [fullWidth]);

  return (
    <div className={`relative ${isInlineBlock ? 'inline-block' : ''}`}>
      <label 
        htmlFor={name} 
        className={`pointer-events-none font-headings duration-300 absolute block text-md font-light -top-5 text-sm text-max-white`}
      >
        {placeholder}
      </label>
      <input 
        data-cy={dataCy}
        disabled={disabled}
        onChange={(e) => setInputVal(e.target.value)} 
        onFocus={() => {
          console.log("FOCIUSED")
          setIsFocused(true)} 
        }
        onBlur={(e) => {
          console.log("BLURRING")
          onBlur && onBlur(e)
          setIsFocused(false)} 
        }
        id={id}
        name={name} 
        type={type}
        className={`max-w-full ${computedWidthClass} text-night-black-100 dark:text-max-white font-headings bg-transparent border-b-2 focus:outline-none ${isFocused || inputVal !== '' ? `${computedBorderColorClass}` : 'border-night-black-100 dark:border-max-white'}`}
        ref={ref}
        {...props}
      />
      {isError && <div className={`absolute pointer-events-none ${iconAlign === 'right' ? 'right-0' : 'left-0'} top-0 -translate-x-full`}>&#10060;</div>}
      {isConfirmed && <div className={`absolute pointer-events-none ${iconAlign === 'right' ? 'right-0' : 'left-0'} top-0 -translate-x-full`}>&#x2705;</div>}
    </div>
  )
});

export default InputField