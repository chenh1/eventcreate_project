import type { TableProps } from './Table'
import React from 'react';
import { Table } from './Table';
import { Box } from '../../containers/Box/Box';

type Args = {
  args: TableProps
}

export default {
  component: Table
}

export const objectTableData = [
  { xCell: 0, yCell: 0, value: "test00" },
  { xCell: 0, yCell: 1, value: "test01" },
  { xCell: 0, yCell: 2, value: "test02" },
  { xCell: 0, yCell: 3, value: "test03" },
  { xCell: 1, yCell: 0, value: "test10" },
  { xCell: 1, yCell: 1, value: "test11" },
  { xCell: 1, yCell: 2, value: "test12" },
  { xCell: 1, yCell: 3, value: "test13" },
  { xCell: 2, yCell: 0, value: "test20" },
  { xCell: 2, yCell: 1, value: "test21" },
  { xCell: 2, yCell: 2, value: "test22" },
  { xCell: 2, yCell: 3, value: "test23" },
]

export const rowHeaders = [{ header: "row1"}, { header: "row2"}, { header: "row3"}, { header: "row4"}];
export const columnHeaders = [{ header: "column1"}, { header: "column2"}, { header: "column3"}];

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TableBoxCells: Args = {
  args: {
    objectTableData,
    rowHeaders,
    columnHeaders,
    CellWrapperComponent: props => <Box hasShadow isRounded {...props} />,
    CellHeaderWrapperComponent: props => <Box hasShadow isRounded {...props} />,
    gap: "md"
  },
};

export const TableDivCells: Args = {
  args: {
    objectTableData,
    rowHeaders,
    columnHeaders,
  },
}