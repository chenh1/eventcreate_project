import type { LineChartProps } from './LineChart'
import React from 'react';
import { LineChart } from './LineChart';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { Box } from '../../containers/Box/Box';
import colors from '../../constants/colors'

type Args = {
  args: LineChartProps
}

const Template = (args: LineChartProps) => <Box className="min-h-[800px]"><ParentSize>{({ width, height }) => <LineChart {...args} width={width} height={height}/>}</ParentSize></Box>

export default {
  component: Template
}

export const mockData = [
  { date: '2017-01-05T00:00:00.000Z', 'CSCO': '63.4', 'VWAP': '62.7' },
  { date: '2017-02-05T00:00:00.000Z', 'CSCO': '58', 'VWAP': '59.9' },
  { date: '2017-03-05T00:00:00.000Z', 'CSCO': '53.3', 'VWAP': '59.1' },
  { date: '2017-04-05T00:00:00.000Z', 'CSCO': '55.7', 'VWAP': '58.8' },
  { date: '2017-05-05T00:00:00.000Z', 'CSCO': '64.2', 'VWAP': '58.7' },
  { date: '2017-06-05T00:00:00.000Z', 'CSCO': '58.8', 'VWAP': '57' },
  { date: '2017-07-05T00:00:00.000Z', 'CSCO': '57.9', 'VWAP': '56.7' },
  { date: '2017-08-05T00:00:00.000Z', 'CSCO': '61.8', 'VWAP': '56.8' },
  { date: '2017-09-05T00:00:00.000Z', 'CSCO': '69.3', 'VWAP': '56.7' },
  { date: '2017-10-05T00:00:00.000Z', 'CSCO': '71.2', 'VWAP': '56.8' },
  { date: '2017-11-05T00:00:00.000Z', 'CSCO': '68.7', 'VWAP': '55.5' },
  { date: '2017-12-05T00:00:00.000Z', 'CSCO': '61.8', 'VWAP': '54.6' },
  { date: '2018-01-05T00:00:00.000Z', 'CSCO': '63.4', 'VWAP': '56.4' },
  { date: '2018-02-05T00:00:00.000Z', 'CSCO': '64.5', 'VWAP': '60.7' },
  { date: '2018-03-05T00:00:00.000Z', 'CSCO': '64.7', 'VWAP': '65.1' },
  { date: '2018-04-05T00:00:00.000Z', 'CSCO': '67.7', 'VWAP': '65.4' },
  { date: '2018-05-05T00:00:00.000Z', 'CSCO': '69.4', 'VWAP': '70.1' },
  { date: '2018-06-05T00:00:00.000Z', 'CSCO': '68', 'VWAP': '75.3' },
  { date: '2018-07-05T00:00:00.000Z', 'CSCO': '72.4', 'VWAP': '75.7' },
  { date: '2018-08-05T00:00:00.000Z', 'CSCO': '74.2', 'VWAP': '76.2' },
  { date: '2018-09-05T00:00:00.000Z', 'CSCO': '69.6', 'VWAP': '75.2' },
  { date: '2018-10-05T00:00:00.000Z', 'CSCO': '68', 'VWAP': '73.5' },
  { date: '2018-11-05T00:00:00.000Z', 'CSCO': '65.8', 'VWAP': '73.9' },
  { date: '2018-12-05T00:00:00.000Z', 'CSCO': '59.1', 'VWAP': '72.4' },
  { date: '2019-01-05T00:00:00.000Z', 'CSCO': '61.5', 'VWAP': '70.7' },
  { date: '2019-02-05T00:00:00.000Z', 'CSCO': '64.1', 'VWAP': '67.5' },
  { date: '2019-03-05T00:00:00.000Z', 'CSCO': '68.3', 'VWAP': '64.8' },
  { date: '2019-04-05T00:00:00.000Z', 'CSCO': '67.5', 'VWAP': '64.1' },
  { date: '2019-05-05T00:00:00.000Z', 'CSCO': '68.7', 'VWAP': '63.3' },
  { date: '2019-06-05T00:00:00.000Z', 'CSCO': '72.2', 'VWAP': '63.8' },
  { date: '2019-07-05T00:00:00.000Z', 'CSCO': '69.1', 'VWAP': '64.6' },
  { date: '2019-08-05T00:00:00.000Z', 'CSCO': '65.4', 'VWAP': '67' },
  { date: '2019-09-05T00:00:00.000Z', 'CSCO': '66', 'VWAP': '69.9' },
  { date: '2019-10-05T00:00:00.000Z', 'CSCO': '68.8', 'VWAP': '71.7' },
  { date: '2019-11-05T00:00:00.000Z', 'CSCO': '64.2', 'VWAP': '75.6' },
  { date: '2019-12-05T00:00:00.000Z', 'CSCO': '61.5', 'VWAP': '76.8' },
  { date: '2020-01-05T00:00:00.000Z', 'CSCO': '63.3', 'VWAP': '76.7' },  
  { date: '2020-02-05T00:00:00.000Z', 'CSCO': '63.3', 'VWAP': '76.7' },
  { date: '2020-03-05T00:00:00.000Z', 'CSCO': '63.3', 'VWAP': '76.7' },
]

export const StandardLineChart: Args = {
  args: {
    data: mockData,
    yAccessor: (d) => new Date(d.date).valueOf(),
    x1Accessor: (d) => Number(d['CSCO']),
    yAxisLabel: 'CSCO',
    shouldBeCurveLinear: false,
    aboveAreaFill: 'green',
    belowAreaFill: 'violet',
    background: '#f3f3f3',
    width: 500,
    height: 300
  }
};

export const StandardLineChartLinearCurve: Args = {
  args: {
    data: mockData,
    yAccessor: (d) => new Date(d.date).valueOf(),
    x1Accessor: (d) => Number(d['CSCO']),
    yAxisLabel: 'CSCO',
    shouldBeCurveLinear: true,
    aboveAreaFill: 'green',
    belowAreaFill: 'violet',
    background: '#f3f3f3',
    width: 500,
    height: 300
  }
};

export const StandardLineChartWithThreshold: Args = {
  args: {
    data: mockData,
    yAccessor: (d) => new Date(d.date).valueOf(),
    x1Accessor: (d) => Number(d['CSCO']),
    x2Accessor: (d) => Number(d['VWAP']),
    yAxisLabel: 'CSCO',
    paintThreshold: true,
    shouldBeCurveLinear: false,
    aboveAreaFill: 'green',
    belowAreaFill: 'violet',
    background: '#f3f3f3',
    width: 500,
    height: 300
  }
};

export const NeonLineChart: Args = {
  args: {
    data: mockData,
    yAccessor: (d) => new Date(d.date).valueOf(),
    x1Accessor: (d) => Number(d['CSCO']),
    x2Accessor: (d) => Number(d['VWAP']),
    yAxisLabel: 'CSCO',
    paintThreshold: true,
    shouldBeCurveLinear: false,
    aboveAreaFill: colors.cyberTeal,
    belowAreaFill: colors.machIndigo,
    background: colors.nightBlack,
    generalStroke: colors.hyperRed,
    gridColor: colors.hyperRed,
    gridOpacity: 0.3,
    thresholdOpacity: 0.8,
    width: 500,
    height: 300
  }
};
