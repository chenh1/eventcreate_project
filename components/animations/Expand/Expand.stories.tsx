import type { ExpandType } from './Expand';
import React from 'react';
import { Expand } from './Expand';
import { Box } from '../../containers/Box/Box';
import { Heading } from '../../core/Heading/Heading';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { Button } from '../../core/Button/Button';

type Args = {
  args: ExpandType
}

const Template = (args) => (
  <Expand className={"max-w-xs h-[168px]"} {...args}>
    <Box className={"max-w-sm h-[168px]"} hasShadow isRounded gap="sm">
      <Heading type="h3">Heading text</Heading>
      <Paragraph>Example description</Paragraph>
      <Button label="CLICK ME" primary/>
    </Box>
  </Expand>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ExpandAnimationHorizontal: Args = { args: { disable: false, orientation: "horizontal" } };
export const ExpandAnimationVertical: Args = { args: { disable: false, orientation: "vertical" } };


