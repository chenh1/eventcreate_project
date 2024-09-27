import { ParallaxContainer } from "./ParallaxContainer";
import { render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

it('slides with a parallax effect', async () => {
  const { getByTestId, asFragment } = render(
    <ParallaxContainer>
      <p>Parallax</p>
    </ParallaxContainer>
  );

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});