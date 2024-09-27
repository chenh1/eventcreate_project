'use client';

import React, { useState } from 'react';
import { Heading } from '../../core/Heading/Heading';
import './stepsToVictory.css';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

// Define the type for the props
interface StepsToVictoryProps {
  step1?: React.ReactNode;
  step2?: React.ReactNode;
  step3?: React.ReactNode;
  className?: string;
  rendered?: boolean;
}

export const StepsToVictory: React.FC<StepsToVictoryProps> = ({ 
  step1 = <Heading type="sm:text-2xl md:text-5xl" className="text-night-black">A</Heading>, 
  step2 = <Heading type="sm:text-2xl md:text-5xl" className="text-night-black">B</Heading>, 
  step3 = <Heading type="sm:text-2xl md:text-5xl" className="text-night-black">C</Heading>, 
  className = "",
  rendered = false
}) => {
  const [isInView, setIsInView] = useState<boolean>(rendered);

  // Assuming `useIntersectionObserver` returns a ref
  const moduleRef = useIntersectionObserver({
    inViewCallback: () => {
      setIsInView(true);
    },
    leaveViewCallback: () => {
      setIsInView(false);
    }
  });

  return (
    <div ref={moduleRef} className={`victory-scene ${isInView ? 'in-view' : ''} ${className}`}>
      {isInView &&
        <>
          <div className="line vertical-line vertical-line-1"></div>
          <div className="line horizontal-line horizontal-line-1"></div>
          <div className="line vertical-line vertical-line-2"></div>
          <div className="line horizontal-line horizontal-line-2"></div>
          <div className="line vertical-line vertical-line-3"></div>

          <div className="circle circle-animated step-1">
            <div className="circle circle-nested-animated">
              <div className="circle circle-inner-animated">
                <div className="circle water-fill"></div>
                <div className="absolute">
                  {step1}
                </div>
              </div>
            </div>
          </div>

          <div className="circle circle-animated step-2">
            <div className="circle circle-nested-animated">
              <div className="circle circle-inner-animated">
                <div className="circle water-fill"></div>
                <div className="absolute">
                  {step2}
                </div>
              </div>
            </div>
          </div>

          <div className="circle circle-animated step-3">
            <div className="circle circle-nested-animated">
              <div className="circle circle-inner-animated">
                <div className="circle water-fill"></div>
                <div className="absolute">
                  {step3}
                </div>
              </div>
            </div>
          </div>

          <div className="water-drops"></div>
          <div className="water-drops two"></div>
          <div className="water-drops three"></div>
        </>
      }
    </div>
  );
};
