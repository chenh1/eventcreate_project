import { Button } from "./Button";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a button', async () => {
  const { getByTestId, asFragment } = render(
    <Button label="Click Me"/>
  );

  expect(asFragment()).toMatchSnapshot();
});

