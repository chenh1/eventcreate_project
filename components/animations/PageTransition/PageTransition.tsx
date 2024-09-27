'use client'

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from "next/navigation";
import { Heading } from '../../core/Heading/Heading';

const useNavigationEvent = (onPathnameChange) => {
  const pathname = usePathname(); // Get current route

  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    // If REF has been changed, do the stuff
    if (savedPathNameRef.current !== pathname) {
      onPathnameChange();
      // Update REF
      savedPathNameRef.current = pathname;
    }
  }, [pathname, onPathnameChange]);
};

export const PageTransition: React.FC<{}> = () => {
  const [ startTransition, setStartTransition ] = useState(false);
  //useNavigationEvent(() => setStartTransition(true));

  useEffect(() => {
    //if (startTransition) setTimeout(() => setStartTransition(false), 5000)
  }, [startTransition, setStartTransition])

  return startTransition ?
    <div className="fixed w-screen h-screen bg-apex-blue opacity-50 place-items-center">
      <Heading type="h4">TRANSITIONING</Heading>
    </div>
    : <></>
};