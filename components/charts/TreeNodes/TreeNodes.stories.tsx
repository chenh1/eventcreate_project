import type { TreeNodesProps } from "./TreeNodes"
import React from 'react';
import { TreeNodes } from './TreeNodes';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { Box } from '../../containers/Box/Box';

type Args = {
  args: TreeNodesProps
}

const Template = (args: TreeNodesProps) => <Box className="min-h-[800px]"><ParentSize>{({ width, height }) => <TreeNodes width={width} height={height} {...args} />}</ParentSize></Box>

export default {
  component: Template
}

export const rawTree = {
  name: 'Root',
  children: [
    {
      name: 'A',
      children: [
        { name: 'A1' },
        { name: 'A2' },
        { name: 'A3' },
        {
          name: 'C',
          children: [
            {
              name: 'C1',
            },
            {
              name: 'D',
              children: [
                {
                  name: 'D1',
                },
                {
                  name: 'D2',
                },
                {
                  name: 'D3',
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'Z' },
    {
      name: 'B',
      children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }],
    },
  ],
};

export const StandardTreeNodes: Args = {
  args: {
    rawTree: rawTree,
    globalOnClick: (e) => {
      //for example, perform next router navigation:
      //router.push('/dashboard?classid=123')
    }
  }
};
