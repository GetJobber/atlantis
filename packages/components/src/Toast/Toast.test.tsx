import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { showToast } from ".";

jest.mock("framer-motion", () => ({
  motion: {
    div: require("react").forwardRef(({ children, ...rest }, ref) => (
      <div {...rest} ref={ref}>
        {children}
      </div>
    )),
  },
  AnimatePresence: jest
    .fn()
    .mockImplementation(({ children }) => <>{children}</>),
  default: jest.fn(),
}));

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
});

afterEach(() => {
  act(() => jest.runOnlyPendingTimers());
  jest.useRealTimers();
});

const successMessage =
  "Successful Message that should last the full 5 seconds, it just needs to be 50 characters long";
const infoMessage = "Bland Toast";
const errorMessage = "Errorful should last inbetween min-max";

it("creates exactly one toasts target div", () => {
  const { getByText, getAllByText } = render(<MockToast />);
  fireEvent.click(getByText("Success"));

  expect(document.querySelector("#atlantis-toast-element")).toBeInTheDocument();

  fireEvent.click(getByText("Success"));
  expect(getAllByText(successMessage)).toHaveLength(2);

  expect(document.querySelectorAll("#atlantis-toast-element")).toHaveLength(1);
});

it("renders a Slice of Toast when the 'showToast' method is called", () => {
  const { getByText, queryByText } = render(<MockToast />);
  expect(queryByText(successMessage)).not.toBeInTheDocument();

  fireEvent.click(getByText("Success"));
  expect(getByText(successMessage)).toBeInTheDocument();
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

it("sets a timer and clears the Slice after a certain amount of time", async () => {
  const { getByText, queryAllByText, findAllByText } = render(<MockToast />);

  fireEvent.click(getByText("No Variation"));
  expect(setTimeout).toHaveBeenCalled();
  expect(await findAllByText(infoMessage)).toHaveLength(1);

  act(() => {
    jest.runAllTimers();
  });

  await waitFor(() => {
    expect(queryAllByText("Bland Toast").length).toBe(0);
  });
});

it("stops and starts the timer when the item is hover toggled", async () => {
  const { getByText, queryAllByText } = render(<MockToast />);

  fireEvent.click(getByText("No Variation"));
  expect(setTimeout).toHaveBeenCalled();
  expect(queryAllByText("Bland Toast").length).toBe(1);

  fireEvent.mouseEnter(getByText("Bland Toast"));

  act(() => {
    jest.advanceTimersByTime(10000);
  });

  expect(queryAllByText("Bland Toast")).toHaveLength(1);

  fireEvent.mouseLeave(getByText("Bland Toast"));

  act(() => {
    jest.advanceTimersByTime(10000);
  });

  await waitFor(() => {
    expect(queryAllByText("Bland Toast")).toHaveLength(0);
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
