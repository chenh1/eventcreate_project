import { Table } from "./Table";
import { render } from '@testing-library/react';
import { objectTableData, rowHeaders, columnHeaders } from './Table.stories'
import { Box } from '../../containers/Box/Box';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders a Table given the dataset', async () => {
  const { asFragment } = render(
    <Table
      objectTableData={objectTableData}
      rowHeaders={rowHeaders}
      columnHeaders={columnHeaders}
      CellWrapperComponent={props => <Box hasShadow isRounded {...props} />}
      CellHeaderWrapperComponent={props => <Box hasShadow isRounded {...props} />}
      gap={"md"}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});