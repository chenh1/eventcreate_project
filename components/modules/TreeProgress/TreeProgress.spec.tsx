import { TreeProgress } from "./TreeProgress";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
// import { resetPasswordMutation } from "../../../graphql/mutations/resetPassword";
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

it('renders a tree progress module', async () => {
  const { getByTestId, container } = render(
    <TreeProgress 
      progressData={{
        currentModule: {
          lessonModule: "1.01"
        },
        completedModules: [
          { lessonModule: "1.01", examScore: 100 },
          { lessonModule: "1.02", examScore: 100 }
        ]
      }}
      isVertical={true} 
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
  )

  expect(container).toMatchSnapshot();
});
