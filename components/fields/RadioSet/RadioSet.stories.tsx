import type { RadioSetProps } from './RadioSet';
import React from 'react';
import { RadioSet } from './RadioSet';

type Args = {
  args: RadioSetProps
}

export default {
  component: RadioSet
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const RadioSetHyperRed: Args = {
  args: {
    highlightColor: "hyper-red",
    name: "radio-set",
    data: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" }
    ],
    onCheck: (value) => console.log(value)
  },
};
