import { AllPaths } from "./AllPaths";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
import { allLearningPathsQuery } from "../../../graphql/queries/learningPaths";
import { videosQuery } from "../../../graphql/queries/videos";
import { myDataQuery } from "../../../graphql/queries/myData";
import AuthProvider from "../../utils/AuthProvider";
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  },
  useParams() {
    return {
      id: "1"
    }
  }
}));

jest.mock("@visx/responsive", () => ({
  ParentSize: ({ children }: { children: (size: { width: number, height: number }) => JSX.Element }) => children({ width: 100, height: 100 })
}))

// mock LocalResizeObserver
global.LocalResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))


const mocks = [
  {
    request: {
      query: allLearningPathsQuery,
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
      variables: { firstModule: 0, lastModule: 999 }
    },
    result: {
      data: {
        videos: {
          data: [
            { attributes: { title: "Video 1", url: "www.supercoolmastercheftime.com", description: "Video 1", transcript: "Some words", lessonModule: 1.01 }},
            { attributes: { title: "Video 2", url: "www.supercoolmastercheftime.com", description: "Video 2", transcript: "Some words again", lessonModule: 1.02 }}
          ]
        }
      }
    }
  },
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
];


it('renders multiple series of lessons in a vertical node format', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <AuthProvider>
        <AllPaths />
      </AuthProvider>
    </MockedProvider>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));

  expect(container).toMatchSnapshot();
});
