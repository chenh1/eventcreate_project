import { VideoPlayer } from "./VideoPlayer";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders responsive react video player', async () => {
  const { asFragment } = render(
    <VideoPlayer isResponsive={true} />
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders react video player', async () => {
  const { asFragment } = render(
    <VideoPlayer isResponsive={false} />
  );

  expect(asFragment()).toMatchSnapshot();
});
