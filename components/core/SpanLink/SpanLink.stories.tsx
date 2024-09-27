import type { SpanLinkType } from './SpanLink';
import React from 'react';
import { SpanLink } from './SpanLink';

type Args = {
  args: SpanLinkType
}

const Template = (args: SpanLinkType) => <SpanLink {...args}>SpanLink</SpanLink>;
export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const StandardLink: Args = {
  args: {
    uncolored: false,
  },
};

export const UnstyledLink: Args = {
  args: {
    uncolored: true,
  },
};
