import { Paragraph } from "./Paragraph";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a paragraph tag with medium size styling', async () => {
  const { asFragment } = render(
    <Paragraph size="md">Some words go here</Paragraph>
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders a paragraph tag with default size styling if size is not indicated', async () => {
  const { asFragment } = render(
    <Paragraph>Some words go here</Paragraph>
  );

  expect(asFragment()).toMatchSnapshot();
});

