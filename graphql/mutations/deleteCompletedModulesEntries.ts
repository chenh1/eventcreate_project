import { gql, DocumentNode } from "@apollo/client";

export const deleteCompletedModulesEntriesMutation: DocumentNode = gql`
  mutation DeleteCompletedModulesEntries($moduleData: [ ModuleData ]) {
    deleteCompletedModulesEntries(moduleData: $moduleData)
  }
`;