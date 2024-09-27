import { Box } from "./Box";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a box wrapper', async () => {
  const { getByTestId, asFragment } = render(
    <Box gap="md" padding="lg" isRounded hasShadow />
  );

  expect(asFragment()).toMatchSnapshot();
});
