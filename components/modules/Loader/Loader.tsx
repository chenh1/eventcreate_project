import React from "react"
import { Box } from "../../containers/Box/Box";
import './loader.css'

interface LoaderProps {
  width?: number;
  height?: number;
}

export const Loader: React.FC<LoaderProps> = ({ width = 256, height = 256 }: LoaderProps) => {
  const baseUrl = process.env.STATIC_URL || 'https://biz-web-client-demo-static.s3.us-east-2.amazonaws.com'
  return (
    <Box padding="0" className="slow-spin justify-center">
      <img src={`${baseUrl}/biz-web-client-demobloommono_ba249abb01.png`} width={width} height={height} alt="Logo icon"/>
    </Box>
  )
}