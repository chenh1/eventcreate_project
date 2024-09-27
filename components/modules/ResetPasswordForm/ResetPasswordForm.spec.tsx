import { ResetPasswordForm } from "./ResetPasswordForm";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
// import { resetPasswordMutation } from "../../../graphql/mutations/resetPassword";
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      replace: (arg) => null
    };
  },
  useSearchParams: () => {
    return {
      get: () => "123"
    }
  }
}));

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


it('renders Reset Password Form module', async () => {
  const { getByTestId, asFragment } = render(
    <ResetPasswordForm />
  )

  expect(asFragment()).toMatchSnapshot();
});
