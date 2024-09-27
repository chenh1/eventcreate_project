"use client";

import type { InteractiveChartQuestion, Datum } from "@/graphql/queries/examQuestions";
import React from "react"
import { Box } from "../../../containers/Box/Box";
import { Heading } from "../../../core/Heading/Heading";
import { LineChart } from "../../../charts/LineChart/LineChart";
import { CandlestickChart } from "../../../charts/CandlestickChart/CandlestickChart";
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import colors from "../../../constants/colors";


interface ClickInteractiveChartProps {
  question: InteractiveChartQuestion;
  onAnswer: ({ x, y }: { x: number | string, y: number | string}) => void;
  isAnswered?: boolean;
}


export const ClickInteractiveChart: React.FC<ClickInteractiveChartProps> = ({ question, onAnswer }: ClickInteractiveChartProps) => {
  const xAccessor = question.yType === 'date'
    ? (d) => new Date(d.y).valueOf()
    : (d) => Number(d.y)

  const yAccessor = question.xType === 'date'
    ? (d) => new Date(d.x).valueOf()
    : (d) => Number(d.x)
  

  const handleLineClick = (event, tooltipData) => {
    const { x, y } = tooltipData || {}
    onAnswer({ x, y })
  }

  const handleCandlestickClick = (tooltipData: Datum) => {
    const { x, y } = tooltipData || {}
    onAnswer({ x, y })
  }

  const chartType = question?.chartType;
  const candlestickChartData = chartType === 'candlestick' 
    ? question?.chartData?.map(({ multiPoints, x }) => ({
      x: x,
      open: multiPoints?.open,
      high: multiPoints?.high,
      low: multiPoints?.low,
      close: multiPoints?.close,
    }))
    : []

  return (
    <Box padding="0" className="justify-center">
      <Box gap="md" padding="0" className="max-w-xl">
        <Heading type="h4" className="text-center">{question?.question}</Heading>
        <Box padding="0" className="min-h-[300px] min-w-[300px]">
          <ParentSize>
            {({ width, height }) => chartType === 'candlestick' ?
              <CandlestickChart
                updateTooltip={() => {}}
                showTooltip={() => {}}
                hideTooltip={() => {}}
                tooltipOpen={false}
                width={width} 
                height={height}
                lowKey={'low'}
                closeKey={'close'}
                openKey={'open'}
                highKey={'high'}
                xKey={'x'}
                strokeWidth={6}
                onClick={handleCandlestickClick}
                data={candlestickChartData}
                fillCallback={({ close, open }) => close > open ? colors.cyberTeal : colors.hyperRed}
                strokeColorCallback={({ close, open }) => close > open ? colors.cyberTeal : colors.hyperRed}
                shiftLeft={50}
                enableTooltip={false}
              />
              :
              <LineChart 
                width={width} 
                height={height}
                data={question?.interactiveChartData}
                yAccessor={yAccessor}
                x1Accessor={xAccessor}
                yAxisLabel={question?.yAxisLabel}
                // xAxisLabel={question?.xAxisLabel}
                onClick={handleLineClick}
                shouldBeCurveLinear={true}
                aboveAreaFill={'green'}
                belowAreaFill={'violet'}
                background={'#f3f3f3'}
              />
            }
          </ParentSize>
        </Box>
      </Box>
    </Box>
  )
}