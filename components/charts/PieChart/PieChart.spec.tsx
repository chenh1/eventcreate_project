import { PieChart } from "./PieChart";
import { render, waitFor } from '@testing-library/react';
import { mockData, totalShares, totalValue } from './PieChart.stories'
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a Pie chart given the dataset', async () => {
  const { asFragment } = render(
    <PieChart
      data={ mockData }
      height={300 }
      width={500 }
      pieValueOuter={d => (d.shares ?? 0) / totalShares }
      pieValueInner={d => (((d.value ?? 0) * (d.shares ?? 0)) / totalValue) * 100 }
      pieValueOuterHighlightMap={({ label, shares, ...rest }) => ({
        display: `${label}: ${shares} shares`,
        label,
        shares,
        ...rest
      })}
      pieValueInnerHighlightMap={({ label, value, shares, ...rest }) => ({
        display: `${label}: $${Math.round(((shares ?? 0) * (value ?? 0)) * 100) / 100} total value`,
        label,
        shares,
        value,
        ...rest
      })}
    />
  );

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});