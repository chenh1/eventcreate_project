import { SpanLink } from "./SpanLink";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a black span text link', async () => {
  const { asFragment } = render(
    <SpanLink uncolored={true}>Click here to go somewhere</SpanLink>
  );

  expect(asFragment()).toMatchSnapshot();
});


it('renders a traditional blue text link', async () => {
  const { asFragment } = render(
    <SpanLink>Click here to go somewhere</SpanLink>
  );

  expect(asFragment()).toMatchSnapshot();
});
