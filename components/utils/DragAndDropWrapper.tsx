import React, { useEffect, ReactNode, CSSProperties, RefObject } from 'react';
import useDragAndDrop from './useDragAndDrop';

interface DragAndDropData {
  isDragging: boolean;
  isTouchDragging: boolean;
  mobileEventDetected: boolean;
  position: {
    x: number;
    y: number;
  };
}

interface DragAndDropWrapperProps {
  children: ReactNode;
  externalRef?: RefObject<HTMLElement | null>;
  className?: string;
  onStopDragging?: (data: DragAndDropData) => void;
  onStartDragging?: (data: DragAndDropData) => void;
}

export const DragAndDropWrapper: React.FC<DragAndDropWrapperProps> = ({
  children,
  externalRef,
  className = "",
  onStopDragging,
  onStartDragging,
}) => {
  const { isDragging, isTouchDragging, mobileEventDetected, position, draggableRef, firstClick } = useDragAndDrop({ externalRef: externalRef as RefObject<HTMLDivElement> });
  
  const styleProps: CSSProperties = firstClick ? { left: position.x, top: position.y, cursor: isDragging ? 'grabbing' : 'grab' } : {};

  useEffect(() => {
    if (!isDragging) {
      onStopDragging && onStopDragging({ isDragging, isTouchDragging, mobileEventDetected, position });
    } else {
      onStartDragging && onStartDragging({ isDragging, isTouchDragging, mobileEventDetected, position });
    }
  }, [isDragging, isTouchDragging, mobileEventDetected, position, onStopDragging, onStartDragging]);

  return (
    <div className={`absolute touch-none ${className}`} style={styleProps} ref={draggableRef}>
      {children}
    </div>
  );
};
