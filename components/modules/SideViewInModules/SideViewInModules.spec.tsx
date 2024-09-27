import { myDataQuery } from "../../../graphql/queries/myData";
import { allLearningPathsQuery } from "../../../graphql/queries/learningPaths";
import { videosQuery } from "../../../graphql/queries/videos";
import { SideViewInModules } from "./SideViewInModules";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
// import { resetPasswordMutation } from "../../../graphql/mutations/resetPassword";
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}))
import { useSession } from "next-auth/react";
const mockedUseSession = useSession as jest.Mock;

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      replace: (arg) => null
    };
  },
  useParams() {
    return {
      id: "1"
    }
  },
  useSearchParams: () => {
    return {
      get: () => "123"
    }
  }
}));

jest.mock("@visx/responsive", () => ({
  ParentSize: ({ children }: { children: (size: { width: number, height: number }) => JSX.Element }) => children({ width: 100, height: 100 })
}))

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
      query: allLearningPathsQuery
    },
    result: {
      data: {
        learningPaths: {
          data: [
            { attributes: { title: "Intro to cooking", level: "1", description: "Learn the basics of cooking", rawTree: JSON.parse(JSON.stringify({ name: "Lesson 1", description: "Some description", isCompleted: false, children: [ { name: "Lesson 2", description: "Some description", isCompleted: false, children: [] } ] })) } },
            { attributes: { title: "Intermediate cooking", level: "2", description: "Take the next steps", rawTree: JSON.parse(JSON.stringify({ name: "Lesson 1", description: "Some description", isCompleted: false, children: [ { name: "Lesson 2", description: "Some description", isCompleted: false, children: [] } ] })) } },
            { attributes: { title: "Master chef", level: "3", description: "Gain master in cooking", rawTree: JSON.parse(JSON.stringify({ name: "Lesson 1", description: "Some description", isCompleted: false, children: [ { name: "Lesson 2", description: "Some description", isCompleted: false, children: [] } ] })) } }
          ]
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


it('renders the side view paths module', async () => {
  mockedUseSession.mockImplementation(() => ({ status: "authenticated" }));

  const { getByTestId, container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SideViewInModules 
        isVertical={true} 
        lessonModule={1.01}
        availableModules={[
          { attributes: { title: "Intro to cooking", url: "https://www.test.com", description: "test", transcript: "test", lessonModule: 1.01, tags: { data: [{ attributes: { displayName: "Tag 1", color: "blue", value: "tag1" }}] } }},
          { attributes: { title: "Intermediate cooking", url: "https://www.test.com", description: "test", transcript: "test", lessonModule: 1.02, tags: { data: [{ attributes: { displayName: "Tag 1", color: "blue", value: "tag1" }}] } }},
          { attributes: { title: "Master chef", url: "https://www.test.com", description: "test", transcript: "test", lessonModule: 1.03, tags: { data: [{ attributes: { displayName: "Tag 1", color: "blue", value: "tag1" }}] } }}
        ]}
        rawTree={{
          name: "1.01", isCompleted: false, children: [ {
            name: "1.02", isCompleted: false, children: [ {
              name: "1.03", isCompleted: false, children: [] 
            }] 
          }] 
        }}
      />
    </MockedProvider>
  )

  expect(container).toMatchSnapshot();
});
