import type { AccordionBoxProps } from './AccordionBox';
import React from 'react';
import { AccordionBox } from './AccordionBox';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { Heading } from '../../core/Heading/Heading';
import { Button } from '../../core/Button/Button';
import { Box } from '../Box/Box';

type Args = {
  args: AccordionBoxProps
}

const Template = (args: AccordionBoxProps) => (
  <AccordionBox className={"max-w-xs"} {...args}>
    <Box padding="0" gap="sm">
      <Heading type="h3">Heading text</Heading>
      <Paragraph>This is some text for a sample paragraph element</Paragraph>
      <Button label="CLICK ME" primary/>
    </Box>
  </AccordionBox>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AccordionBoxDefault: Args = { args: 
  { label: "CLICK ME" } 
};

