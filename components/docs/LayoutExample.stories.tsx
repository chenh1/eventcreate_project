import React from 'react';
import { Paragraph } from '../core/Paragraph/Paragraph';
import { Heading } from '../core/Heading/Heading';
import { Box } from '../containers/Box/Box';
import { Button } from '../core/Button/Button';

const Template = (args) => (
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
export const HPLayoutExample = { args: { gap: "xs" } };


