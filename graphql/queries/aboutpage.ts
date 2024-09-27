import { gql, DocumentNode } from "@apollo/client";

const aboutPageQuery: DocumentNode = gql`
  query AboutPage {
    aboutPage {
      data {
        attributes {
          title
          content
          topImage {
            data {
              attributes {
                url
                width
                height
                alternativeText
              }
            }
          }
        }
      }
    }
  }
`;

export default aboutPageQuery;