"use client";

import type { MultiChoiceQuestion } from "@/graphql/queries/examQuestions";
import React from "react"
import { Box } from "../../../containers/Box/Box";
import { Heading } from "../../../core/Heading/Heading";
import { Button } from "../../../core/Button/Button";

interface ClickMultiChoiceProps {
  question: MultiChoiceQuestion;
  onAnswer: (string) => void;
  isAnswered: boolean;
}

export const ClickMultiChoice: React.FC<ClickMultiChoiceProps> = ({ question, onAnswer, isAnswered }: ClickMultiChoiceProps) => {

  return (
    <Box padding="0" className="justify-center">
      <Box gap="md" padding="0" className="max-w-xl">
        <Heading type="h4">{question?.question}</Heading>
        <Box gap="sm" padding="0">
          {question?.answers?.map((datum, i) => (
            <Button 
              disabled={isAnswered}
              key={i}
              textAlign="left" 
              onClick={() => onAnswer(datum.key)}
              label={datum?.answer}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}