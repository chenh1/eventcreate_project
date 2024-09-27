import { Fireflies } from "./Fireflies";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('generates 75% of fireflies desired', async () => {
  const fireflies = 30
  const { queryAllByTestId, asFragment } = render(
    <Fireflies qty={fireflies}/>
  );

  const dots = queryAllByTestId('dot-wrapper');
  expect(dots.length).toBe(Math.ceil(fireflies * .75));
});