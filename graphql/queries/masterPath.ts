import { gql, DocumentNode } from "@apollo/client";

export const masterPathQuery: DocumentNode = gql`
  query MasterPath {
    masterPath {
      data {
        attributes {
          orderedPathArray
        }
      }
    }
  }
`