import { gql, DocumentNode } from "@apollo/client";

export type HeaderData = {
  navLinks: {
    url: string;
    copy: string;
  }[]
}

export type HeaderDataRes = {
  header: {
    data: {
      attributes: HeaderData
    }
  }
}

export const headerQuery: DocumentNode = gql`
  query Header {
    header {
      data {
        attributes {
          navLinks {
            url
            copy
          }
        }
      }
    }
  }
`