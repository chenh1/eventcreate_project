import { AccordionDivider } from "./AccordionDivider";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders the accordion divider', async () => {
  const { getByTestId, asFragment } = render(
    <AccordionDivider label={<h3>Label</h3>} />
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders opened accordion divider once label is clicked', async () => {
  const { getByTestId, asFragment } = render(
    <AccordionDivider label={<h3>Label</h3>} />
  );

  fireEvent.click(getByTestId("accordionLabelClick"))

  expect(asFragment()).toMatchSnapshot();
});