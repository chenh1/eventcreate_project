import type { CheckboxProps } from './Checkbox';
import React from 'react';
import { Checkbox } from './Checkbox';

type Args = {
  args: CheckboxProps
}

export default {
  component: Checkbox
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CheckboxHyperRed: Args = {
  args: {
    highlightColor: "hyper-red",
    label: "This is the answer",
  },
};
