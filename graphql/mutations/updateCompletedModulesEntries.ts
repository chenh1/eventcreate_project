import { gql, DocumentNode } from "@apollo/client";

export const updateCompletedModulesEntriesMutation: DocumentNode = gql`
  mutation UpdateCompletedModulesEntries($moduleData: [ ModuleData ]) {
    updateCompletedModulesEntries(moduleData: $moduleData)
  }
`;