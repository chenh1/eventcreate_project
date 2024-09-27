import { gql, DocumentNode } from "@apollo/client";

export const flippersQuery: DocumentNode = gql`
  query FlipperManager {
    flipperManager {
      data {
        attributes {
          ads
          adsPostsPage
          adsPostPage
          adsDashboard
          adsModuleLearnView
          adsModuleExamView
          testMode
          maintenanceMode
        }
      }
    }
  }
`;
