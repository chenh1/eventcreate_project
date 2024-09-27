import { gql, DocumentNode } from "@apollo/client";
import type { TagRes } from "./tags";

export type Image = {
  data: {
    attributes: {
      url: string;
      width: number;
      height: number;
      alternativeText: string;
    }
  }
}

export type PostType = {
  id: string;
  attributes: {
    slug: string;
    tags: TagRes;
    title: string;
    content: any;
    createdAt: string;
    publishedAt: string;
    author: string;
    previewImage: Image;
  }
}

export type PostRes = {
  post: {
    data: PostType;
  }
}

export const postQuery: DocumentNode = gql`
  query Post($id: ID) {
    post (id: $id) {
      data {
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