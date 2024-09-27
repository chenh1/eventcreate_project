"use client";

import React, { useMemo } from 'react';
import getGapSizeClasses from '../../utils/getGapSizeClasses';
import type { IncrementKeys } from '@/components/constants/types';

interface TableData {
  value: any;
  xCell: number;
  yCell: number;
}

interface HeaderCellProps {
  children: React.ReactNode;
  columnHeaders?: { header: React.ReactNode }[];
  rowHeaders?: { header: React.ReactNode }[];
  isColumnHeader?: boolean;
  isRowHeader?: boolean;
  rowIndex: number;
  cellIndex: number;
  numberOfCellsInRow: number;
  numberOfCellsInColumn: number;
}

interface CellProps {
  children: React.ReactNode;
  columnHeaders?: { header: React.ReactNode }[];
  rowHeaders?: { header: React.ReactNode }[];
  rowIndex: number;
  cellIndex: number;
  numberOfCellsInRow: number;
  numberOfCellsInColumn: number;
  className?: string;
  value?: string | number;
}

export type TableProps = {
  objectTableData?: TableData[];
  rowHeaders?: { header: React.ReactNode }[];
  columnHeaders?: { header: React.ReactNode }[];
  CellWrapperComponent?: React.FC<CellProps>;
  CellHeaderWrapperComponent?: React.FC<HeaderCellProps>;
  gap?: IncrementKeys;
  className?: string;
}

export const DefaultHeaderCell: React.FC<HeaderCellProps> = ({
  children,
  columnHeaders,
  rowHeaders,
  isColumnHeader,
  isRowHeader,
  rowIndex,
  cellIndex,
  numberOfCellsInRow,
  numberOfCellsInColumn
}) => {
  const computedClasses = useMemo(() => {
    let cellClasses = '';

    if (isRowHeader) {
      cellClasses += 'border-l-0';

      cellClasses += (rowIndex === 0
        ? (columnHeaders?.length || 0) > 0
          ? ''
          : ' border-t-0'
        : '');

      if (rowIndex + 1 === numberOfCellsInColumn || rowIndex === numberOfCellsInColumn) {
        cellClasses += ' border-b-0';
      }
    }

    if (isColumnHeader) {
      cellClasses += ' border-t-0';

      cellClasses += (cellIndex === 0
        ? (rowHeaders?.length || 0) > 0
          ? ''
          : ' border-l-0'
        : '');

      if (cellIndex === numberOfCellsInRow || cellIndex + 1 === numberOfCellsInRow) {
        cellClasses += ' border-r-0';
      }
    }

    return cellClasses;
  }, [isRowHeader, isColumnHeader, rowIndex, cellIndex, columnHeaders, rowHeaders, numberOfCellsInRow, numberOfCellsInColumn]);

  return (
    <div className={`-m-px grid place-items-center border dark:border-max-white border-night-black border-2 p-2 ${computedClasses}`}>
      {children}
    </div>
  );
};

// DefaultCell component
export const DefaultCell: React.FC<CellProps> = ({
  children,
  columnHeaders,
  rowHeaders,
  rowIndex,
  cellIndex,
  numberOfCellsInRow,
  numberOfCellsInColumn,
  className = ""
}) => {
  const computedClasses = useMemo(() => {
    let cellClasses = '';

    if (cellIndex + 1 === numberOfCellsInRow) {
      cellClasses += ' border-r-0';
    }

    if (rowIndex + 1 === numberOfCellsInColumn) {
      cellClasses += ' border-b-0';
    }

    cellClasses += (
      rowIndex === 0
        ? (columnHeaders?.length || 0) > 0
          ? ''
          : ' border-t-0'
        : ''
    );

    cellClasses += (
      cellIndex === 0
        ? (rowHeaders?.length || 0) > 0
          ? ''
          : ' border-l-0'
        : ''
    );

    return cellClasses;
  }, [rowIndex, cellIndex, columnHeaders, rowHeaders, numberOfCellsInRow, numberOfCellsInColumn]);

  return (
    <div className={`-m-px grid place-items-center border dark:border-max-white border-night-black p-2 ${computedClasses} ${className}`}>
      {children}
    </div>
  );
};

// Table component
export const Table: React.FC<TableProps> = ({
  objectTableData = [],
  rowHeaders,
  columnHeaders,
  CellWrapperComponent = (props) => <DefaultCell {...props} />,
  CellHeaderWrapperComponent = (props) => <DefaultHeaderCell {...props} />,
  gap = "0",
  className = ""
}) => {
  const formattedTableData = useMemo(() => {
    const formattedTableData: (any[] | undefined)[] = [];

    objectTableData.forEach(({ value, xCell, yCell }) => {
      if (formattedTableData[yCell] === undefined) {
        formattedTableData[yCell] = [];
      }

      formattedTableData[yCell][xCell] = value;
    });

    return formattedTableData;
  }, [objectTableData]);

  const numberOfCellsInRow = useMemo(() => {
    return formattedTableData.reduce((acc, row) => {
      return Math.max(acc, row?.length || 0);
    }, 0);
  }, [formattedTableData]);

  const numberOfCellsInColumn = useMemo(() => {
    return formattedTableData.length;
  }, [formattedTableData]);

  const computedClasses = useMemo(() => {
    return getGapSizeClasses(gap);
  }, [gap]);

  const computedGridCols = useMemo(() => {
    const numberOfCellsInRowWithHeaders = numberOfCellsInRow + (rowHeaders?.length ? 1 : 0);
    return `repeat(${numberOfCellsInRowWithHeaders}, minmax(0, 1fr))`;
  }, [numberOfCellsInRow, rowHeaders]);

  const totalColumnHeaderCells = rowHeaders?.length === 0
    ? columnHeaders
    : [{ header: null }, ...(columnHeaders ?? [])];

  return (
    <div className={`grid ${computedClasses} ${className}`} style={{ gridTemplateColumns: computedGridCols }}>
      {formattedTableData.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {rowIndex === 0 && columnHeaders && (
            (totalColumnHeaderCells ?? []).map(({ header }, i) => (
              header !== null ? (
                <CellHeaderWrapperComponent
                  key={i}
                  isColumnHeader
                  columnHeaders={columnHeaders}
                  rowHeaders={rowHeaders}
                  cellIndex={i}
                  rowIndex={rowIndex}
                  numberOfCellsInRow={numberOfCellsInRow}
                  numberOfCellsInColumn={numberOfCellsInColumn}
                >
                  {header}
                </CellHeaderWrapperComponent>
              ) : (
                <div key={i}></div>
              )
            ))
          )}
          {(row ?? []).map((cell, cellIndex) => (
            <React.Fragment key={cellIndex}>
              {cellIndex === 0 && (rowHeaders?.length || 0) > 0 && (
                <CellHeaderWrapperComponent
                  isRowHeader
                  columnHeaders={columnHeaders}
                  rowHeaders={rowHeaders}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  numberOfCellsInRow={numberOfCellsInRow}
                  numberOfCellsInColumn={numberOfCellsInColumn}
                >
                  {rowHeaders?.[rowIndex]?.header}
                </CellHeaderWrapperComponent>
              )}
              <CellWrapperComponent
                value={cell}
                columnHeaders={columnHeaders}
                rowHeaders={rowHeaders}
                rowIndex={rowIndex}
                cellIndex={cellIndex}
                numberOfCellsInRow={numberOfCellsInRow}
                numberOfCellsInColumn={numberOfCellsInColumn}
              >
                {cell}
              </CellWrapperComponent>
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
