import { LoginForm } from "./LoginForm";
import { fireEvent, render } from '@testing-library/react';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock("@apollo/client", () => ({
  useMutation: jest.fn(),
  gql: jest.fn()
}));

import { useMutation } from "@apollo/client";
const mockedUseMutation = useMutation as jest.Mock;

mockedUseMutation.mockImplementation((mutationDocument, onEvents) => {
  return [
    () => null,
    { data: {} }
  ]
})


it('renders LoginForm module', async () => {
  const { getByTestId, asFragment } = render(
    <LoginForm toggleVisibility={() => {}} defaultIsRegistering={false} />
  )

  expect(asFragment()).toMatchSnapshot();
});

it('shows registration form module', async () => {
  const { getByTestId, asFragment } = render(
    <LoginForm toggleVisibility={() => {}} defaultIsRegistering={true} />
  )

  expect(asFragment()).toMatchSnapshot();
});

it('shows reset form module and reverts back if cancelled', async () => {
  const { getByTestId, asFragment } = render(
    <LoginForm toggleVisibility={() => {}} defaultIsRegistering={false} />
  )

  fireEvent.click(getByTestId("openForgotPassword"))

  expect(asFragment()).toMatchSnapshot();

  fireEvent.click(getByTestId("cancelForgotPassword"))

  expect(asFragment()).toMatchSnapshot();
});
