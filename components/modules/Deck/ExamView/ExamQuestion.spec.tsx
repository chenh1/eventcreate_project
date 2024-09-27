import { ExamQuestion } from "./ExamQuestion";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock("@visx/responsive", () => ({
  ParentSize: ({ children }: { children: (size: { width: number, height: number }) => JSX.Element }) => children({ width: 100, height: 100 })
}))

// mock LocalResizeObserver
global.LocalResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))


it('renders an exam question with multiple choice', async () => {
  const { getByTestId, asFragment } = render(
    <ExamQuestion
      invokeNextQuestion={() => {}}
      incrementCorrectAnswers={() => {}}
      question={{
        explanation: 'Explanation',
        lessonModule: 1.01,
        tags: {
          data: {
            attributes: {
              displayName: 'Tag',
              color: 'red',
            },
          },
        },
        multiChoiceQuestion: {
          question: 'What is 1 + 1?',
          answers: [
            { key: '2', answer: '2', value: '2' },
            { key: '3', answer: '3', value: '3' },
            { key: '4', answer: '4', value: '4' },
            { key: '5', answer: '5', value: '5' },
          ],
          correctAnswers: [{ key: '2', answer: '2', value: '2' }],
        }
      }}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders an exam question with a fill-in field', async () => {
  const { getByTestId, asFragment } = render(
    <ExamQuestion
      invokeNextQuestion={() => {}}
      incrementCorrectAnswers={() => {}}
      question={{
        explanation: 'Explanation',
        lessonModule: 1.01,
        tags: {
          data: {
            attributes: {
              displayName: 'Tag',
              color: 'red',
            },
          },
        },
        fillInQuestion: {
          question: 'What is 1 + 1?',
          correctAnswers: [{ key: '2', answer: '2', value: '2' }],
        },
      }}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

it('renders an exam question with an interactive table', async () => {
  const { getByTestId, asFragment } = render(
    <ExamQuestion
      invokeNextQuestion={() => {}}
      incrementCorrectAnswers={() => {}}
      question={{
        explanation: 'Explanation',
        lessonModule: 1.01,
        tags: {
          data: {
            attributes: {
              displayName: 'Tag',
              color: 'red',
            },
          },
        },
        interactiveTableQuestion: {
          question: 'What is 1 + 1?',
          answerType: 'number',
          tableData: [
            { value: '2', xCell: 0, yCell: 0 },
            { value: '3', xCell: 1, yCell: 0 },
            { value: '4', xCell: 2, yCell: 0 },
            { value: '5', xCell: 3, yCell: 0 },
          ],
          answers: [{ key: '2', answer: '2', value: '2', xCell: 0, yCell: 0 }],
          correctAnswers: [{ key: '2', answer: '2', value: '2', xCell: 0, yCell: 0 }],
          rowHeaders: [{ header: 'Row 1', position: 0 }],
          columnHeaders: [{ header: 'Column 1', position: 0 }],
        },
      }}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

// it('renders an exam question with an interactive chart', async () => {
//   const { getByTestId, asFragment } = render(
//     <ExamQuestion
//       invokeNextQuestion={() => {}}
//       incrementCorrectAnswers={() => {}}
//       question={{
//         explanation: 'Explanation',
//         lessonModule: 1.01,
//         tags: {
//           data: {
//             attributes: {
//               displayName: 'Tag',
//               color: 'red',
//             },
//           },
//         },
//         interactiveChartQuestion: {
//           xType: 'number',
//           yType: 'number',
//           xAxisLabel: 'X Axis',
//           yAxisLabel: 'Y Axis',
//           question: 'What is 1 + 1?',
//           chartType: 'line',
//           chartData: [
//             { x: 1, y: 1, multiPoints: { open: 1, close: 1, low: 1, high: 1 }},
//             { x: 2, y: 2, multiPoints: { open: 2, close: 2, low: 2, high: 2 }},
//             { x: 3, y: 3, multiPoints: { open: 3, close: 3, low: 3, high: 3 }},
//           ],
//           correctAnswers: [{ x: 2, y: 2, key: '2', answer: '2' }],
//           correctAnswer: { x: 2, y: 2, key: '2', answer: '2' },
//           interactiveChartData: []
//         },
//       }}
//     />
//   );

//   expect(asFragment()).toMatchSnapshot();
// });

it('renders an empty wrapper if no question data is passed in', async () => {
  const { getByTestId, asFragment } = render(
    <ExamQuestion
      invokeNextQuestion={() => {}}
      incrementCorrectAnswers={() => {}}
      question={{
        explanation: 'Explanation',
        lessonModule: 1.01,
        tags: {
          data: {
            attributes: {
              displayName: 'Tag',
              color: 'red',
            },
          },
        }
      }}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
