import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { Box } from '../Box/Box';
import { Popup } from '../../animations/Popup/Popup';

export type OverlayProps = {
  noDimmer?: boolean;
  className?: string;
  wrapperClassName?: string;
  visibility: boolean;
  toggleVisibility: (visibility: boolean) => void;
  noPopup?: boolean;
  shouldDisableBodyScroll?: boolean;
  children?: React.ReactNode;
}

export const Overlay: React.FC<OverlayProps> = ({
  noDimmer = false,
  className = "",
  wrapperClassName = "",
  visibility,
  toggleVisibility,
  noPopup = false,
  shouldDisableBodyScroll = true,
  children
}) => {
  const [animatingIn, setAnimatingIn] = useState<boolean>(false);

  useEffect(() => {
    if (visibility) {
      setAnimatingIn(true);
    }
  }, [visibility]);

  const throttledOffVisibility = () => {
    document.body.style.overflow = 'auto';
    setAnimatingIn(false);
    setTimeout(() => {
      toggleVisibility(false);
    }, 300);
  };

  useEffect(() => {
    if (shouldDisableBodyScroll) {
      document.body.style.overflow = visibility ? 'hidden' : 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visibility, shouldDisableBodyScroll]);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      throttledOffVisibility();
    }
  };

  return visibility ? (
    <div
      data-testid="overlayBg"
      onClick={handleOverlayClick}
      className={`z-[10000] duration-300 ease-in-out ${visibility && animatingIn ? 'opacity-100' : 'opacity-0'} fixed grid place-items-center left-0 top-0 w-screen h-screen ${noDimmer ? '' : 'bg-[rgba(0,0,0,0.5)]'}`}
    >
      <Popup disable={noPopup} className={wrapperClassName}>
        <Box hasShadow isRounded className={`bg-max-white dark:bg-night-black ${className}`}>
          {children}
        </Box>
      </Popup>
    </div>
  ) : null;
};
