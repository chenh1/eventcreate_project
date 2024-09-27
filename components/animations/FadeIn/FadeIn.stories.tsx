import type { FadeInType } from './FadeIn';
import React from 'react';
import { FadeIn } from './FadeIn';
import { Box } from '../../containers/Box/Box';
import { Heading } from '../../core/Heading/Heading';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { Button } from '../../core/Button/Button';

type Args = {
  args: FadeInType
}

const Template = (args: FadeInType) => (
  <FadeIn className={"max-w-xs h-[168px]"} {...args}>
    <Box className={"max-w-sm h-[168px]"} hasShadow isRounded gap="sm">
      <Heading type="h3">Heading text</Heading>
      <Paragraph>Example description</Paragraph>
      <Button label="CLICK ME" primary/>
    </Box>
  </FadeIn>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FadeInAnimationFromLeft: Args = { args: { disable: false, from: "fromLeft" } };
export const FadeInAnimationFromRight: Args = { args: { disable: false, from: "fromRight" } };
export const FadeInAnimationFromTop: Args = { args: { disable: false, from: "fromTop" } };
export const FadeInAnimationFromBottom: Args = { args: { disable: false, from: "fromBottom" } };


