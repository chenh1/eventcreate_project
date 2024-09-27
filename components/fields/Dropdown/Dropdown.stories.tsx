import type { DropdownProps } from './Dropdown';
import React from 'react';
import { Dropdown } from './Dropdown';

type Args = {
  args: DropdownProps
}

const Template = (props: DropdownProps) => (
  <div className="pt-6">
    <Dropdown {...props}/>
  </div>
)

export default {
  component: Template
}

const options = [
  { value: 'default', label: 'Select an option', isPlaceholder: true },
  { value: 'novice', label: 'Novice' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
]

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DropdownHyperRed: Args = {
  args: {
    highlightColor: "hyper-red",
    options,
  },
};

export const DropdownUltraPurple: Args = {
  args: {
    highlightColor: "ultra-purple",
    options,
  },
};

export const DropdownForceYellow: Args = {
  args: {
    highlightColor: "force-yellow",
    options,
  },
};

export const DropdownApexBlue: Args = {
  args: {
    highlightColor: "apex-blue",
    options,
  },
};

export const DropdownHyperRedError: Args = {
  args: {
    highlightColor: "hyper-red",
    options,
    isError: true
  },
};

export const DropdownHyperRedConfirmed: Args = {
  args: {
    highlightColor: "hyper-red",
    options,
    isConfirmed: true
  },
};