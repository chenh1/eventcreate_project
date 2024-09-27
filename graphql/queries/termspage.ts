import { gql, DocumentNode } from "@apollo/client";

const termsPageQuery: DocumentNode = gql`
  query TermsPage {
    termsPage {
      data {
        attributes {
          title
          content
        }
      }
    }
  }
`;

export default termsPageQuery;