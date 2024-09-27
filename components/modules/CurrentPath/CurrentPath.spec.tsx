import { CurrentPath } from "./CurrentPath";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
import { videosQuery } from "../../../graphql/queries/videos";
import pathQuestionnaireQuery from "../../../graphql/queries/pathQuestionnaire";
import { allLearningPathsQuery } from "../../../graphql/queries/learningPaths";
import AuthProvider from "../../utils/AuthProvider";
import { myDataQuery } from "../../../graphql/queries/myData";
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


jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  },
  useSearchParams: () => {
    return {
      get: () => "1",
      keys: () => []
    }
  }
}));

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
      query: pathQuestionnaireQuery
    },
    result: {
      data: {
        pathQuestionnaire: {
          data: [
            {
              attributes: {
                questions: [
                  {
                    question: "Question 1",
                    answers: [
                      {
                        key: "1",
                        answer: "Answer 1"
                      },
                      {
                        key: "2",
                        answer: "Answer 2"
                      }
                    ]
                  }
                ],
                pathQuestionnaireMappings: [
                  {
                    questionNumber: 1,
                    answerToAttribute: {
                      attribute: "attribute1",
                      points: 1,
                      answerKey: "1"
                    }
                  }
                ]
              }
            }
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
];


it('renders multiple series of lessons in a vertical node format', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <AuthProvider>
        <CurrentPath />
      </AuthProvider>
    </MockedProvider>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));

  expect(container).toMatchSnapshot();
});
