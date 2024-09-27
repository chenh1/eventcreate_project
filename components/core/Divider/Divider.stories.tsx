import type { DividerType } from './Divider';
import React from 'react';
import { Divider } from './Divider';
import { Box } from '../../containers/Box/Box';
import { Heading } from '../Heading/Heading';

type Args = {
  args: DividerType
}

const Template = (args: DividerType) =>  (
  <Box className={`auto-cols-auto auto-rows-auto ${args.orientation === "horizontal" ? 'grid-rows-5' : 'grid-cols-5'}`}>
    <Heading type="h3">Heading text</Heading>
    <Divider {...args}>Divider</Divider>
    <Heading type="h3">Heading text</Heading>
    <Divider {...args}>Divider</Divider>
    <Heading type="h3">Heading text</Heading>
  </Box>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const HorizontalDivider: Args = {
  args: {
    orientation: "horizontal"
  },
};

export const VerticalDivider: Args = {
  args: {
    orientation: "vertical"
  },
};