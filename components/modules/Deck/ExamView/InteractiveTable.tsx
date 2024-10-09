"use client";

import type { InteractiveTableQuestion } from "@/graphql/queries/examQuestions";
import React from "react"
import { Box } from "../../../containers/Box/Box";
import { Heading } from "../../../core/Heading/Heading";
import { Table, DefaultCell, DefaultHeaderCell } from "../../../charts/Table/Table";
import { BLANK } from "../../../constants/macros";
import { InputText } from "../../../fields/InputText/InputText";
import { Button } from "../../../core/Button/Button";
import { Checkbox } from "../../../fields/Checkbox/Checkbox";
import { Paragraph } from "../../../core/Paragraph/Paragraph";
import { FadeScroller } from "../../../containers/FadeScroller/FadeScroller";


interface InteractiveTableProps {
  question: InteractiveTableQuestion;
  onAnswer: (string) => void;
  isAnswered: boolean
}


export const InteractiveTable: React.FC<InteractiveTableProps> = ({ question: questionProps, onAnswer, isAnswered }: InteractiveTableProps) => {
  const { question, tableData, rowHeaders, columnHeaders, answerType, correctAnswers } = questionProps || {};

  // find highest xCell in tableData
  const numColumns = tableData?.reduce((acc, { xCell }) => {
    return Math.max(acc, xCell)
  }, 0) + (rowHeaders?.length > 0 ? 1 : 0) + 1
  const minTableWidth = 120 * numColumns
  const minWidthClass = `min-w-[${minTableWidth}px]`
  
  return (
    <Box padding="0" className="justify-center">
      <Box gap="md" padding="0" className="max-w-xl">
        <Heading type="h4">{question}</Heading>
        <form onSubmit={e => {
          e.preventDefault()
          
          const numberOfBlanks = correctAnswers?.length;

          if (answerType === 'fill_in') {
            let answers: string[] = []
            for (let i = 0; i < numberOfBlanks; i++) {
              answers.push(e.target[`answer_x${correctAnswers[i].xCell}_y${correctAnswers[i].yCell}`]?.value)
            }
            onAnswer(answers);
          } else if (answerType === 'multi_click') {
            let answers: string[] = []
            for (let i = 0; i < numberOfBlanks; i++) {
              const el = e.target[`answer_x${correctAnswers[i].xCell}_y${correctAnswers[i].yCell}`]
              
              if (el?.checked) {
                answers.push(el?.value ?? "")
              }
            }
            onAnswer(answers);
          }

          return false;

          // if single_click, then the onAnswer is handled below on the Box onclick
        }}>
          <Box padding="0" gap="md">
            <FadeScroller twFaderColor={"night-black"}>
              <Table
                className={minWidthClass}
                objectTableData={tableData}
                columnHeaders={columnHeaders}
                rowHeaders={rowHeaders}
                gap={answerType === 'one_click' ? 'sm' : '0'}
                CellWrapperComponent={props => {
                  const { value, cellIndex, rowIndex } = props

                  if (answerType === 'fill_in') {
                    if (value === BLANK) {
                      return (
                        <DefaultCell {...props}>
                          <InputText disabled={isAnswered} fullWidth placeholder="" name={`answer_x${cellIndex}_y${rowIndex}`}/>
                        </DefaultCell>
                      )
                    }
                    
                    return (
                      <DefaultCell {...props}>
                        <Paragraph {...props}/>
                      </DefaultCell>
                    )
                  }

                  if (answerType === 'multi_click') {
                    return (
                      <DefaultCell {...props}>
                        <Checkbox disabled={isAnswered} label={value ?? ""} value={value} id={`answer_x${cellIndex}_y${rowIndex}`} name={`answer_x${cellIndex}_y${rowIndex}`} />
                      </DefaultCell>
                    )
                  }

                  return (
                    <Box className="cursor-pointer bg-night-black-100 hover:bg-night-black-200" onClick={() => !isAnswered && onAnswer(value)} hasShadow isRounded {...props}>
                      <Paragraph {...props}/>
                    </Box>
                  )
                }}
                CellHeaderWrapperComponent={props => {
                  if (answerType === 'fill_in' || answerType === 'multi_click') {
                    
                    return (
                      <DefaultHeaderCell {...props}>
                        <Heading type="h4" fontSizeClass="text-md">{props.children}</Heading>
                      </DefaultHeaderCell>
                    )
                  }
                  
                  return (
                    <Box hasShadow isRounded {...props}>
                      <Heading type="h4" fontSizeClass="text-md">{props.children}</Heading>
                    </Box>
                  )
                }}
              />
            </FadeScroller>
            {(answerType === 'fill_in' || answerType === 'multi_click') && !isAnswered &&
              <Button type="submit" primary label="Submit answer" />
            }
          </Box>
        </form>
      </Box>
    </Box>
  )
}