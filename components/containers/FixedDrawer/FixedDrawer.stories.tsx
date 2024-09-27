import type { FixedDrawerProps } from './FixedDrawer';
import React from 'react';
import { FixedDrawer } from './FixedDrawer';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { Heading } from '../../core/Heading/Heading';
import { Button } from '../../core/Button/Button';

type Args = {
  args: FixedDrawerProps
}

const Template = (args: FixedDrawerProps) => (
  <>
    <FixedDrawer className={args.openFrom === "left" || args.openFrom === "right" ? "w-[50vw] h-screen" : "w-screen h-[50vh]"} {...args}>
      <Heading type="h3">Heading text</Heading>
      <Paragraph>You can use tab, sensor, or both to trigger drawer event. Scroll triggers only work on Y scroll</Paragraph>
      <Button label="CLICK ME" primary/>
    </FixedDrawer>
    {args.hasScroll &&
      <div className="w-[200px] h-[5000px]"></div>
    }
  </>
)

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FixedDrawerLeft: Args = { args: { openFrom: "left", tabContent: ">" } };
export const FixedDrawerRight: Args = { args: { openFrom: "right", tabContent: "<" } };
export const FixedDrawerUp: Args = { args: { openFrom: "top", tabContent: "v" } };
export const FixedDrawerDown: Args = { args: { openFrom: "bottom", tabContent: "^" } };
export const FixedDrawerMouseSenseLeft: Args = { args: { openFrom: "left", hasTab: false, hasSensors: true } };
export const FixedDrawerMouseSenseRight: Args = { args: { openFrom: "right", hasTab: false, hasSensors: true } };
export const FixedDrawerMouseSenseUp: Args = { args: { openFrom: "top", hasTab: false, hasSensors: true } };
export const FixedDrawerMouseSenseDown: Args = { args: { openFrom: "bottom", hasTab: false, hasSensors: true } };
export const FixedDrawerScrollUp: Args = { args: { openFrom: "top", hasTab: false, hasScroll: true } };
export const FixedDrawerScrollDown: Args = { args: { openFrom: "bottom", hasTab: false, hasScroll: true } };
