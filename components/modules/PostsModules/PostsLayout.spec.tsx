import { PostsLayout } from "./PostsLayout";
import { MockedProvider } from "@apollo/client/testing";
import { AdProvider } from "../../ads/AdProvider";
import postTags from '../../ads/tags/post'
import { render, waitFor } from '@testing-library/react';
import { postsQuery } from "../../../graphql/queries/posts";
import { JSDOM } from "jsdom"
import { flippersQuery } from "../../../graphql/queries/flippers";
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock("next/link", () => ({ url, children }) => <a href={url}>children</a>);

const mocks = [
  {
    request: {
      query: flippersQuery,
    },
    result: {
      data: {
        flipperManager: {
          data: {
            attributes: { testMode: false }
          }
        }
      }
    }
  },
  {
    request: {
      query: postsQuery,
      variables: {
        page: 1,
        pageSize: 12,
        sort: [ "createdAt:desc" ]
      },
    },
    result: {
      data: {
        posts: {
          data: [
            { 
              id: "0",
              attributes: {
                slug: "/post/0",
                tags: {
                  data: [
                    { attributes: { displayName: "Test Article", value: "equipment", clientFacing: true, color: "hyper-red" } }
                  ]
                },
                title: "Test Article",
                content: "Test Article Content",
                createdAt: "2021-08-02T00:00:00Z",
                publishedAt: "2021-08-02T00:00:00Z",
                author: "Test Author",
                previewImage: {
                  data: {
                    attributes: {
                      url: "https://www.example.com/image.jpg",
                      width: 100,
                      height: 100,
                      alternativeText: "Test Image"
                    }
                  }
                }
              }
            },
            { 
              id: "1",
              attributes: {
                slug: "/post/1",
                tags: {
                  data: [
                    { attributes: { displayName: "Test Article 2", value: "recipes", clientFacing: true, color: "hyper-red" } }
                  ]
                },
                title: "Test Article 2",
                content: "Test Article Content",
                createdAt: "2021-08-02T00:00:00Z",
                publishedAt: "2021-08-02T00:00:00Z",
                author: "Test Author",
                previewImage: {
                  data: {
                    attributes: {
                      url: "https://www.example.com/image.jpg",
                      width: 100,
                      height: 100,
                      alternativeText: "Test Image"
                    }
                  }
                }
              }
            },
          ]
        }
      }
    }
  }
]


it('renders PostsLayout module', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AdProvider tags={postTags}>
        <PostsLayout/>
      </AdProvider>
    </MockedProvider>
  )

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));

  expect(container).toMatchSnapshot();
});
