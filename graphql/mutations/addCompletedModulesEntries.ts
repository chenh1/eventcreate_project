import { gql, DocumentNode } from "@apollo/client";

export const addCompletedModulesEntriesMutation: DocumentNode = gql`
  mutation AddCompletedModulesEntries($moduleData: [ ModuleData ]) {
    addCompletedModulesEntries(moduleData: $moduleData)
  }
`;