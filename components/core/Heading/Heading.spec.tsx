import { Heading } from "./Heading";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders an h1 tag', async () => {
  const { asFragment } = render(
    <Heading type="h1"/>
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders an h1 with fontSizeClass overriding base h1 styles', async () => {
  const { asFragment } = render(
    <Heading type="h1" fontSizeClass="some-class"/>
  );

  expect(asFragment()).toMatchSnapshot();
});
