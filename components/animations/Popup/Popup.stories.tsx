import type { AnimationBase } from '../../constants/types';
import React from 'react';
import { Popup } from './Popup';
import { Box } from '../../containers/Box/Box';
import { Heading } from '../../core/Heading/Heading';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { Button } from '../../core/Button/Button';

type Args = {
  args: AnimationBase
}

const Template = (args: AnimationBase) => (
  <Popup className={"max-w-xs"} {...args}>
    <Box className={"max-w-sm"} hasShadow isRounded gap="sm">
      <Heading type="h3">Heading text</Heading>
      <Paragraph>Example description</Paragraph>
      <Button label="CLICK ME" primary/>
    </Box>
  </Popup>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PopupAnimation: Args = { args: { disable: false } };

