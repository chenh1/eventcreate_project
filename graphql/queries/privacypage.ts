import { gql, DocumentNode } from "@apollo/client";

const privacyPageQuery: DocumentNode = gql`
  query PrivacyPage {
    privacyPage {
      data {
        attributes {
          title
          content
        }
      }
    }
  }
`;

export default privacyPageQuery;