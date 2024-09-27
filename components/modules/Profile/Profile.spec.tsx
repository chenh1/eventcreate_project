import { Profile } from "./Profile";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
import { myDataQuery } from "../../../graphql/queries/myData";
import { videosQuery } from "../../../graphql/queries/videos";
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

const observe = jest.fn();
const unobserve = jest.fn();

// you can also pass the mock implementation
// to jest.fn as an argument
global.IntersectionObserver = jest.fn(function (callback, options) {
  return {
    observe,
    unobserve,
    root: null,
    rootMargin: '',
    thresholds: [],
    disconnect: jest.fn(),
    takeRecords: jest.fn(),
  };
});

jest.mock("next/link", () => ({ url, children }) => <a href={url}>children</a>);

const mocks = [
  {
    request: {
      query: myDataQuery,
    },
    result: {
      data: {
        myData: {
          progressData: {
            currentModule: {
              lessonModule: 1.01
            },
            completedModules: [
              { lessonModule: 1.01, examScore: 100 },
              { lessonModule: 1.02, examScore: 100 }
            ]
          }
        }
      }
    }
  },
  {
    request: {
      query: videosQuery,
    },
    result: {
      data: {
        videos: {
          data: [
            {
              attributes: {
                title: "Title 1",
                url: "https://www.youtube.com/watch?v=1",
                description: "Description 1",
                transcript: "Transcript 1",
                lessonModule: 1.01,
                tags: {
                  data: [
                    {
                      attributes: {
                        displayName: "Tag 1",
                        color: "red",
                        value: "tag1"
                      }
                    }
                  ]
                }
              }
            },
            {
              attributes: {
                title: "Title 2",
                url: "https://www.youtube.com/watch?v=2",
                description: "Description 2",
                transcript: "Transcript 2",
                lessonModule: 1.02,
                tags: {
                  data: [
                    {
                      attributes: {
                        displayName: "Tag 2",
                        color: "blue",
                        value: "tag2"
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  }
]

jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}))
import { useSession } from "next-auth/react";
const mockedUseSession = useSession as jest.Mock;


it('renders Profile module', async () => {
  mockedUseSession.mockImplementation(() => ({ status: "authenticated" }));

  const { getByTestId, container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Profile setIsLoggingOut={()=>{}}/>
    </MockedProvider>
  )

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));
  fireEvent.click(getByTestId('toggleProfile'));


  expect(container).toMatchSnapshot();
});
