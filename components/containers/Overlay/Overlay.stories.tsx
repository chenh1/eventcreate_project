import type { OverlayProps } from './Overlay';
import React, { useState } from 'react';
import { Overlay } from './Overlay';
import { Paragraph } from '../../core/Paragraph/Paragraph';
import { Heading } from '../../core/Heading/Heading';
import { Button } from '../../core/Button/Button';
import { Box } from '../Box/Box';

type Args = { 
  args: OverlayProps | { label: string }
}

const Template = (args: OverlayProps) => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <>
      <Button label="Click to toggle overlay" primary onClick={() => setIsOpen(true)} />
      <Overlay className={"max-w-xs"} {...args} visibility={isOpen} toggleVisibility={setIsOpen}>
        <Box padding="0" gap="sm">
          <Heading type="h3">Heading text</Heading>
          <Paragraph>This is some text for a sample paragraph element</Paragraph>
          <Button label="CLICK ME" primary onClick={() => setIsOpen(false)}/>
        </Box>
      </Overlay>
    </>
  )
}

export default {
  component: Template
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const OverlayDefault: Args = { args: 
  { label: "CLICK ME" } 
};

