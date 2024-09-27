import { Brand } from "./Brand";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders company branding', async () => {
  const { getByTestId, asFragment } = render(
    <Brand/>
  );

  expect(asFragment()).toMatchSnapshot();
});