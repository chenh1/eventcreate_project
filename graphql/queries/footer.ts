import { gql, DocumentNode } from "@apollo/client";

export type FooterData = {
  linkGroups: {
    title: string;
    link: {
      url: string;
      copy: string;
    }[]
  }[];
  disclaimer: string;
}

export type FooterDataRes = {
  footer: {
    data: {
      attributes: FooterData
    }
  }
}

export const footerQuery: DocumentNode = gql`
  query Footer {
    footer {
      data {
        attributes {
          linkGroups {
            link {
              url
              copy
            }
            title
          }
          disclaimer
        }
      }
    }
  }
`