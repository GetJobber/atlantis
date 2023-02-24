import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { showToast } from ".";

beforeEach(() => jest.useFakeTimers());

afterEach(() => {
  cleanup();
  jest.clearAllTimers();
  document.body.innerHTML = ``;
});

const successMessage =
  "Successful Message that should last the full 5 seconds, it just needs to be 50 characters long";
const infoMessage = "Bland Toast";
const errorMessage = "Errorful should last inbetween min-max";

it("creates the placeholder div on showToast call", () => {
  const { getByText } = render(<MockToast />);
  expect(document.querySelector(`#atlantis-toast-element`)).not.toBeInstanceOf(
    HTMLDivElement,
  );

  fireEvent.click(getByText("No Variation"));

  expect(document.querySelector(`#atlantis-toast-element`)).toBeInstanceOf(
    HTMLDivElement,
  );
});

it("renders a Slice of Toast when the 'showToast' method is called", () => {
  const { getByText } = render(<MockToast />);
  fireEvent.click(getByText("Success"));
  expect(getByText(successMessage)).toBeInstanceOf(HTMLSpanElement);
});

it("shows a the checkmark icon for success toast", () => {
  const { getByText, getByTestId } = render(<MockToast />);
  fireEvent.click(getByText("Success"));
  expect(getByTestId("checkmark")).toBeInstanceOf(SVGElement);
});

it("renders an knot icon variation: 'info' is set", () => {
  const { getByText, getByTestId } = render(<MockToast />);
  fireEvent.click(getByText("No Variation"));
  expect(getByTestId("knot")).toBeInstanceOf(SVGElement);
});

it("renders an alert icon variation: 'error' is set", () => {
  const { getByText, getByTestId } = render(<MockToast />);
  fireEvent.click(getByText("Error"));
  expect(getByTestId("alert")).toBeInstanceOf(SVGElement);
});

it("fires an action callback when the action button is clicked", () => {
  const mockAction = jest.fn();
  const { getByText } = render(<MockToast mockAction={mockAction} />);

  fireEvent.click(getByText("No Variation"));
  fireEvent.click(getByText("Do The Action"));
  expect(mockAction).toHaveBeenCalledTimes(1);
});

it.only("sets a timer and clears the Slice after a certain amount of time", async done => {
  const { getByText, queryAllByText } = render(<MockToast />);

  fireEvent.click(getByText("No Variation"));
  expect(setTimeout).toHaveBeenCalled();
  expect(queryAllByText(infoMessage).length).toBe(1);

  await act(() => jest.runAllTimers());
  await waitFor(() => {
    expect(queryAllByText("Bland Toast")).not.toBeInTheDocument();
    expect(queryAllByText("Bland Toast").length).toBe(0);
  });
});

it("stops and starts the timer when the item is hover toggled", done => {
  const { getByText, queryAllByText } = render(<MockToast />);

  fireEvent.click(getByText("No Variation"));
  expect(setTimeout).toHaveBeenCalled();
  expect(queryAllByText("Bland Toast").length).toBe(1);

  fireEvent.mouseEnter(getByText("Bland Toast"));

  act(() => jest.runAllTimers());

  expect(queryAllByText("Bland Toast").length).toBe(1);
  expect(queryAllByText("Bland Toast").length).not.toBe(0);

  fireEvent.mouseLeave(getByText("Bland Toast"));

  act(() => jest.advanceTimersByTime(10000));

  waitFor(() => {
    expect(queryAllByText("Bland Toast").length).not.toBe(1);
    expect(queryAllByText("Bland Toast").length).toBe(0);
    done();
  });
});

/**
 * Mocks out an example of Toast for usage in tests
 */
interface MockToastProps {
  mockAction?(): void;
}
const MockToast = ({ mockAction }: MockToastProps) => {
  const buttons = [
    {
      label: "No Variation",
      onClick: () => {
        showToast({
          message: infoMessage,
          variation: "info",
          actionLabel: "Do The Action",
          action: () => mockAction && mockAction(),
        });
      },
    },
    {
      label: "Success",
      onClick: () => {
        showToast({
          message: successMessage,
        });
      },
    },
    {
      label: "Error",
      onClick: () => {
        showToast({
          message: errorMessage,
          variation: "error",
        });
      },
    },
  ];
  return (
    <>
      {buttons.map(({ label, onClick }) => (
        <button key={label} onClick={onClick}>
          {label}
        </button>
      ))}
    </>
  );
};
