import React from 'react';

export type SectionProps = {
  className?: string;
  fullBleed?: boolean;
  addNavSpace?: boolean;
  heightClass?: string;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  className = "",
  fullBleed = false,
  addNavSpace = false,
  heightClass = "py-24",
  children
}) => {
  return (
    <div 
      className={`flex border-box justify-around w-full ${addNavSpace ? 'pt-48 pb-24' : heightClass} ${className}`}
    >
      <div className={`w-full ${fullBleed ? '' : 'max-w-7xl'} px-4 xl:px-0`}>
        {children}
      </div>
    </div>
  );
};
