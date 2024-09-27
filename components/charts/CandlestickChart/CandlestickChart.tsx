import React, { useEffect, useState, MouseEvent } from 'react';
import { BoxPlot } from '@visx/stats';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { withTooltip, Tooltip, defaultStyles as defaultTooltipStyles } from '@visx/tooltip';
import colors from '../../constants/colors';

interface Datum {
  [key: string]: number | string;
}
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';

export type CandlestickChartBaseProps = {
  width: number;
  height: number;
  tooltipOpen: boolean;
  tooltipLeft?: number;
  tooltipTop?: number;
  tooltipData?: any;
  showTooltip?: (tooltip: any) => void;
  hideTooltip?: () => void;
  tooltipBgColor?: string;
  tooltipColor?: string;
  enableTooltip?: boolean;
  data?: Datum[];
  xKey: string;
  highKey: string;
  lowKey: string;
  closeKey: string;
  openKey: string;
  isResponsive?: boolean;
  onClick?: (datum: Datum) => void;
  responsiveWidthMargin?: number;
  responsiveMaxWidth?: number;
  fillCallback?: (datum: Datum) => string;
  fillOpacity?: number;
  strokeColorCallback?: (datum: Datum) => string;
  strokeWidth?: number;
  boxWidthAdjustor?: number;
  setXRange?: (params: { xMax: number; width: number }) => [number, number];
  round?: boolean;
  padding?: number;
  shiftLeft?: number;
} & WithTooltipProvidedProps<Datum>;

const CandlestickChartBase: React.FC<CandlestickChartBaseProps> = ({
  width,
  height,
  tooltipOpen,
  tooltipLeft,
  tooltipTop,
  tooltipData,
  showTooltip,
  hideTooltip,
  tooltipBgColor = colors.maxWhite,
  tooltipColor = colors.nightBlack,
  enableTooltip = true,
  data = [],
  xKey,
  highKey,
  lowKey,
  closeKey,
  openKey,
  isResponsive,
  onClick,
  responsiveWidthMargin = 132,
  responsiveMaxWidth = 0,
  fillCallback,
  fillOpacity = 1,
  strokeColorCallback,
  strokeWidth = 1,
  boxWidthAdjustor = 0.4,
  setXRange,
  round = true,
  padding = 0.3,
  shiftLeft = 0,
}) => {
  // bounds
  const [responsiveWidth, setResponsiveWidth] = useState<number>(width);
  const xMax = responsiveWidth;
  const yMax = height;

  useEffect(() => {
    setResponsiveWidth(width);
  }, [width]);

  // scales
  const xScale = scaleBand<string>({
    range: typeof setXRange === 'function' ? setXRange({ xMax, width }) : [38, xMax + 64],
    round,
    domain: data.map(d => d[xKey] as string),
    padding,
  });

  const values = data.reduce<number[]>((allValues, datum) => {
    allValues.push(datum[lowKey] as number, datum[highKey] as number, datum[closeKey] as number, datum[openKey] as number);
    return allValues;
  }, []);

  const minYValue = Math.min(...values);
  const maxYValue = Math.max(...values);

  const yScale = scaleLinear<number>({
    range: [yMax - 50, 50],
    round: true,
    domain: [minYValue, maxYValue],
  });

  const boxWidth = xScale.bandwidth();
  const constrainedWidth = Math.min(1000, boxWidth);

  const updateResponsiveWidth = (e: UIEvent) => {
    const { innerWidth } = e.currentTarget as Window;
    const targetWidth = innerWidth - responsiveWidthMargin;
    setResponsiveWidth(
      typeof responsiveMaxWidth === 'number'
        ? targetWidth > responsiveMaxWidth
          ? responsiveMaxWidth
          : targetWidth
        : targetWidth
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && isResponsive) {
      window.addEventListener('resize', updateResponsiveWidth);
      return () => window.removeEventListener('resize', updateResponsiveWidth);
    }
  }, [isResponsive, responsiveWidthMargin, responsiveMaxWidth, updateResponsiveWidth]);

  return width < 10 ? null : (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <LinearGradient id="statsplot" to="#8b6ce7" from="#87f2d4" />
        <Group top={40}>
          {data.map((datum, i) => {
            const high = datum[highKey] as number;
            const low = datum[lowKey] as number;
            const close = datum[closeKey] as number;
            const open = datum[openKey] as number;
            const x = datum[xKey] as string;

            return (
              <g onClick={() => onClick && onClick(datum)} key={i}>
                <BoxPlot
                  min={low}
                  max={high}
                  left={(xScale(x) ?? 0) + 0.3 * constrainedWidth - shiftLeft}
                  firstQuartile={parseFloat(open < close ? open.toString() : close.toString()) + 0.25}
                  thirdQuartile={open > close ? open : close}
                  boxWidth={constrainedWidth * boxWidthAdjustor}
                  fill={fillCallback ? fillCallback({ close, open, low, high }) : '#000000'}
                  fillOpacity={fillOpacity}
                  stroke={strokeColorCallback ? strokeColorCallback({ close, open, low, high }) : '#FFFFFF'}
                  strokeWidth={strokeWidth}
                  valueScale={yScale}
                  minProps={{
                    style: {
                      stroke: 'transparent',
                    },
                    onClick: () => onClick && onClick(datum),
                    onMouseOver: (e: MouseEvent<SVGElement>) => {
                      if (showTooltip) {
                        showTooltip({
                          tooltipTop: yScale(low) ?? 0 + 40,
                          tooltipLeft: (xScale(x) ?? 0) + constrainedWidth + 5,
                          tooltipData: {
                            min: low,
                            name: x,
                          },
                        });
                      }
                    },
                    onMouseLeave: () => {
                      if (hideTooltip) {
                        hideTooltip();
                      }
                    },
                  }}
                  maxProps={{
                    style: {
                      stroke: 'transparent',
                    },
                    onClick: () => onClick && onClick(datum),
                    onMouseOver: () => {
                      if (showTooltip) {
                        showTooltip({
                          tooltipTop: yScale(high) ?? 0 + 40,
                          tooltipLeft: (xScale(x) ?? 0) + constrainedWidth + 5,
                          tooltipData: {
                            max: high,
                            name: x,
                          },
                        });
                      }
                    },
                    onMouseLeave: () => {
                      if (hideTooltip) {
                        hideTooltip();
                      }
                    },
                  }}
                  boxProps={{
                    onClick: () => onClick && onClick(datum),
                    onMouseOver: (e: MouseEvent<SVGElement>) => {
                      const mouseX = e.clientX;
                      const tooltipLeft = mouseX > width / 2 ? (xScale(x) ?? 0) + constrainedWidth + 5 - 260 : (xScale(x) ?? 0) + constrainedWidth + 5;
                      if (showTooltip) {
                        showTooltip({
                          tooltipTop: yScale((low + high) / 2) ?? 0 + 40,
                          tooltipLeft,
                          tooltipData: {
                            ...datum,
                            name: x,
                          },
                        });
                      }
                    },
                    onMouseLeave: () => {
                      if (hideTooltip) {
                        hideTooltip();
                      }
                    },
                  }}
                  medianProps={{
                    style: {
                      stroke: 'transparent',
                    },
                    onClick: () => onClick && onClick(datum),
                    onMouseOver: () => {
                      if (showTooltip) {
                        showTooltip({
                          tooltipTop: yScale((low + high) / 2) ?? 0 + 40,
                          tooltipLeft: (xScale(x) ?? 0) + constrainedWidth + 5,
                          tooltipData: {
                            median: (low + high) / 2,
                            name: x,
                          },
                        });
                      }
                    },
                    onMouseLeave: () => {
                      if (hideTooltip) {
                        hideTooltip();
                      }
                    },
                  }}
                />
              </g>
            );
          })}
        </Group>
      </svg>

      {enableTooltip && tooltipOpen && tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={{ ...defaultTooltipStyles, backgroundColor: tooltipBgColor || '#283238', color: tooltipColor || 'green' }}
        >
          <div>
            <strong>{tooltipData.name}</strong>
          </div>
          <div style={{ marginTop: '5px', fontSize: '12px' }}>
            {Object.keys(tooltipData).map((key, i) =>
              key !== xKey && key !== 'name' ? <div key={i}>{`${key}: ${tooltipData[key]}`}</div> : null
            )}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export const CandlestickChart = withTooltip(CandlestickChartBase);
