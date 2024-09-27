import type { AccordionDividerProps } from './AccordionDivider';
import React from 'react';
import { AccordionDivider } from './AccordionDivider';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { Heading } from '../../core/Heading/Heading';
import { Button } from '../../core/Button/Button';

type Args = {
  args: AccordionDividerProps
}

const Template = (args: AccordionDividerProps) => (
  <AccordionDivider className={"max-w-xl"} {...args}>
    <Paragraph>This is some text for a sample paragraph element</Paragraph>
    <Button label="CLICK ME" primary/>
  </AccordionDivider>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AccordionDividerExpandsWithContent: Args = { args: 
  { label: <Heading type="h2">There's some content below here</Heading>, dividerShouldExpand: true } 
};

export const AccordionDividerStaysAtLabel: Args = { args: 
  { label: <Heading type="h2">There's some content below here</Heading> } 
};

