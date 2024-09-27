import { gql, DocumentNode } from "@apollo/client";

export type MultiPoints = {
  open: number;
  high: number;
  low: number;
  close: number;
}

export type ChartData = {
  multiPoints: MultiPoints;
  x: number;
  y: number;
}

export type Answer = {
  key: string;
  answer: string;
  value?: string;
  xCell?: number;
  yCell?: number;
  x?: number;
  y?: number;
}

export type Cell = {
  header: string;
  position: number;
}

export type CellValue = {
  value: string | number;
  xCell: number;
  yCell: number;
}

export type Question = {
  question: string;
  correctAnswers: Answer[];
  
}

export type InteractiveTableQuestion = Question & {
  answers: Answer[];
  tableData: CellValue[];
  rowHeaders: Cell[];
  columnHeaders: Cell[];
  answerType: string;
}

export type MultiChoiceQuestion = Question & {
  answers: Answer[];
}

export type InteractiveChartQuestion = Question & {
  xType: string;
  yType: string;
  xAxisLabel: string;
  yAxisLabel: string;
  chartType: "line" | "candlestick";
  chartData: ChartData[];
  interactiveChartData: ChartData[];
  correctAnswer: Answer;
}

export type ExamQuestionType = {
  explanation: string;
  lessonModule: number;
  multiChoiceQuestion?: MultiChoiceQuestion;
  fillInQuestion?: Question;
  interactiveTableQuestion?: InteractiveTableQuestion;
  interactiveChartQuestion?: InteractiveChartQuestion;
  tags: {
    data: {
      attributes: {
        displayName: string;
        color: string;
      }
    }
  }
}

export type ExamQuestionResponse = {
  examQuestions: {
    data: {
      attributes: ExamQuestionType
    }[]
  }
}

export type Datum = {
  [key: string]: number | string;
}

export const examQuestionsQuery: DocumentNode = gql`
  query ExamQuestions($lessonModule: Float) {
    examQuestions(filters: {lessonModule: {eq: $lessonModule }}) {
      data {
        attributes {
          tags {
            data {
              attributes {
                displayName
                color
              }
            }
          }
          explanation
          lessonModule
          multiChoiceQuestion {
            question
            answers {
              answer
              key
            }
            correctAnswers {
              key
            }
          }
          fillInQuestion {
            question
            correctAnswers {
              answer
            }
          }
          interactiveTableQuestion {
            question
            answerType
            tableData(pagination: { page: 1, pageSize: 100 }) {
              value
              xCell
              yCell
            }
            correctAnswers {
              value
              xCell
              yCell
            }
            rowHeaders {
              header
              position
            }
            columnHeaders {
              header
              position
            }
          }
          interactiveChartQuestion {
            xType
            yType
            xAxisLabel
            yAxisLabel
            question
            chartType
            chartData(pagination: { page: 1, pageSize: 100 }) {
              x
              y
              multiPoints
            }
            correctAnswer {
              x
              y
            }
          }
        }
      }
    }
  }
`