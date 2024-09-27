import { Header } from "./Header";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
import AuthProvider from "../../utils/AuthProvider";
import { headerQuery } from "../../../graphql/queries/header";
import { flippersQuery } from "../../../graphql/queries/flippers";
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock("next/navigation", () => ({
  useSearchParams() {
    return {
      get: () => 'test'
    }
  },
  usePathname() {
    return "/test"
  }
}));

jest.mock("react-markdown", () => ({ children }) => <div>{children}</div>);
jest.mock("rehype-raw", () => ({ children }) => <div>{children}</div>);
jest.mock("next/link", () => ({ url, children }) => <a href={url}>children</a>);
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}))
import { useSession } from "next-auth/react";
const mockedUseSession = useSession as jest.Mock;

const mocks = [
  {
    request: {
      query: headerQuery
    },
    result: {
      data: {
        header: {
          data: {
            attributes: {
              navLinks: [
                {
                  url: "https://test.com",
                  copy: "Test Link"
                },
                {
                  url: "https://test2.com",
                  copy: "Test Link 2"
                }
              ]
            }
          }
        }
      }
    }
  },
  {
    request: {
      query: flippersQuery
    },
    result: {
      data: {
        flipperManager: {
          data: {
            attributes: { maintenanceMode: false }
          }
        }
      }
    }
  }
];


it('Header module with profile icon if logged in', async () => {
  mockedUseSession.mockImplementation(() => ({ status: "authenticated" }));

  const { container } = render(
    <MockedProvider mocks={mocks}>
      <Header />
    </MockedProvider>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));

  expect(container).toMatchSnapshot();
});


it('Header module with login link if logged out', async () => {
  mockedUseSession.mockImplementation(() => ({ status: "unauthenticated" }));

  const { container } = render(
    <MockedProvider mocks={mocks}>
      <Header />
    </MockedProvider>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));

  expect(container).toMatchSnapshot();
});
