'use client'

import type { ExamQuestionType } from '@/graphql/queries/examQuestions';
import { Paragraph } from '../../../core/Paragraph/Paragraph';
import { Box } from '../../../containers/Box/Box';
import React, { useState } from 'react';
import { Button } from '../../../core/Button/Button';
import { ClickMultiChoice } from './ClickMultiChoice';
import { InputFillInBlank } from './InputFillInBlank';
import { InteractiveTable } from './InteractiveTable';
import { ClickInteractiveChart } from './ClickInteractiveChart';


interface ExamQuestionProps {
  question: ExamQuestionType;
  invokeNextQuestion: () => void;
  incrementCorrectAnswers: () => void;
}

export const ExamQuestion: React.FC<ExamQuestionProps> = ({ question, invokeNextQuestion, incrementCorrectAnswers }: ExamQuestionProps) => {
  const { multiChoiceQuestion, fillInQuestion, interactiveTableQuestion, interactiveChartQuestion } = question;
  const questionType = !!multiChoiceQuestion
    ? 'multi_choice'
    : !!fillInQuestion
      ? 'fill_in'
      : !!interactiveTableQuestion
        ? 'interactive_table'
        : !!interactiveChartQuestion
          ? 'interactive_chart'
          : null;

  const [ isCorrect, setIsCorrect ] = useState<boolean>(false);
  const [ userInputAnswerSet, updateUserInputAnswerSetTo ] = useState([]); // for multi choice questions
  const [ isAnswered, setIsAnswered ] = useState<boolean>(false);

  // base compare answer
  const compareAnswer = (answer: any, value: any): boolean => {
    return typeof answer === 'number'
      ? answer === parseFloat(value)
      : typeof answer === 'string'
        ? answer.toLowerCase?.() === value.toLowerCase?.()
        : answer === value;
  }

  // batch compare answer for multiple correct answers or multiple fill in the blanks
  const compareAnswers = (answers, values, requiresOnlyOne) => {
    const correctAnswers = answers?.map((answer, i) => compareAnswer(answer, values[i]));
    updateUserInputAnswerSetTo(correctAnswers)
    
    if (requiresOnlyOne) {
      return correctAnswers?.some(answer => answer === true);
    }

    return correctAnswers?.every(answer => answer === true);
  }


  const onAnswer = (value) => {
    setIsAnswered(true);
    let isCorrect = false;

    if (questionType === 'multi_choice') { // value will be the answer key
      isCorrect = question?.multiChoiceQuestion?.correctAnswers?.find(answer => compareAnswer(answer.key, value)) !== undefined;
    }

    if (questionType === 'fill_in') { // value will be the input value
      isCorrect = compareAnswers(question?.fillInQuestion?.correctAnswers?.map(answer => answer.answer), value, false);
    }

    if (questionType === 'interactive_table') {
      const answerType = question?.interactiveTableQuestion?.answerType;

      if (answerType === 'one_click') {
        isCorrect = compareAnswers(question?.interactiveTableQuestion?.correctAnswers?.map(answer => answer.value), [ value ], true);
      } else {
        isCorrect = compareAnswers(question?.interactiveTableQuestion?.correctAnswers?.map(answer => answer.value), value, false);
      }
    }

    if (questionType === 'interactive_chart') {
      const chartType = question?.interactiveChartQuestion?.chartType;

      if (chartType === 'candlestick') {
        isCorrect = compareAnswer(question?.interactiveChartQuestion?.correctAnswer?.x, value?.x);
      } else {
        const xIsCorrect = compareAnswer(question?.interactiveChartQuestion?.correctAnswer?.x, value?.x);
        const yIsCorrect = compareAnswer(question?.interactiveChartQuestion?.correctAnswer?.y, value?.y);
        isCorrect = xIsCorrect && yIsCorrect;
      }
    }

    setIsCorrect(!!isCorrect);

    if (isCorrect) {
      incrementCorrectAnswers();
    }
  }
  
  const renderQuestion = () => {
    if (questionType === 'multi_choice' && !!multiChoiceQuestion) {
      return (
        // multi choice
        <ClickMultiChoice isAnswered={isAnswered} question={multiChoiceQuestion} onAnswer={onAnswer} />
      )
    } else if (questionType === 'fill_in' && !!fillInQuestion) {
      return (
        // fill in answer
        <InputFillInBlank question={fillInQuestion} userInputAnswerSet={userInputAnswerSet} onAnswer={onAnswer} />
      )
    } else if (questionType === 'interactive_table' && !!interactiveTableQuestion) {
      return (
        // interactive
        <InteractiveTable isAnswered={isAnswered} question={interactiveTableQuestion} onAnswer={onAnswer} />
      )
    } else if (questionType === 'interactive_chart' && !!interactiveChartQuestion) {
      return (
        // interactive
        <ClickInteractiveChart isAnswered={isAnswered} question={interactiveChartQuestion} onAnswer={onAnswer} />
      )
    } else {
      return (
        <></>
      )
    }
  }



  return (
    <Box padding="0">
      {renderQuestion()}
      {isAnswered &&
        <Box padding="0" className="max-w-xl">
          <Paragraph>{isCorrect ? 'Correct!' : 'Incorrect...'}</Paragraph>
          <Paragraph>{question?.explanation}</Paragraph>
          <Button label="Next" primary onClick={() => {
            //scroll to top of window whenever going to next question
            window.scrollTo(0, 0);

            setIsAnswered(false);
            setIsCorrect(false);
            updateUserInputAnswerSetTo([])
            invokeNextQuestion()
          }}/>
        </Box>
      }
    </Box>
  )
}