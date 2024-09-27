import type { HeadingType } from "./Heading";
import React from 'react';
import { Heading } from './Heading';

type Args = {
  args: HeadingType
}

const Template = (args: HeadingType) => <Heading {...args}>Heading</Heading>;
export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const H1: Args = {
  args: {
    type: "h1"
  },
};

export const H2: Args = {
  args: {
    type: "h2"
  },
};

export const H3: Args = {
  args: {
    type: "h3"
  },
};