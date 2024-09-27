import { CandlestickChart } from "./CandlestickChart";
import { render, waitFor } from '@testing-library/react';
import colors from '../../constants/colors'
import { mockData } from './CandlestickChart.stories'
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a Candlestick chart given the dataset', async () => {
  const { asFragment } = render(
    <CandlestickChart
      data={ mockData }
      lowKey={ 'low' }
      closeKey={ 'close' }
      openKey={ 'open' }
      highKey={ 'high' }
      xKey={ 'date' }
      responsiveMaxWidth={ 600 }
      strokeWidth={ 1 }
      fillCallback={ ({ close, open }) => close > open ? colors.cyberTeal : colors.hyperRed }
      strokeColorCallback={ ({ close, open }) => close > open ? colors.cyberTeal : colors.hyperRed }
      fillOpacity={ 1 }
      enableTooltip={ true }
      tooltipBgColor={ colors.maxWhite }
      tooltipColor={ colors.nightBlack }
      width={ 500 }
      height={ 300 }
      tooltipOpen={ false }
      tooltipLeft={ 10 }
      tooltipTop={ 10 }
      updateTooltip={ () => {} }
      showTooltip={ () => {} }
      hideTooltip={ () => {} }
    />
  );

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});