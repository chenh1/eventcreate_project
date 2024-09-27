import { gql, DocumentNode } from "@apollo/client";

/**
 * updateMe({
      variables: {
        progressData: {
          completedModules: [ { lessonModule: 1.03, examScore: 0.2 } ]
        }
      }
    })
 */

export const updateMeMutation: DocumentNode = gql`
  mutation UpdateMe($progressData: JSON) {
    updateMe(progressData: $progressData)
  }
`;