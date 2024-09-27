import { LearnView } from "./LearnView";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock("react-markdown", () => ({ children }) => <div>{children}</div>);
jest.mock("rehype-raw", () => ({ children }) => <div>{children}</div>);
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}))
import { useSession } from "next-auth/react";
const mockedUseSession = useSession as jest.Mock;


it('renders an empty wrapper if no question data is passed in', async () => {
  mockedUseSession.mockImplementation(() => ({ status: "authenticated" }));
  
  const { asFragment } = render(
    <LearnView
      video={{
        title: 'Test Video',
        description: 'Test Description',
        url: 'https://test.com',
        transcript: 'Test Transcript',
        lessonModule: 1,
        tags: { data: [] }
      }}
      setMode={(str) => str}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
