import { Footer } from "./Footer";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
import { footerQuery } from "../../../graphql/queries/footer";
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock("react-markdown", () => ({ children }) => <div>{children}</div>);
jest.mock("rehype-raw", () => ({ children }) => <div>{children}</div>);
jest.mock("next/link", () => ({ url, children }) => <a href={url}>children</a>);

const mocks = [
  {
    request: {
      query: footerQuery
    },
    result: {
      data: {
        footer: {
          data: {
            attributes: {
              disclaimer: "Test Disclaimer",
              linkGroups: [
                {
                  title: "Test Title",
                  link: [
                    {
                      copy: "Test Link",
                      url: "https://test.com"
                    },
                    {
                      copy: "Test Link 2",
                      url: "https://test2.com"
                    }
                  ]
                },
                {
                  title: "Test Title 2",
                  link: [
                    {
                      copy: "Test Link 2",
                      url: "https://test2.com"
                    },
                    {
                      copy: "Test Link 3",
                      url: "https://test3.com"
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    }
  }
];


it('renders Footer module', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <Footer />
    </MockedProvider>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 800)));

  expect(container).toMatchSnapshot();
});
