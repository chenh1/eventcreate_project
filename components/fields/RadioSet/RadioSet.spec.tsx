import { RadioSet } from "./RadioSet";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

const mockData = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" }
]

it('renders a radio set field', async () => {
  const { asFragment } = render(
    <RadioSet data={mockData} />
  );

  expect(asFragment()).toMatchSnapshot();
});
