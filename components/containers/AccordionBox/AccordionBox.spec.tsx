import { AccordionBox } from "./AccordionBox";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders closed accordion', async () => {
  const { getByTestId, asFragment } = render(
    <AccordionBox label={<h3>Label</h3>} />
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders opened accordion once label is clicked', async () => {
  const { getByTestId, asFragment } = render(
    <AccordionBox label={<h3>Label</h3>} />
  );

  fireEvent.click(getByTestId("accordionLabelClick"))

  expect(asFragment()).toMatchSnapshot();
});