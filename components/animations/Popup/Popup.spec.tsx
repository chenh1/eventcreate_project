import { Popup } from "./Popup";
import { render, waitFor } from '@testing-library/react';
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


it('pops up when in view', async () => {
  const { getByTestId, asFragment } = render(
    <Popup disable={false}>
      <p>Popup</p>
    </Popup>
  );

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});