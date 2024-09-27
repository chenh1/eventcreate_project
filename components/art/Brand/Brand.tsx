"use client";
import React from "react";
import './brand.css';

interface BrandProps {
  mono?: boolean; 
}

export const Brand: React.FC<BrandProps> = ({ mono = false }) => {
  return (
    <div className={`brand ${mono ? 'mono' : ''} font-brand text-5xl`}>
      <span className="">ba</span>
      <span className="segment-2">yba</span>
      <span className="segment-3">r</span>
      <span className="segment-4">oo</span>
    </div>
  );
};