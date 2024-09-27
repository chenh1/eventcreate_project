"use client"

import React, { useEffect, useContext } from "react";
import { AdContext } from "./AdProvider";
import './adContainer.css';

type AdContainerType = {
  elId: string;
  align: "center" | undefined;
}

export const AdContainer: React.FC<AdContainerType> = ({ elId = "base-ad", align = "center" }) => {
  const { adScriptsLoaded, shouldShow } = useContext<{ adScriptsLoaded: boolean; shouldShow: boolean; }>(AdContext)
  
  useEffect(() => {
    if (typeof window !== 'undefined' && adScriptsLoaded && shouldShow) {
      window.googletag.cmd.push(function() {
        window.googletag.display?.(elId);
      });
    }
  }, [ adScriptsLoaded ])

  return shouldShow
    ? <div className={`ad-wrapper ${align}`}>
        <div className="js-ad-container" id={elId}></div>
      </div>
    : null
}