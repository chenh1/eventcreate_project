import { PageTransition } from "./PageTransition";
import { render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('transitions pages via fade', async () => {
  const { getByTestId, asFragment } = render(
    <PageTransition/>
  );

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});