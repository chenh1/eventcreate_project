import { ConsentBanner } from "./ConsentBanner";
import { render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
import { usePathname } from "next/navigation";
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock('next/navigation', () => ({
  usePathname: () => "/",
}));

jest.mock('react-cookie', () => ({
  useCookies: jest.fn()
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }) => children
}));

import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";

const mockedUseCookies = useCookies as jest.Mock;
const mockedUseSession = useSession as jest.Mock;


it('displays the consent banner if unauthenticated and consent not given', async () => {
  mockedUseCookies.mockImplementation(() => [{ "consent:accepted": false }, jest.fn(), jest.fn()]);
  mockedUseSession.mockImplementation(() => ({ status: "unauthenticated" }));

  const { getByTestId, asFragment } = render(
    <ConsentBanner/>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));

  expect(asFragment()).toMatchSnapshot();
});


it('hides the consent banner if consent accepted', async () => {
  mockedUseCookies.mockImplementation(() => [{ "consent:accepted": true }, jest.fn(), jest.fn()]);
  mockedUseSession.mockImplementation(() => ({ status: "unauthenticated" }));

  const { getByTestId, asFragment } = render(
    <ConsentBanner/>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));

  expect(asFragment()).toMatchSnapshot();
});

it('hides the consent banner if user is authenticated', async () => {
  mockedUseCookies.mockImplementation(() => [{ "consent:accepted": false }, jest.fn(), jest.fn()]);
  mockedUseSession.mockImplementation(() => ({ status: "authenticated" }));

  const { getByTestId, asFragment } = render(
    <ConsentBanner/>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));

  expect(asFragment()).toMatchSnapshot();
});
