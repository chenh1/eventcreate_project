import type { InputFieldProps } from './InputField';
import React from 'react';
import InputField from './InputField';

type Args = {
  args: InputFieldProps
}

const Template = (props: InputFieldProps) => (
  <div className="pt-6">
    <InputField {...props}/>
  </div>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const InputFieldHyperRed: Args = {
  args: {
    name: "Test",
    highlightColor: "hyper-red",
    placeholder: "First Name",
  },
};

export const InputFieldUltraPurple: Args = {
  args: {
    name: "Test",
    highlightColor: "ultra-purple",
    placeholder: "First Name",
  },
};

export const InputFieldForceYellow: Args = {
  args: {
    name: "Test",
    highlightColor: "force-yellow",
    placeholder: "First Name",
  },
};

export const InputFieldApexBlue: Args = {
  args: {
    name: "Test",
    highlightColor: "apex-blue",
    placeholder: "First Name",
  },
};

export const InputFieldHyperRedError: Args = {
  args: {
    name: "Test",
    highlightColor: "hyper-red",
    placeholder: "First Name",
    isError: true
  },
};

export const InputFieldHyperRedConfirmed: Args = {
  args: {
    name: "Test",
    highlightColor: "hyper-red",
    placeholder: "First Name",
    isConfirmed: true
  },
};