import { FadeScroller } from "./FadeScroller";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a fade scroller', async () => {
  const { getByTestId, asFragment } = render(
    <FadeScroller orientation="horizontal">
      <p>Some paragraph</p>
    </FadeScroller>
  );

  expect(asFragment()).toMatchSnapshot();
});
