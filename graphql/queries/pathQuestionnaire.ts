import { gql, DocumentNode } from "@apollo/client";

export type PathQuestion = {
  question: string;
  answers: {
    key: string;
    answer: string;
  }[]
}

export type PathQuestionnaireMapping = {
  questionNumber: number;
  answerToAttribute: {
    attribute: string;
    points: number;
    answerKey: string;
  }
}

export type PathQuestionnaireType = {
  questions: PathQuestion[];
  pathQuestionnaireMappings: PathQuestionnaireMapping[];
}

export type PathQuestionnaireRes = {
  pathQuestionnaire: {
    data: {
      attributes: PathQuestionnaireType
    }[]
  }
}

const pathQuestionnaireQuery: DocumentNode = gql`
  query PathQuestionnaire {
    pathQuestionnaire {
      data {
        attributes {
          questions {
            question
            answers {
              key
              answer
            }
          }
          pathQuestionnaireMappings {
            questionNumber
            answerToAttribute {
              attribute
              points
              answerKey
            }
          }
        }
      }
    }
  }
`;

export default pathQuestionnaireQuery;