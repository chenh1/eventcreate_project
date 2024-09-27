import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Box } from '../Box/Box';

export type AccordionBoxProps = {
  className?: string;
  padding?: 'sm' | 'md' | 'lg'; // Adjust these values based on your padding options
  label: ReactNode;
  children?: ReactNode;
  iconHide?: ReactNode;
  iconShow?: ReactNode;
}

export const AccordionBox: React.FC<AccordionBoxProps> = ({
  className = "",
  padding = "sm",
  label,
  children,
  iconHide,
  iconShow
}) => {
  const [showContent, setShowContent] = useState(false);
  const [hiddenMaxHeightClass, setHiddenMaxHeightClass] = useState("0"); // [px
  const labelBarRef = useRef<HTMLDivElement | null>(null);

  const toggleShowContent = () => {
    if (labelBarRef.current) {
      if (showContent) {
        setHiddenMaxHeightClass(`max-h-[${labelBarRef.current.offsetHeight}px]`);
      } else {
        setHiddenMaxHeightClass(`max-h-full`);
      }
    }
    setShowContent(!showContent);
  };

  useEffect(() => {
    if (labelBarRef.current) {
      setHiddenMaxHeightClass(`max-h-[${labelBarRef.current.offsetHeight}px]`);
    }
  }, []);

  return (
    <Box padding={padding} hasShadow isRounded className={`${className} box-content duration-300 ease-in-out ${hiddenMaxHeightClass}`}>
      <div data-testid="accordionLabelClick" ref={labelBarRef} className="cursor-pointer" onClick={toggleShowContent}>
        {label}
        {showContent ? iconHide : iconShow}
      </div>
      <div className={`relative overflow-hidden duration-300 ease-in-out ${showContent ? 'h-full' : 'h-0'}`}>
        <div className={`duration-300 ease-in-out ${showContent ? 'translate-y-0' : '-translate-y-full'}`}>
          {children}
        </div>
      </div>
    </Box>
  );
};