import React from 'react';
import { render } from '@testing-library/react';
import { DragAndDropWrapper } from './DragAndDropWrapper';
import useDragAndDrop from './useDragAndDrop';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock('./useDragAndDrop');

describe('DragAndDropWrapper', () => {
  const mockUseDragDrop = useDragAndDrop as jest.MockedFunction<typeof useDragAndDrop>;

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test('should call onStartDragging when dragging starts', () => {
    const onStartDragging = jest.fn();
    const onStopDragging = jest.fn();
    
    mockUseDragDrop.mockReturnValue({
      isDragging: true,
      isTouchDragging: false,
      mobileEventDetected: false,
      position: { x: 100, y: 200 },
      draggableRef: React.createRef(),
      firstClick: true,
    });

    render(
      <DragAndDropWrapper
        onStartDragging={onStartDragging}
        onStopDragging={onStopDragging}
      >
        <div>Test Child</div>
      </DragAndDropWrapper>
    );

    expect(onStartDragging).toHaveBeenCalledWith({
      isDragging: true,
      isTouchDragging: false,
      mobileEventDetected: false,
      position: { x: 100, y: 200 },
    });
  });

  test('should call onStopDragging when dragging stops', () => {
    const onStartDragging = jest.fn();
    const onStopDragging = jest.fn();

    mockUseDragDrop.mockReturnValue({
      isDragging: false,
      isTouchDragging: false,
      mobileEventDetected: false,
      position: { x: 100, y: 200 },
      draggableRef: React.createRef(),
      firstClick: true,
    });

    render(
      <DragAndDropWrapper
        onStartDragging={onStartDragging}
        onStopDragging={onStopDragging}
      >
        <div>Test Child</div>
      </DragAndDropWrapper>
    );

    expect(onStopDragging).toHaveBeenCalledWith({
      isDragging: false,
      isTouchDragging: false,
      mobileEventDetected: false,
      position: { x: 100, y: 200 },
    });
  });
});
