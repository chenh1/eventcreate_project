"use client";

import type { Question } from "@/graphql/queries/examQuestions";
import React from "react"
import { Box } from "../../../containers/Box/Box";
import { Button } from "../../../core/Button/Button";
import { InputText } from "../../../fields/InputText/InputText";
import { Paragraph } from "../../../core/Paragraph/Paragraph";

// Raw question should look like:
// "The capital of California is ___blank___ and California resides in ___blank___"


interface InputFillInBlankProps {
  question: Question;
  onAnswer: (string) => void;
  // compareAnswer: (arg1: any, arg2: any) => boolean;
  userInputAnswerSet: boolean[]
}


export const InputFillInBlank: React.FC<InputFillInBlankProps> = ({ question, onAnswer, userInputAnswerSet }: InputFillInBlankProps) => {
  const structuredQuestion = question?.question?.split('___');
  
  const numberOfBlanks = structuredQuestion?.filter(segment => segment === 'blank')?.length;
  
  return (
    <Box padding="0" className="justify-center">
      <Box gap="md" padding="0" className="max-w-xl">
        <Box gap="sm" padding="0">
          <form onSubmit={e => {
            e.preventDefault()
            let answers: string[] = []
            for (let i = 0; i < structuredQuestion?.length; i++) {
              if (structuredQuestion[i] === 'blank') {
                answers.push(e.target[`answer_${i}`]?.value)
              }
            }
            onAnswer(answers);
          }}>
            {structuredQuestion?.map((segment, i) => segment === 'blank'
              ? <InputText className="mr-1" isInlineBlock key={i} isError={userInputAnswerSet[i]} isConfirmed={userInputAnswerSet[i]} name={`answer_${i}`}/>
              : <Paragraph className="mr-1" isInlineBlock key={i}>{segment}</Paragraph>
            )}
            <Button label="Submit" type="submit"/>
          </form>
          {/* {question?.answers?.map((datum, i) => (
            <Button 
              key={i}
              textAlign="left" 
              // onClick={() => compareAnswer(datum.key)}
              label={datum?.answer}
            />
          ))} */}
        </Box>
      </Box>
    </Box>
  )
}