'use-client'
import React from "react"
import ReactPlayer from "react-player"

export type VideoPlayerType = {
  isResponsive: boolean;
  width?: `${number}px`;
  height?: `${number}px`;
  url?: string;
  onEnded?: () => void;
  controls?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerType> = ({ isResponsive, width = '640px', height = '360px', ...props }) => {
  return isResponsive 
  ? <div className="w-full relative pt-[56.25%]">
      <ReactPlayer className={`absolute top-0 left-0`} width={isResponsive ? '100%' : width} height={isResponsive ? '100%' : height} {...props}/>  
    </div>
  : <ReactPlayer {...props}/> 
}