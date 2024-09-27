import { gql, DocumentNode } from "@apollo/client";
import type { PostType } from "./post";

export type PostsRes = {
  posts: {
    data: PostType[]
  }
}

export const postsQuery: DocumentNode = gql`
  query Posts($page: Int, $pageSize: Int, $in: [String], $sort: [String], $ne: ID, $tagNe: String) {
    posts (sort: $sort, pagination: { page: $page, pageSize: $pageSize }, filters: { id: { ne: $ne }, tags: {value: { in: $in, ne: $tagNe }} } ) {
      data {
        id
        attributes {
          slug
          previewImage {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
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
          createdAt
          publishedAt
          author
        }
      }
    }
  }
`