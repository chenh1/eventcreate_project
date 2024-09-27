'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './flowerBloomGround.css';

// Type definition for the component props (if any)
// In this case, the component has no props, so we leave it empty
interface FlowerBloomGroundProps { }

export const FlowerBloomGround: React.FC<FlowerBloomGroundProps> = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const isInViewRef = useRef<boolean>(isInView);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const toggleIsInView = (bool: boolean): void => {
    setIsInView(bool);
    isInViewRef.current = bool;
  }

  // Assuming `useIntersectionObserver` returns a ref
  const moduleRef = useIntersectionObserver({
    inViewCallback: () => {
      toggleIsInView(true);
    },
    leaveViewCallback: () => {
      toggleIsInView(false);
    }
  });

  useEffect(() => {
    if (isInViewRef.current) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsLoaded(false);
    }
  }, [isInViewRef.current]);

  return (
    <div ref={moduleRef} className={`scene ${isLoaded ? '' : 'not-loaded'}`}>
      <div className="space-above-ground xl:justify-center">
        <div className="centering-scene relative">
          {/* tall grass */}
          <div className="blade-shading grass-blade grass-blade-0 right-face"></div>
          <div className="grass-blade grass-blade-0 right-face"></div>

          <div className="blade-shading grass-blade slow grass-blade-1 left-face"></div>
          <div className="grass-blade slow grass-blade-1 left-face"></div>

          <div className="blade-shading grass-blade grass-blade-2 right-face"></div>
          <div className="grass-blade grass-blade-2 right-face"></div>

          <div className="blade-shading grass-blade fast grass-blade-3 left-face"></div>
          <div className="grass-blade fast grass-blade-3 left-face"></div>

          <div className="blade-shading grass-blade fast grass-blade-4 right-face"></div>
          <div className="grass-blade fast grass-blade-4 right-face"></div>

          <div className="blade-shading grass-blade slow grass-blade-5 left-face"></div>
          <div className="grass-blade slow grass-blade-5 left-face"></div>

          <div className="blade-shading grass-blade grass-blade-6 left-face"></div>
          <div className="grass-blade grass-blade-6 left-face"></div>

          <div className="blade-shading grass-blade slow grass-blade-7 right-face"></div>
          <div className="grass-blade slow grass-blade-7 right-face"></div>

          <div className="blade-shading grass-blade grass-blade-8 left-face"></div>
          <div className="grass-blade grass-blade-8 left-face"></div>

          <div className="blade-shading grass-blade fast grass-blade-9 right-face"></div>
          <div className="grass-blade fast grass-blade-9 right-face"></div>

          <div className="blade-shading grass-blade slow grass-blade-10 right-face"></div>
          <div className="grass-blade slow grass-blade-10 right-face"></div>

          <div className="blade-shading grass-blade grass-blade-11 left-face"></div>
          <div className="grass-blade grass-blade-11 left-face"></div>

          <div className="blade-shading grass-blade fast grass-blade-12 right-face"></div>
          <div className="grass-blade fast grass-blade-12 right-face"></div>

          <div className="blade-shading grass-blade grass-blade-13 left-face"></div>
          <div className="grass-blade grass-blade-13 left-face"></div>

          <div className="blade-shading grass-blade slow grass-blade-14 right-face"></div>
          <div className="grass-blade slow grass-blade-14 right-face"></div>

          <div className="blade-shading grass-blade grass-blade-15 left-face"></div>
          <div className="grass-blade grass-blade-15 left-face"></div>

          <div className="blade-shading grass-blade fast grass-blade-16 right-face"></div>
          <div className="grass-blade fast grass-blade-16 right-face"></div>

          <div className="blade-shading grass-blade grass-blade-17 left-face"></div>
          <div className="grass-blade grass-blade-17 left-face"></div>

          <div className="blade-shading grass-blade slow grass-blade-18 right-face"></div>
          <div className="grass-blade slow grass-blade-18 right-face"></div>

          <div className="blade-shading grass-blade grass-blade-19 left-face"></div>
          <div className="grass-blade grass-blade-19 left-face"></div>

          <div className="blade-shading grass-blade fast grass-blade-20 right-face"></div>
          <div className="grass-blade fast grass-blade-20 right-face"></div>

          {/* flower */}
          <div
            className="flower"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`flower-glow ${isLoaded ? 'glow-bloomed' : ''}`}></div>
            <div className={`flower-glow ${isLoaded ? 'glow-bloomed-2' : ''}`}></div>

            <div className="flower-leaf-wrapper">
              <div className="flower-leaf-stem stem-left"></div>
              <div className="flower-leaf shading"></div>
              <div className="flower-leaf"></div>
            </div>

            <div className="flower-leaf-wrapper leaf-wrapper-2">
              <div className="flower-leaf-stem stem-left"></div>
              <div className="flower-leaf shading"></div>
              <div className="flower-leaf"></div>
            </div>

            <div className="flower-stem"></div>
            <div className="flower-stem-shading"></div>

            <div className="flower-head">
              <div className={`${isInView && !isLoaded ? 'bloom-wrap-4' : ''} ${isLoaded && isHovered ? 'bloom-wrap-4-hover' : ''}`}>
                <div className="petal-wrapper wrapper-4">
                  <div className="flower-petal flower-petal-4"></div>
                  <div className="flower-petal flower-petal-4 petal-shading"></div>
                </div>
              </div>
              <div className={`${isInView && !isLoaded ? 'bloom-wrap-3' : ''} ${isLoaded && isHovered ? 'bloom-wrap-3-hover' : ''}`}>
                <div className="petal-wrapper wrapper-3">
                  <div className="flower-petal flower-petal-3"></div>
                  <div className="flower-petal flower-petal-3 petal-shading"></div>
                </div>
              </div>

              <div className={`flower-center ${isLoaded ? 'center-bloomed' : ''}`}></div>

              <div className={`${isInView && !isLoaded ? 'bloom-wrap-2' : ''} ${isLoaded && isHovered ? 'bloom-wrap-2-hover' : ''}`}>
                <div className="petal-wrapper wrapper-2">
                  <div className="flower-petal flower-petal-2"></div>
                  <div className="flower-petal flower-petal-2 petal-shading"></div>
                </div>
              </div>

              <div className={`${isInView && !isLoaded ? 'bloom-wrap-1' : ''} ${isLoaded && isHovered ? 'bloom-wrap-1-hover' : ''}`}>
                <div className="petal-wrapper wrapper-1">
                  <div className="flower-petal flower-petal-1"></div>
                  <div className="flower-petal flower-petal-1 petal-shading"></div>
                </div>
              </div>

              <div className={`${isInView && !isLoaded ? 'bloom-wrap-0' : ''} ${isLoaded && isHovered ? 'bloom-wrap-0-hover' : ''}`}>
                <div className="petal-wrapper wrapper-0">
                  <div className="flower-petal flower-petal-0"></div>
                  <div className="flower-petal flower-petal-0 petal-shading"></div>
                </div>
              </div>

              <div className={`${isInView && !isLoaded ? 'head-bloom' : ''}`}>
                <div className="flower-head-base-wrapper flower-head-base-wrapper-0">
                  <div className="flower-head-base flower-head-base-0"></div>
                  <div className="flower-head-base-detail flower-head-base-0-detail"></div>
                  
                </div>
                
                <div className="flower-head-base-wrapper flower-head-base-wrapper-1">
                  <div className="flower-head-base flower-head-base-1"></div>
                  <div className="flower-head-base-detail flower-head-base-1-detail"></div>
                </div>

                <div className="flower-head-base-wrapper flower-head-base-wrapper-2">
                  <div className="flower-head-base flower-head-base-2"></div>
                  <div className="flower-head-base-detail flower-head-base-2-detail"></div>
                </div>
              </div>
            </div>

            
            {/* <div className="flower-petal flower-petal-1"></div>
            <div className="flower-petal flower-petal-2"></div>
            <div className="flower-petal flower-petal-3"></div>
            <div className="flower-petal flower-petal-4"></div> */}
          </div>
        </div>
        <div className="ground-surface"></div>
      </div>
      
      <div className="ground"></div>
    </div>
  )
};