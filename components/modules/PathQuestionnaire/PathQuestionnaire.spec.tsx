import { PathQuestionnaire } from "./PathQuestionnaire";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));

import { useRouter } from "next/navigation";
const mockedUseRouter = useRouter as jest.Mock;
const push = jest.fn();

mockedUseRouter.mockImplementation(() => ({
  prefetch: () => null,
  push: push
}));

it('renders PathQuestionnaire module', async () => {
  const { getByTestId, asFragment } = render(
    <PathQuestionnaire
      questions={[
        { question: "Are you happy?", answers: [{ key: "yes", answer: "yes" }, { key: "no", answer: "no" }] },
        { question: "Are you content?", answers: [{ key: "yes", answer: "yes" }, { key: "no", answer: "no" }] },
      ]}
    />
  )

  expect(asFragment()).toMatchSnapshot();
});

it('appends answers to query string for parsing of archetypes', async () => {
  const { getAllByTestId, asFragment } = render(
    <PathQuestionnaire
      questions={[
        { question: "Are you happy?", answers: [{ key: "yes", answer: "yes" }, { key: "no", answer: "no" }] },
        { question: "Are you content?", answers: [{ key: "yes", answer: "yes" }, { key: "no", answer: "no" }] },
      ]}
    />
  )

  fireEvent.click(getAllByTestId("button")[0])
  fireEvent.click(getAllByTestId("button")[0])
  fireEvent.click(getAllByTestId("button")[0])
  
  expect(push).toHaveBeenCalledWith("/dashboard?q1=yes&q2=yes")
});
