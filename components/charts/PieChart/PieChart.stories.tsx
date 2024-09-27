import type { PieChartProps } from './PieChart';
import React from 'react';
import { PieChart } from './PieChart';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { Box } from '../../containers/Box/Box';

type Args = {
  args: PieChartProps
}

export const mockData = [
  { label: 'MSFT', shares: 360, value: 223.88 },
  { label: 'EL', shares: 123, value: 298.71 },
  { label: 'AMD', shares: 238, value: 92.12 },
  { label: 'V', shares: 291, value: 210.30 },
  { label: 'AAPL', shares: 663, value: 132.58 },
  { label: 'NKE', shares: 429, value: 143.75 },
  { label: 'WM', shares: 330, value: 118.23 }
]
export const totalShares = mockData.map(({ shares }) => shares).reduce((acc, prev) => acc + prev, 0)
export const totalValue = mockData.map(({ shares, value }) => shares * value).reduce((acc, prev) => acc + prev, 0)

const Template = (args: PieChartProps) => <Box className="min-h-[800px]"><ParentSize>{({ width, height }) => <PieChart {...args} width={width} height={height} />}</ParentSize></Box>

export default {
  component: Template
}

export const StandardPieChart: Args = {
  args: {
    height: 300,
    width: 500,
    data: mockData,
    pieValueOuter: d => (d.shares ?? 0) / totalShares,
    pieValueInner: d => (((d.value ?? 0) * (d.shares ?? 0)) / totalValue) * 100,
    pieValueOuterHighlightMap: ({ label, shares, ...rest }) => ({
      display: `${label}: ${shares} shares`,
      label,
      shares,
      ...rest
    }),
    pieValueInnerHighlightMap: ({ label, value, shares, ...rest }) => ({
      display: `${label}: $${Math.round(((shares ?? 0) * (value ?? 0)) * 100) / 100} total value`,
      label,
      shares,
      value,
      ...rest
    })
  }
};
