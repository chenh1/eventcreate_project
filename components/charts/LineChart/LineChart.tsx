import type { EventType } from '@visx/event/lib/types';
import type { TouchEventHandler } from 'react';
import React, { useCallback } from 'react';
import { Group } from '@visx/group';
import { curveCardinal } from '@visx/curve';
import { LinePath, Line, Bar } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { fontFamilyHeadings } from '../../constants/typography';
import { bisector } from '@visx/vendor/d3-array';

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export type LineChartProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  tooltipMargin?: { top: number; right: number; bottom: number; left: number };
  data: any[];
  yAccessor: (d: any) => number;
  x1Accessor: (d: any) => number;
  x2Accessor?: (d: any) => number;
  yAxisLabel?: string;
  showTooltip?: (tooltip: { tooltipData: any; tooltipLeft: number; tooltipTop: number }) => void;
  hideTooltip?: () => void;
  tooltipData?: any;
  tooltipTop?: number;
  tooltipLeft?: number;
  paintThreshold?: boolean;
  thresholdOpacity?: number;
  shouldBeCurveLinear?: boolean;
  shouldSnapXToGrid?: boolean;
  aboveAreaFill?: string;
  belowAreaFill?: string;
  background?: string;
  generalStroke?: string;
  gridColor?: string;
  gridOpacity?: number;
  onClick?: (event: React.MouseEvent<SVGRectElement>, data: any) => void;
}

export const LineChart = withTooltip<LineChartProps>(
  ({
    width,
    height,
    margin = defaultMargin,
    tooltipMargin = { top: 0, right: 70, bottom: 90, left: 0 },
    data,
    yAccessor,
    x1Accessor,
    x2Accessor,
    yAxisLabel,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    paintThreshold,
    thresholdOpacity = 0.4,
    shouldBeCurveLinear,
    shouldSnapXToGrid = true,
    aboveAreaFill,
    belowAreaFill,
    background,
    generalStroke = '#222',
    gridColor = '#e0e0e0',
    gridOpacity = 1,
    onClick
  }) => {
    if (width < 10) return null;

    const tooltipStyles = {
      ...defaultStyles,
      background,
      border: `1px solid ${generalStroke}`,
      color: generalStroke,
      fontFamily: fontFamilyHeadings,
    };

    const bisectY = bisector(yAccessor).left;

    // Tooltip bounds
    const innerWidth = width - tooltipMargin.left - tooltipMargin.right;
    const innerHeight = height - tooltipMargin.top - tooltipMargin.bottom;

    // Scales
    const yScale = scaleTime<number>({
      domain: [Math.min(...data.map(yAccessor)), Math.max(...data.map(yAccessor))],
    });

    const xScale = scaleLinear<number>({
      domain: x2Accessor
        ? [
            Math.min(...data.map((d) => Math.min(x1Accessor(d), x2Accessor(d)))),
            Math.max(...data.map((d) => Math.max(x1Accessor(d), x2Accessor(d)))),
          ]
        : [
            Math.min(...data.map(x1Accessor)),
            Math.max(...data.map(x1Accessor)),
          ],
      nice: true,
    });

    // Bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    yScale.range([0, xMax]);
    xScale.range([yMax, 0]);

    // Tooltip handler
    const handleTooltip = useCallback(
      (event: Element | EventType) => {
        const { x: xRaw, y } = localPoint(event) || { x: 0, y: 0 };
        const x = xRaw - 40;
        const x0 = yScale.invert(x);

        const index = bisectY(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && yAccessor(d1)) {
          d = x0.valueOf() - yAccessor(d0).valueOf() > yAccessor(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }

        if (x2Accessor) {
          (d as any).x2TooltipTop = xScale(x2Accessor(d));
        }

        showTooltip({
          tooltipData: d,
          tooltipLeft: shouldSnapXToGrid ? yScale(yAccessor(d)) : x,
          tooltipTop: 20 + (xScale(x1Accessor(d)) * 0.95),
        });
      },
      [showTooltip, xScale, yScale, bisectY, data, x2Accessor, yAccessor, shouldSnapXToGrid]
    );

    return (
      <div>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
          <Group left={margin.left} top={margin.top}>
            <GridRows scale={xScale} width={xMax} height={yMax} stroke={gridColor} opacity={gridOpacity} />
            <GridColumns scale={yScale} width={xMax} height={yMax} stroke={gridColor} opacity={gridOpacity} />
            <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
            <AxisBottom
              stroke={generalStroke}
              tickLabelProps={{ fill: generalStroke, fontSize: 14, fontFamily: fontFamilyHeadings }}
              top={yMax}
              scale={yScale}
              numTicks={width > 520 ? 10 : 5}
            />
            <AxisLeft
              stroke={generalStroke}
              tickLabelProps={{ fill: generalStroke, fontSize: 14, fontFamily: fontFamilyHeadings }}
              scale={xScale}
            />
            <text x="-60" y="25" transform="rotate(-90)" fontSize={20} fontFamily={fontFamilyHeadings}>
              {yAxisLabel}
            </text>
            {paintThreshold && x2Accessor && (
              <Threshold
                id={`${Math.random()}`}
                data={data}
                x={(d) => yScale(yAccessor(d)) ?? 0}
                y0={(d) => xScale(x1Accessor(d)) ?? 0}
                y1={(d) => xScale(x2Accessor(d)) ?? 0}
                clipAboveTo={0}
                clipBelowTo={yMax}
                curve={shouldBeCurveLinear ? undefined : curveCardinal}
                belowAreaProps={{
                  fill: belowAreaFill,
                  fillOpacity: thresholdOpacity,
                }}
                aboveAreaProps={{
                  fill: aboveAreaFill,
                  fillOpacity: thresholdOpacity,
                }}
              />
            )}
            {x2Accessor && (
              <LinePath
                data={data}
                curve={shouldBeCurveLinear ? undefined : curveCardinal}
                x={(d) => yScale(yAccessor(d)) ?? 0}
                y={(d) => xScale(x2Accessor(d)) ?? 0}
                stroke={generalStroke}
                strokeWidth={1.5}
                strokeOpacity={0.8}
                strokeDasharray="1,2"
              />
            )}
            <LinePath
              data={data}
              curve={shouldBeCurveLinear ? curveCardinal : undefined}
              x={(d) => yScale(yAccessor(d)) ?? 0}
              y={(d) => xScale(x1Accessor(d)) ?? 0}
              stroke={generalStroke}
              strokeWidth={1.5}
            />
            <Bar
              x={tooltipMargin.left}
              y={tooltipMargin.top}
              width={innerWidth}
              height={innerHeight}
              fill="transparent"
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={hideTooltip}
              onClick={(event) => onClick && onClick(event, tooltipData)}
            />
            {tooltipData && (
              <g>
                <Line
                  from={{ x: tooltipLeft, y: tooltipMargin.top }}
                  to={{ x: tooltipLeft, y: innerHeight + tooltipMargin.top }}
                  stroke={generalStroke}
                  strokeWidth={2}
                  pointerEvents="none"
                  strokeDasharray="5,2"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop + 1}
                  r={4}
                  fill="black"
                  fillOpacity={0.1}
                  stroke="black"
                  strokeOpacity={0.1}
                  strokeWidth={2}
                  pointerEvents="none"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={4}
                  fill={generalStroke}
                  stroke="white"
                  strokeWidth={2}
                  pointerEvents="none"
                />
                {tooltipData?.x2TooltipTop && (
                  <>
                    <circle
                      cx={tooltipLeft}
                      cy={tooltipData.x2TooltipTop + 1}
                      r={4}
                      fill="black"
                      fillOpacity={0.1}
                      stroke="black"
                      strokeOpacity={0.1}
                      strokeWidth={2}
                      pointerEvents="none"
                    />
                    <circle
                      cx={tooltipLeft}
                      cy={tooltipData.x2TooltipTop}
                      r={4}
                      fill={generalStroke}
                      stroke="white"
                      strokeWidth={2}
                      pointerEvents="none"
                    />
                  </>
                )}
              </g>
            )}
          </Group>
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              {`${x1Accessor(tooltipData)}`}
            </TooltipWithBounds>
            {tooltipData?.x2TooltipTop && x2Accessor && (
              <TooltipWithBounds
                key={Math.random()}
                top={tooltipData.x2TooltipTop - 12}
                left={tooltipLeft + 12}
                style={tooltipStyles}
              >
                {`${x2Accessor(tooltipData)}`}
              </TooltipWithBounds>
            )}
          </div>
        )}
      </div>
    );
  }
);
