import { Hover3dCard } from "./Hover3dCard";
import { render, waitFor, fireEvent } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

it('creates a component with a 3d card effect on hover', async () => {
  const { getByTestId, asFragment } = render(
    <Hover3dCard>
      <p>Hover3dCard</p>
    </Hover3dCard>
  );

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});


it('subtley rotates the card with a 3d effect on mouse over', async () => {
  const { getByTestId, asFragment } = render(
    <Hover3dCard>
      <p>Hover3dCard</p>
    </Hover3dCard>
  );

  const el = getByTestId('hover-3d-card');
  fireEvent.mouseMove(el, { clientX: 50, clientY: 50 });

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});