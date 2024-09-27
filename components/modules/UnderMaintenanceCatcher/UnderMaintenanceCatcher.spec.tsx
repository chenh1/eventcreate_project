import { UnderMaintenanceCatcher } from "./UnderMaintenanceCatcher";
import { MockedProvider } from "@apollo/client/testing";
import { flippersQuery } from "../../../graphql/queries/flippers";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { JSDOM } from "jsdom"
// import { resetPasswordMutation } from "../../../graphql/mutations/resetPassword";
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window


jest.mock("next/navigation", () => ({
  useSearchParams: () => {
    return {
      get: () => "1",
      keys: () => []
    }
  }
}));

const getMocks = (isMaintenanceMode) => ([
  {
    request: {
      query: flippersQuery,
    },
    result: {
      data: {
        flippers: {
          data: {
            attributes: { maintenanceMode: isMaintenanceMode }
          }
        }
      }
    }
  }
])

it('renders a maintenance module in offline state', async () => {
  const { getByTestId, container } = render(
    <MockedProvider mocks={getMocks(true)}>
      <UnderMaintenanceCatcher 
        isOffline={true}
        error={"ReferenceError: "}
      />
    </MockedProvider>
  )

  expect(container).toMatchSnapshot();
});

it('renders a maintenance module in no data state', async () => {
  const { getByTestId, container } = render(
    <MockedProvider mocks={getMocks(true)}>
      <UnderMaintenanceCatcher 
        isOffline={false}
        noData={true}
        error={"ReferenceError: "}
      />
    </MockedProvider>
  )

  expect(container).toMatchSnapshot();
});

it('renders a generic maintenance module', async () => {
  const { getByTestId, container } = render(
    <MockedProvider mocks={getMocks(true)}>
      <UnderMaintenanceCatcher 
        isOffline={false}
        noData={false}
        error={"ReferenceError: "}
      />
    </MockedProvider>
  )

  expect(container).toMatchSnapshot();
});

it('renders the child component since not in maintenance', async () => {
  const { getByTestId, container } = render(
    <MockedProvider mocks={getMocks(false)}>
      <UnderMaintenanceCatcher 
        isOffline={false}
        noData={false}
      >
        <p>Sucessfully loaded</p>
      </UnderMaintenanceCatcher>
    </MockedProvider>
  )

  expect(container).toMatchSnapshot();
});
