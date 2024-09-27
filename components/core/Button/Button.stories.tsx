import type { ButtonType } from './Button'
import { Button } from './Button';

export default {
  component: Button
}

type Args = {
  args: ButtonType
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Args = {
  args: {
    primary: true,
    label: 'Click me now',
  },
};

export const PrimaryAltColor1: Args = {
  args: {
    primary: true,
    color: "ultra-purple",
    label: 'Click me now',
  },
};

export const Secondary: Args = {
  args: {
    label: 'Click me now',
  },
};

export const Large: Args = {
  args: {
    size: 'lg',
    label: 'Click me now',
  },
};

export const Small: Args = {
  args: {
    size: 'sm',
    label: 'Click me now',
  },
};
