import { Divider } from "./Divider";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a horizontal divider', async () => {
  const { asFragment } = render(
    <Divider orientation="horizontal"/>
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders a vertical divider', async () => {
  const { asFragment } = render(
    <Divider />
  );

  expect(asFragment()).toMatchSnapshot();
});