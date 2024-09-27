import { Overlay } from "./Overlay";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

const observe = jest.fn();
const unobserve = jest.fn();

// you can also pass the mock implementation
// to jest.fn as an argument
global.IntersectionObserver = jest.fn(function (callback, options) {
  return {
    observe,
    unobserve,
    root: null,
    rootMargin: '',
    thresholds: [],
    disconnect: jest.fn(),
    takeRecords: jest.fn(),
  };
});


it('renders an overlay wrapper', async () => {
  const { getByTestId, asFragment } = render(
    <Overlay visibility={true} toggleVisibility={() => {}}>
      <p>Some paragraph</p>
    </Overlay>
  );

  expect(asFragment()).toMatchSnapshot();
});


it('closes the overlay if bg is clicked', async () => {
  const { getByTestId, asFragment } = render(
    <Overlay visibility={true} toggleVisibility={() => {}}>
      <p>Some paragraph</p>
    </Overlay>
  );

  fireEvent.click(getByTestId("overlayBg"))

  expect(asFragment()).toMatchSnapshot();
});

