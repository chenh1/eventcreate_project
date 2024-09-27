import { TreeNodes } from "./TreeNodes";
import { render, waitFor } from '@testing-library/react';
import { rawTree } from './TreeNodes.stories'
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a Tree of nodes given the dataset', async () => {
  const { asFragment } = render(
    <TreeNodes
      rawTree={rawTree}
      globalOnClick={(e) => {
        //for example, perform next router navigation:
        //router.push('/dashboard?classid=123')
      }}
    />
  );

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});