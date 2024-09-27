import type { Coords } from '../constants/types';
import { useState, useEffect, useRef, RefObject } from 'react';


interface DragAndDropProps {
  externalRef?: RefObject<HTMLDivElement>;
}

interface MouseEventWithClient extends MouseEvent {
  clientX: number;
  clientY: number;
}

interface TouchEventWithClient extends TouchEvent {
  touches: TouchList;
}

function useDragAndDrop({ externalRef }: DragAndDropProps = {}) {
  const [firstClick, setFirstClick] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isTouchDragging, setIsTouchDragging] = useState<boolean>(false);
  const [mobileEventDetected, setMobileEventDetected] = useState<boolean>(false);
  const [position, setPosition] = useState<Coords>({ x: 0, y: 0 });
  const draggableRef = externalRef ?? useRef<HTMLDivElement>(null);
  const initialPosition = useRef<Coords>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (e: MouseEventWithClient) => {
      if (draggableRef.current && draggableRef.current.contains(e.target as Node)) {
        setIsDragging(true);

        // Prevent exceeding the bounds of the window
        if (draggableRef.current) {
          let x = e.clientX - draggableRef.current.getBoundingClientRect().left;
          x = Math.max(0, Math.min(x, window.innerWidth - draggableRef.current.getBoundingClientRect().width));
        
          let y = e.clientY - draggableRef.current.getBoundingClientRect().top;
          y = Math.max(0, Math.min(y, window.innerHeight - draggableRef.current.getBoundingClientRect().height));

          initialPosition.current = { x, y };
        }
      }
    };

    const handleMouseMove = (e: MouseEventWithClient) => {
      if (isDragging) {
        if (!firstClick) {
          setFirstClick(true);
        }

        if (draggableRef.current) {
          let x = e.clientX - initialPosition.current.x;
          x = Math.max(0, Math.min(x, window.innerWidth - draggableRef.current.getBoundingClientRect().width));

          let y = e.clientY - initialPosition.current.y;
          y = Math.max(0, Math.min(y, window.innerHeight - draggableRef.current.getBoundingClientRect().height));

          setPosition({ x, y });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, firstClick]);

  // Mobile events
  useEffect(() => {
    const handleTouchStart = (e: TouchEventWithClient) => {
      if (draggableRef.current && draggableRef.current.contains(e.target as Node)) {
        setIsDragging(true);
        setMobileEventDetected(true);
        setIsTouchDragging(true);

        // Prevent exceeding the bounds of the window
        let x = e.touches[0].clientX - draggableRef.current.getBoundingClientRect().left;
        x = Math.max(0, Math.min(x, window.innerWidth - draggableRef.current.getBoundingClientRect().width));

        let y = e.touches[0].clientY - draggableRef.current.getBoundingClientRect().top;
        y = Math.max(0, Math.min(y, window.innerHeight - draggableRef.current.getBoundingClientRect().height));

        initialPosition.current = { x, y };
      }
    };

    const handleTouchMove = (e: TouchEventWithClient) => {
      if (isDragging) {
        if (!firstClick) {
          setFirstClick(true);
        }

        if (draggableRef.current) {
          let x = e.touches[0].clientX - initialPosition.current.x;
          x = Math.max(0, Math.min(x, window.innerWidth - draggableRef.current.getBoundingClientRect().width));

          let y = e.touches[0].clientY - initialPosition.current.y;
          y = Math.max(0, Math.min(y, window.innerHeight - draggableRef.current.getBoundingClientRect().height));

          setPosition({ x, y });
        }
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setIsTouchDragging(false);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, firstClick]);

  return { isDragging, isTouchDragging, mobileEventDetected, position, draggableRef, firstClick };
}

export default useDragAndDrop;
