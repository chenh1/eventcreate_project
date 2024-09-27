"use client";

import type { PathQuestion } from "@/graphql/queries/pathQuestionnaire";
import type { Answer } from "@/graphql/queries/examQuestions";
import React, { useState, useEffect } from "react"
import { Box } from "../../containers/Box/Box";
import { Heading } from "../../core/Heading/Heading";
import { Button } from "../../core/Button/Button";
import { useRouter } from "next/navigation";
import { Loader } from "../Loader/Loader";

interface PathQuestionnaireProps {
  questions: PathQuestion[]
}

export const PathQuestionnaire: React.FC<PathQuestionnaireProps> = ({ questions }: PathQuestionnaireProps) => {
  const router = useRouter();
  const [ onQuestion, setOnQuestion ] = useState<number>(0);
  const [ answers, setAnswers ] = useState<Answer[]>([]);
  const [ confirmStart, setConfirmStart ] = useState<boolean>(false);

  const currentQuestion = questions[onQuestion];
  
  useEffect(() => {
    const qs = answers.map(({ key }, i) => `q${i + 1}=${key}`);
    if (onQuestion === questions.length) {
      router.push(`/dashboard?${qs.join('&')}`);
    }
  }, [onQuestion])

  return (
    <Box padding="0" className="justify-center">
      <Box gap="md" padding="0" className="max-w-xl">
        {!confirmStart ?
          <>
            <Heading type="h4">Before we get started, we'd like to get to know you a little bit. This way, we'll better understand which learning modules suit you!</Heading>
            <Button 
              data-cy={`path-questionnaire-confirm`}
              onClick={() => setConfirmStart(true)}
              primary
              label="Let's go!"
            />
          </>
          :
          <>
            <Heading type="h4">{currentQuestion?.question}</Heading>
            <Box gap="sm" padding="0">
              {currentQuestion?.answers?.map((datum, i) => (
                <Button 
                  key={i}
                  textAlign="left"
                  data-cy={`path-questionnaire-answer-${i}`}
                  onClick={() => {
                    setAnswers([...answers, datum]);
                    setOnQuestion(onQuestion + 1);
                  }}
                  label={datum?.answer}
                />
              ))}
            </Box>
            {onQuestion + 1 <= questions?.length && <Heading type="h4">{`${onQuestion + 1} of ${questions?.length}`}</Heading>}
          </>
        }
        {onQuestion === questions.length &&
          <Loader/>
        }
      </Box>
    </Box>
  )
}