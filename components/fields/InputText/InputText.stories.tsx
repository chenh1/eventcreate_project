import type { InputTextProps } from './InputText';
import React from 'react';
import { InputText } from './InputText';

type Args = {
  args: InputTextProps
}

const Template = (props: InputTextProps) => (
  <div className="pt-6">
    <InputText {...props}/>
  </div>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const InputTextHyperRed: Args = {
  args: {
    highlightColor: "hyper-red",
    placeholder: "First Name",
  },
};

export const InputTextUltraPurple: Args = {
  args: {
    highlightColor: "ultra-purple",
    placeholder: "First Name",
  },
};

export const InputTextForceYellow: Args = {
  args: {
    highlightColor: "force-yellow",
    placeholder: "First Name",
  },
};

export const InputTextApexBlue: Args = {
  args: {
    highlightColor: "apex-blue",
    placeholder: "First Name",
  },
};

export const InputTextHyperRedError: Args = {
  args: {
    highlightColor: "hyper-red",
    placeholder: "First Name",
    isError: true
  },
};

export const InputTextHyperRedConfirmed: Args = {
  args: {
    highlightColor: "hyper-red",
    placeholder: "First Name",
    isConfirmed: true
  },
};