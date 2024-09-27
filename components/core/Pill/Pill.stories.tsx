import type { PillType } from './Pill';
import { Pill } from './Pill';

type Args = {
  args: PillType
}

export default {
  component: Pill
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const HyperRedPill: Args = {
  args: {
    children: 'Some tag content',
    color: 'hyper-red'
  },
};

export const UltraPurplePill: Args = {
  args: {
    children: 'Some tag content',
    color: 'ultra-purple'
  },
};

export const CyberTealPill: Args = {
  args: {
    children: 'Some tag content',
    color: 'cyber-teal'
  },
};

export const ForceYellowPill: Args = {
  args: {
    children: 'Some tag content',
    color: 'force-yellow'
  },
};

export const MachIndigoPill: Args = {
  args: {
    children: 'Some tag content',
    color: 'mach-indigo'
  },
};

export const ApexBluePill: Args = {
  args: {
    children: 'Some tag content',
    color: 'apex-blue'
  },
};

