import React, { useState } from 'react';
import Pie from '@visx/shape/lib/shapes/Pie';
import { DefaultOutput, scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { GradientPinkBlue } from '@visx/gradient';
import { animated, useTransition, to } from '@react-spring/web';
import { fontFamilyHeadings } from '../../constants/typography';
import { ScaleOrdinal } from '@visx/vendor/d3-scale';

interface PieChartData {
  label: string;
  display?: string;
  shares?: number;
  value?: number;
}

export type PieChartProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  animate?: boolean;
  pieValueOuter: (datum: PieChartData) => number;
  pieValueOuterHighlightMap: (datum: PieChartData) => PieChartData;
  pieValueInner: (datum: PieChartData) => number;
  pieValueInnerHighlightMap: (datum: PieChartData) => PieChartData;
  bgFill?: string;
  data: PieChartData[];
}

const getOuterSegmentColor: ScaleOrdinal<string, DefaultOutput> = scaleOrdinal<string>({
  domain: ['a', 'b', 'c', 'd'],
  range: [
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.6)',
    'rgba(255,255,255,0.5)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.3)',
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.1)',
  ],
});

const getInnerSegmentColor: ScaleOrdinal<string, DefaultOutput, never> = scaleOrdinal<string>({
  domain: ['a', 'b', 'c', 'd'],
  range: ['rgba(93,30,91,1)', 'rgba(93,30,91,0.8)', 'rgba(93,30,91,0.6)', 'rgba(93,30,91,0.4)'],
});

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export const PieChart: React.FC<PieChartProps> = ({
  width,
  height,
  margin = defaultMargin,
  animate = true,
  pieValueOuter,
  pieValueOuterHighlightMap,
  pieValueInner,
  pieValueInnerHighlightMap,
  bgFill = "url('#visx-pie-gradient')",
  data,
}) => {
  const [selectedOuterValue, setSelectedOuterValue] = useState<string | null>(null);
  const [selectedInnerValue, setSelectedInnerValue] = useState<string | null>(null);

  if (width < 10) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="visx-pie-gradient" />
      <rect rx={14} width={width} height={height} fill={bgFill} />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={
            selectedOuterValue
              ? data.filter(({ label }) => label === selectedOuterValue).map(pieValueOuterHighlightMap)
              : data.map(pieValueOuterHighlightMap)
          }
          pieValue={pieValueOuter}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.005}
        >
          {(pie) => (
            <AnimatedPie
              {...pie}
              animate={animate}
              getKey={(arc) => arc.data.display}
              onClickDatum={({ data: { label } }) =>
                animate &&
                setSelectedOuterValue(selectedOuterValue === label ? null : label)
              }
              getColor={(arc) => getOuterSegmentColor(arc.data.label) as string}
            />
          )}
        </Pie>
        <Pie
          data={
            selectedInnerValue
              ? data.filter(({ label }) => label === selectedInnerValue).map(pieValueInnerHighlightMap)
              : data.map(pieValueInnerHighlightMap)
          }
          pieValue={pieValueInner}
          pieSortValues={() => -1}
          outerRadius={radius - donutThickness * 1.3}
        >
          {(pie) => (
            <AnimatedPie
              {...pie}
              animate={animate}
              getKey={({ data: { display } }) => display}
              onClickDatum={({ data: { label } }) =>
                animate &&
                setSelectedInnerValue(selectedInnerValue === label ? null : label)
              }
              getColor={({ data: { label } }) => getInnerSegmentColor(label) as string}
            />
          )}
        </Pie>
      </Group>
      {animate && (
        <text
          textAnchor="end"
          x={width - 16}
          y={height - 16}
          fill="white"
          fontFamily={fontFamilyHeadings}
          fontSize={16}
          fontWeight={300}
          pointerEvents="none"
        >
          .
        </text>
      )}
    </svg>
  );
}

// Transition functions for the animated pie
const fromLeaveTransition = ({ endAngle }: { endAngle: number }) => ({
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});

const enterUpdateTransition = ({ startAngle, endAngle }: { startAngle: number; endAngle: number }) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

// Define props for AnimatedPie
export type AnimatedPieProps = {
  animate: boolean;
  arcs: any[];
  path: any;
  getKey: (arc: any) => string;
  getColor: (arc: any) => string;
  onClickDatum: (arc: any) => void;
}

function AnimatedPie({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
}: AnimatedPieProps) {
  const transitions = useTransition(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });

  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
    
    // @ts-ignore 
    const { startAngle, endAngle, opacity } = props || {}

    return (
      <g key={key}>
        <animated.path
          d={to([startAngle, endAngle], (startAngle, endAngle) =>
            path({
              ...arc,
              startAngle,
              endAngle,
            }),
          )}
          fill={getColor(arc)}
          onClick={() => onClickDatum(arc)}
          onTouchStart={() => onClickDatum(arc)}
        />
        {hasSpaceForLabel && (
          <animated.g style={{ opacity: opacity }}>
            <text
              fill="white"
              x={centroidX}
              y={centroidY}
              dy=".33em"
              fontSize={14}
              fontFamily={fontFamilyHeadings}
              textAnchor="middle"
              pointerEvents="none"
            >
              {getKey(arc)}
            </text>
          </animated.g>
        )}
      </g>
    );
  });
}
