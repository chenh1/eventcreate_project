import renderer from 'react-test-renderer';
import { AdContainer } from './AdContainer';
import { AdProvider } from './AdProvider';
import { MockedProvider } from "@apollo/client/testing";
import postTags from '../ads/tags/post'
import { flippersQuery } from '../../graphql/queries/flippers';
import { JSDOM } from "jsdom"
import { render, waitFor } from '@testing-library/react';
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.mock('next/script', () => {
  // eslint-disable-next-line react/display-name, react/prop-types
  return function ({ children, 'data-testid': dataTestId, ...props }) {
    return (
      <script data-testid={dataTestId} {...props}>
        {children}
      </script>
    );
  };
});

const mocks = [
  {
    request: {
      query: flippersQuery,
    },
    result: {
      data: {
        flipperManager: {
          data: {
            attributes: { ads: true }
          }
        }
      }
    }
  }
];

it('outputs an ad wrapper div', async () => {
  const { getByTestId, asFragment } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AdProvider tags={postTags}>
        <AdContainer align="center" elId="leaderboard1"/>
      </AdProvider>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});