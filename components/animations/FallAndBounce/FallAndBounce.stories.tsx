import type { FallAndBounceType } from './FallAndBounce';
import React from 'react';
import { FallAndBounce } from './FallAndBounce';
import { Box } from '../../containers/Box/Box';
import { Heading } from '../../core/Heading/Heading';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { Button } from '../../core/Button/Button';

type Args = {
  args: FallAndBounceType
}

const Template = (args: FallAndBounceType) => (
  <FallAndBounce height="300px" width="500px" className={"max-w-xs"} {...args}>
    <Box className={"max-w-sm"} hasShadow isRounded gap="sm">
      <Heading type="h3">Heading text</Heading>
      <Paragraph>Example description</Paragraph>
      <Button label="CLICK ME" primary/>
    </Box>
  </FallAndBounce>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FallAndBounceAnimationFromLeft: Args = { args: { disable: false, from: "fromLeft" } };
export const FallAndBounceAnimationFromRight: Args = { args: { disable: false, from: "fromRight" } };
export const FallAndBounceAnimationFromTop: Args = { args: { disable: false, from: "fromTop" } };
export const FallAndBounceAnimationFromBottom: Args = { args: { disable: false, from: "fromBottom" } };


