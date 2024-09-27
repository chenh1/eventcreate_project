import { gql, DocumentNode } from "@apollo/client";

export type RawTree = {
  name: string;
  isCompleted: boolean;
  children?: RawTree[]
}

export const learningPathsQuery: DocumentNode = gql`
  query LearningPaths($level: Int) {
    learningPaths(sort: "level:asc", filters: {level: {eq: $level }}) {
      data {
        attributes {
          title
          level
          description
          rawTree
        }
      }
    }
  }
`

export const allLearningPathsQuery: DocumentNode = gql`
  query LearningPaths {
    learningPaths(sort: "level:asc") {
      data {
        attributes {
          title
          level
          description
          rawTree
        }
      }
    }
  }
`