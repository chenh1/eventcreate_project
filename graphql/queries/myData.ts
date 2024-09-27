import { gql, DocumentNode } from "@apollo/client";

export type ProgressData = {
  currentModule?: {
    lessonModule?: string;
  };
  completedModules?: Array<{
    lessonModule: string;
    examScore?: number;
  }>;
}

export type MyDataRes = {
  myData: {
    progressData: ProgressData
  } | {};
}

export const myDataQuery: DocumentNode = gql`
  query MyData {
    myData {
      progressData
    }
  }
`;
