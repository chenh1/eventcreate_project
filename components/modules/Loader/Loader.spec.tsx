import { Loader } from "./Loader";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders Loader module', async () => {
  const { getByTestId, asFragment } = render(
    <Loader/>
  )

  expect(asFragment()).toMatchSnapshot();
});
