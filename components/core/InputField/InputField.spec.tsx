import InputField from "./InputField";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

it('renders an input text field', async () => {
  const { asFragment } = render(
    <InputField name="text" placeholder="Birthday" />
  );

  expect(asFragment()).toMatchSnapshot();
});



it('renders an input text field with an error state', async () => {
  const { asFragment } = render(
    <InputField name="text" placeholder="Birthday" isError={true}/>
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders an input text field with a confirm state', async () => {
  const { asFragment } = render(
    <InputField name="text" placeholder="Birthday" isConfirmed={true}/>
  );

  expect(asFragment()).toMatchSnapshot();
});


it('renders an input text field with a confirm AND error state if both are available', async () => {
  const { asFragment } = render(
    <InputField name="text" placeholder="Birthday" isError={true} isConfirmed={true}/>
  );

  expect(asFragment()).toMatchSnapshot();
});
