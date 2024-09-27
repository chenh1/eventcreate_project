import { FixedDrawer } from "./FixedDrawer";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a fixed drawer', async () => {
  const { getByTestId, asFragment } = render(
    <FixedDrawer>
      <p>Some paragraph</p>
    </FixedDrawer>
  );

  expect(asFragment()).toMatchSnapshot();
});


it('opens drawer once mouse goes over sensor', async () => {
  const { getByTestId, asFragment } = render(
    <FixedDrawer hasSensors={true}>
      <p>Some paragraph</p>
    </FixedDrawer>
  );

  fireEvent.mouseEnter(getByTestId("mouseEnterSensor"))

  expect(asFragment()).toMatchSnapshot();
});
