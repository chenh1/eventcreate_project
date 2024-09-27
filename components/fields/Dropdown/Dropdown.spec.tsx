import { Dropdown } from "./Dropdown";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

const options = [
  { value: 'default', label: 'Select an option', isPlaceholder: true },
  { value: 'novice', label: 'Novice' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
]

it('renders a dropdown field with options', async () => {
  const { asFragment } = render(
    <Dropdown options={options} />
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders a dropdown field with an error state', async () => {
  const { asFragment } = render(
    <Dropdown options={options} isError={true} />
  );

  expect(asFragment()).toMatchSnapshot();
});


it('renders a dropdown field with a confirm state', async () => {
  const { asFragment } = render(
    <Dropdown options={options} isConfirmed={true} />
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders a dropdown field with a confirm AND error state if both are available', async () => {
  const { asFragment } = render(
    <Dropdown options={options} isConfirmed={true} isError={true}/>
  );

  expect(asFragment()).toMatchSnapshot();
});
