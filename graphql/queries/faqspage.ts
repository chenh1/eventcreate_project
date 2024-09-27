import { gql, DocumentNode } from "@apollo/client";

const faqsPageQuery: DocumentNode = gql`
  query FaqsPage {
    faqsPage {
      data {
        attributes {
          title
          description
          faq(pagination: { page: 1, pageSize: 50 }) {
            question
            answer
            category {
              data {
                attributes {
                  displayName
                  value
                }
              }
            }
            answerRich
          }
        }
      }
    }
  }
`;

export default faqsPageQuery;