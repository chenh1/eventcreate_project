import { gql, DocumentNode } from "@apollo/client";

const homePageQuery: DocumentNode = gql`
  query HomePage {
    homePage {
      data {
        attributes {
          heroCopy
          heroCta {
            copy
            url
          }
          heroDescription
          midwayTagline
          step1
          step2
          step3
          promo1Title
          promo1Description
          promo1Cta {
            copy
            url
          }
          promo2Title
          promo2Description
          promo2Cta {
            copy
            url
          }
        }
      }
    }
  }
`;

export default homePageQuery;