import { RecommendedPosts } from "./RecommendedPosts";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
import { postsQuery } from "../../../graphql/queries/posts";
import { flippersQuery } from "../../../graphql/queries/flippers";
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock("next/link", () => ({ href, children }) => <span data-testid="buttonLink" data-href={href}>{children}</span>);

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
        ne: "0",
        in: ["recipes"],
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
                    { attributes: { displayName: "Test Article", value: "recipes", clientFacing: true, color: "hyper-red" } }
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
            { 
              id: "2",
              attributes: {
                slug: "/post/2",
                tags: {
                  data: [
                    { attributes: { displayName: "Test Article 3", value: "recipes", clientFacing: true, color: "hyper-red" } }
                  ]
                },
                title: "Test Article 3",
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
              id: "3",
              attributes: {
                slug: "/post/3",
                tags: {
                  data: [
                    { attributes: { displayName: "Test Article 4", value: "recipes", clientFacing: true, color: "hyper-red" } }
                  ]
                },
                title: "Test Article 4",
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
              id: "4",
              attributes: {
                slug: "/post/4",
                tags: {
                  data: [
                    { attributes: { displayName: "Test Article 5", value: "recipes", clientFacing: true, color: "hyper-red" } }
                  ]
                },
                title: "Test Article 5",
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


it('renders RecommendedPosts module', async () => {
  const { getByTestId, container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RecommendedPosts postId="0" relatedTags={{ data: [ { attributes: { displayName: "Important", value: "recipes", clientFacing: true, color: "hyper-red" } }] }} />
    </MockedProvider>
  )

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));

  expect(container).toMatchSnapshot();

  fireEvent.click(getByTestId('buttonLink'));

  expect(container).toMatchSnapshot();
});
