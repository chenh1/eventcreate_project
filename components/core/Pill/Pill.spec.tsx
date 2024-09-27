import { Pill } from "./Pill";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a pill element', async () => {
  const { asFragment } = render(
    <Pill>Category A</Pill>
  );

  expect(asFragment()).toMatchSnapshot();
});
