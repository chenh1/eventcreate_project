import type { ParagraphType } from './Paragraph';
import React from 'react';
import { Paragraph } from './Paragraph';

type Args = {
  args: ParagraphType
}

const Template = (args: ParagraphType) => <Paragraph {...args}>This is some text for a sample paragraph element</Paragraph>;

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ParagraphRegular: Args = {
  args: {
    
  },
};

export const ParagraphSmall: Args = {
  args: {
    size: "sm"
  },
};

export const ParagraphLarge: Args = {
  args: {
    size: "lg"
  },
};