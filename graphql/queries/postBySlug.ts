import { gql, DocumentNode } from "@apollo/client";

export const postBySlugQuery: DocumentNode = gql`
  query PostBySlug($slug: String) {
    posts (filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          slug
          tags {
            data {
              attributes {
                displayName
                value
                color
              }
            }
          }
          title
          content
          createdAt
          publishedAt
          author
        }
      }
    }
  }
`