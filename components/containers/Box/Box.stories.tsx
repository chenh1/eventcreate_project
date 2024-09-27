import type { BoxProps } from './Box'
import React from 'react';
import { Box } from './Box';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { Heading } from '../../core/Heading/Heading';
import { Button } from '../../core/Button/Button';

type Args = {
  args: BoxProps
}

const Template = (args: BoxProps) => (
  <Box className={"max-w-xs"} {...args}>
    <Heading type="h3">Heading text</Heading>
    <Paragraph>This is some text for a sample paragraph element</Paragraph>
    <Button label="CLICK ME" primary/>
  </Box>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BoxXsGap: Args = { args: { gap: "xs" } };
export const BoxSmGap: Args = { args: { gap: "sm" } };
export const BoxMdGap: Args = { args: { gap: "md" } };
export const BoxLgGap: Args = { args: { gap: "lg" } };
export const BoxXlGap: Args = { args: { gap: "xl" } };
export const BoxSeparateGap: Args = { args: { gap: "separate" } };
export const BoxDistinctGap: Args = { args: { gap: "distinct" } };

