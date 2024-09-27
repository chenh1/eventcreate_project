import type { CandlestickChartBaseProps } from './CandlestickChart'
import React from 'react';
import { CandlestickChart } from './CandlestickChart'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Box } from '../../containers/Box/Box'
import colors from '../../constants/colors'

type Args = {
  args: CandlestickChartBaseProps
}

const Template = (args: CandlestickChartBaseProps) => <Box className="min-h-[800px]"><ParentSize>{({ width, height }) => <CandlestickChart {...args} width={width} height={height}/>}</ParentSize></Box>

export default {
  component: Template
}

export const mockData = [
  { date: '2017-01-05T00:00:00.000Z', low: 62.4, close: 63.4, open: 62.7, high: 62.7 },
  { date: '2017-02-05T00:00:00.000Z', low: 55, close: 58, open: 59.9, high: 59.9 },
  { date: '2017-03-05T00:00:00.000Z', low: 52.3, close: 53.3, open: 59.1, high: 59.1 },
  { date: '2017-04-05T00:00:00.000Z', low: 51.7, close: 55.7, open: 58.8, high: 58.8 },
  { date: '2017-05-05T00:00:00.000Z', low: 60.2, close: 64.2, open: 58.7, high: 58.7 },
  { date: '2017-06-05T00:00:00.000Z', low: 52.8, close: 58.8, open: 57,  high: 57 },
  { date: '2017-07-05T00:00:00.000Z', low: 50.9, close: 57.9, open: 56.7, high: 56.7 },
  { date: '2017-08-05T00:00:00.000Z', low: 60.8, close: 61.8, open: 56.8, high: 56.8 },
  { date: '2017-09-05T00:00:00.000Z', low: 79.3, close: 69.3, open: 56.7, high: 56.7 },
  { date: '2017-10-05T00:00:00.000Z', low: 73.2, close: 71.2, open: 56.8, high: 56.8 },
  { date: '2017-11-05T00:00:00.000Z', low: 64.7, close: 68.7, open: 55.5, high: 55.5 },
  { date: '2017-12-05T00:00:00.000Z', low: 62.8, close: 61.8, open: 54.6, high: 54.6 },
  { date: '2018-01-05T00:00:00.000Z', low: 60.4, close: 63.4, open: 56.4, high: 56.4 },
  { date: '2018-02-05T00:00:00.000Z', low: 59.5, close: 64.5, open: 60.7, high: 60.7 },
  { date: '2018-03-05T00:00:00.000Z', low: 58.7, close: 64.7, open: 65.1, high: 65.1 },
  { date: '2018-04-05T00:00:00.000Z', low: 59.7, close: 67.7, open: 65.4, high: 65.4 },
  { date: '2018-05-05T00:00:00.000Z', low: 69.4, close: 69.4, open: 70.1, high: 70.1 },
  { date: '2018-06-05T00:00:00.000Z', low: 69, close: 68, open: 75.3, high: 75.3 },
  { date: '2018-07-05T00:00:00.000Z', low: 73.4, close: 72.4, open: 75.7, high: 75.7 },
  { date: '2018-08-05T00:00:00.000Z', low: 71.2, close: 74.2, open: 76.2, high: 76.2 },
  { date: '2018-09-05T00:00:00.000Z', low: 67.6, close: 69.6, open: 75.2, high: 75.2 },
  { date: '2018-10-05T00:00:00.000Z', low: 65, close: 68, open: 73.5, high: 73.5 },
  { date: '2018-11-05T00:00:00.000Z', low: 65.8, close: 65.8, open: 73.9, high: 73.9 },
  { date: '2018-12-05T00:00:00.000Z', low: 59.1, close: 59.1, open: 72.4, high: 72.4 },
  { date: '2019-01-05T00:00:00.000Z', low: 61.5, close: 61.5, open: 70.7, high: 70.7 },
  { date: '2019-02-05T00:00:00.000Z', low: 64.1, close: 64.1, open: 67.5, high: 67.5 },
  { date: '2019-03-05T00:00:00.000Z', low: 68.3, close: 68.3, open: 64.8, high: 64.8 },
  { date: '2019-04-05T00:00:00.000Z', low: 67.5, close: 67.5, open: 64.1, high: 64.1 },
  { date: '2019-05-05T00:00:00.000Z', low: 68.7, close: 68.7, open: 63.3, high: 63.3 },
  { date: '2019-06-05T00:00:00.000Z', low: 72.2, close: 72.2, open: 63.8, high: 63.8 },
  { date: '2019-07-05T00:00:00.000Z', low: 69.1, close: 69.1, open: 64.6, high: 64.6 },
  { date: '2019-08-05T00:00:00.000Z', low: 65.4, close: 65.4, open: 67,  high: 67 },
  { date: '2019-09-05T00:00:00.000Z', low: 66, close: 66, open: 69.9, high: 69.9 },
  { date: '2019-10-05T00:00:00.000Z', low: 68.8, close: 68.8, open: 71.7, high: 71.7 },
  { date: '2019-11-05T00:00:00.000Z', low: 64.2, close: 64.2, open: 75.6, high: 75.6 },
  { date: '2019-12-05T00:00:00.000Z', low: 61.5, close: 61.5, open: 76.8, high: 76.8 },
  { date: '2020-01-05T00:00:00.000Z', low: 63.3, close: 63.3, open: 76.7, high: 76.7 },  
  { date: '2020-02-05T00:00:00.000Z', low: 63.3, close: 63.3, open: 76.7, high: 76.7 },
  { date: '2020-03-05T00:00:00.000Z', low: 63.3, close: 63.3, open: 76.7, high: 76.7 },
]

export const StandardCandlestickChart: Args = {
  args: {
    data: mockData,
    lowKey: 'low',
    closeKey: 'close',
    openKey: 'open',
    highKey: 'high',
    xKey: 'date',
    responsiveMaxWidth: 600,
    strokeWidth: 1,
    fillCallback: ({ close, open }) => close > open ? colors.cyberTeal : colors.hyperRed,
    strokeColorCallback: ({ close, open }) => close > open ? colors.cyberTeal : colors.hyperRed,
    fillOpacity: 1,
    enableTooltip: true,
    tooltipBgColor: colors.maxWhite,
    tooltipColor: colors.nightBlack,
    width: 500,
    height: 300,
    tooltipOpen: false,
    tooltipLeft: 10,
    tooltipTop: 10,
    updateTooltip: () => {}, 
    showTooltip: () => {}, 
    hideTooltip: () => {}
  }
};