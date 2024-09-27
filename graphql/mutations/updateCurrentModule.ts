import { gql, DocumentNode } from "@apollo/client";

export const updateCurrentModuleMutation: DocumentNode = gql`
  mutation UpdateCurrentModule($moduleData: ModuleData, $completedModuleData: ModuleData) {
    updateCurrentModule(moduleData: $moduleData, completedModuleData: $completedModuleData)
  }
`;