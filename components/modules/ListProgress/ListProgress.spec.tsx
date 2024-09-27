import { ListProgress } from "./ListProgress";
import { render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


it('renders ListProgress module', async () => {
  const { getByTestId, asFragment } = render(
    <ListProgress
      rawTree={{
        name: "level 1", isCompleted: false, children: [] 
      }}
      allLearningPaths={{
        title: "Intro to cooking", level: "", description: "", rawTree: { name: "level 1", isCompleted: false, children: [] } 
      }}
      progressData={{
        currentModule: {
          lessonModule: "1.01"
        },
        completedModules: [
          { lessonModule: "1.01", examScore: 100 },
          { lessonModule: "1.02", examScore: 100 }
        ]
      }}
      availableModules={[
        { attributes: { title: "Intro to cooking", url: "https://www.test.com", description: "test", transcript: "test", lessonModule: 1.01, tags: { data: [{ attributes: { displayName: "Tag 1", color: "blue", value: "tag1" }}] } }},
        { attributes: { title: "Intermediate cooking", url: "https://www.test.com", description: "test", transcript: "test", lessonModule: 1.02, tags: { data: [{ attributes: { displayName: "Tag 1", color: "blue", value: "tag1" }}] } }},
        { attributes: { title: "Master chef", url: "https://www.test.com", description: "test", transcript: "test", lessonModule: 1.03, tags: { data: [{ attributes: { displayName: "Tag 1", color: "blue", value: "tag1" }}] } }}
      ]}
      dataCy="test"
    />
  )

  expect(asFragment()).toMatchSnapshot();
});
