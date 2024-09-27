import { Section } from "./Section";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders an overlay wrapper', async () => {
  const { getByTestId, asFragment } = render(
    <Section dataGtmId="gtm-tag">
      <p>Some paragraph</p>
    </Section>
  );

  expect(asFragment()).toMatchSnapshot();
});