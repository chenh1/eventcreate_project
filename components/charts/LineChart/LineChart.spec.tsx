import { LineChart } from "./LineChart";
import { render, waitFor } from '@testing-library/react';
import colors from '../../constants/colors'
import { mockData } from './LineChart.stories'
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a Line chart given the dataset', async () => {
  const { asFragment } = render(
    <LineChart
      data={ mockData }
      yAccessor={(d) => new Date(d.date).valueOf()}
      x1Accessor={(d) => Number(d['CSCO'])}
      x2Accessor={(d) => Number(d['VWAP'])}
      yAxisLabel={'CSCO'}
      paintThreshold={true}
      shouldBeCurveLinear={false}
      aboveAreaFill={colors.cyberTeal}
      belowAreaFill={colors.machIndigo}
      background={colors.nightBlack}
      generalStroke={colors.hyperRed}
      gridColor={colors.hyperRed}
      gridOpacity={0.3}
      thresholdOpacity={0.8}
      width={500}
      height={300}
    />
  );

  await waitFor(() => {
    const frag = asFragment()
    const paths = [...frag.querySelectorAll('defs'), ...frag.querySelectorAll('path')];

    // remove non-deterministic elements (path and clippath's dynamic ids)
    paths.forEach((path) => {
      if (!!path && !!path.parentNode) {
        path.parentNode.removeChild(path);
      }
    });

    expect(frag).toMatchSnapshot();
  });
});