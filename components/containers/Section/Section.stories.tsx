import type { IncrementKeys } from '@/components/constants/types';
import type { SectionProps } from './Section';
import React from 'react';
import { Section } from './Section';
import { Box } from '../Box/Box';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { Heading } from '../../core/Heading/Heading';
import { Button } from '../../core/Button/Button';

type Args = {
  args: SectionProps & { gap: IncrementKeys }
}

const Template = (args: SectionProps) => (
  <>
    <Section>
      <Box className={"max-w-xs"} {...args}>
        <Heading type="h3">Section 1</Heading>
        <Paragraph>6rem (96px) padding top and bottom</Paragraph>
        <Button label="CLICK ME" primary/>
      </Box>
    </Section>
    <Section className="dark bg-night-black">
      <Box className={"max-w-xs"} {...args}>
        <Heading type="h3">Section 2</Heading>
        <Paragraph>6rem (96px) padding top and bottom</Paragraph>
        <Button label="CLICK ME" primary/>
      </Box>
    </Section>
    <Section>
      <Box className={"max-w-xs"} {...args}>
        <Heading type="h3">Section 3</Heading>
        <Paragraph>6rem (96px) padding top and bottom</Paragraph>
        <Button label="CLICK ME" primary/>
      </Box>
    </Section>
  </>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SectionExample: Args = { args: { gap: "xs" } };

