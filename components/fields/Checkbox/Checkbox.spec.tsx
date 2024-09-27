import { Checkbox } from "./Checkbox";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a checkbox input', async () => {
  const { asFragment } = render(
    <Checkbox label="Pizza" />
  );

  expect(asFragment()).toMatchSnapshot();
});

it('shows the custom checkbox when checked', async () => {
  const { getByTestId, asFragment } = render(
    <Checkbox label="Pizza" />
  );

  fireEvent.click(getByTestId("checkbox"))

  expect(asFragment()).toMatchSnapshot();
});
