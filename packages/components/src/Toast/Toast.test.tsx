import React, { useRef } from "react";
import renderer from "react-test-renderer";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
import { Toast, ToastRef } from ".";
import { Button } from "../Button";

beforeEach(() => jest.useFakeTimers());

afterEach(() => {
  cleanup();
  jest.clearAllTimers();
});

it("renders a Toast", () => {
  const tree = renderer.create(<Toast />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Slice of Toast when the 'add' method is called", () => {
  const { container, getByText } = render(<MockToast />);

  fireEvent.click(getByText("No Variation"));
  expect(getByText("Bland Toast")).toBeInstanceOf(HTMLDivElement);
  expect(container.querySelector("[name='knot']")).toBeInstanceOf(SVGElement);
});

it("renders a successful Slice of Toast when the variation: 'success' is set", () => {
  const { container, getByText } = render(<MockToast />);

  fireEvent.click(getByText("Success"));
  expect(container.querySelector("[name='checkmark']")).toBeInstanceOf(
    SVGElement,
  );
});

it("renders a error Slice of Toast when the variation: 'error' is set", () => {
  const { container, getByText } = render(<MockToast />);

  fireEvent.click(getByText("Error"));
  expect(container.querySelector("[name='alert']")).toBeInstanceOf(SVGElement);
});

it("fires an onClose callback when the close is clicked", () => {
  const mockClose = jest.fn();
  const { getByText, getByLabelText } = render(
    <MockToast mockOnClose={mockClose} />,
  );

  fireEvent.click(getByText("No Variation"));
  fireEvent.click(getByLabelText("Hide Notification"));
  expect(mockClose).toHaveBeenCalledTimes(1);
});

it("fires an action callback when the action button is clicked", () => {
  const mockAction = jest.fn();
  const { getByText } = render(<MockToast mockAction={mockAction} />);

  fireEvent.click(getByText("No Variation"));
  fireEvent.click(getByText("Do The Action"));
  expect(mockAction).toHaveBeenCalledTimes(1);
});

it("sets a timer and clears the Slice after a certain amount of time", done => {
  const { getByText, queryAllByText } = render(<MockToast />);

  fireEvent.click(getByText("No Variation"));
  expect(setTimeout).toHaveBeenCalled();
  expect(queryAllByText("Bland Toast").length).toBe(1);

  act(() => jest.runAllTimers());

  waitFor(() => {
    expect(queryAllByText("Bland Toast").length).not.toBe(1);
    expect(queryAllByText("Bland Toast").length).toBe(0);
    done();
  });
});

it("stops and starts the timer when the item is hover toggled", done => {
  const { getByText, queryAllByText } = render(<MockToast />);

  fireEvent.click(getByText("No Variation"));
  expect(setTimeout).toHaveBeenCalled();
  expect(queryAllByText("Bland Toast").length).toBe(1);

  fireEvent.mouseEnter(getByText("Bland Toast"));

  act(() => jest.advanceTimersByTime(10000));

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
  mockOnClose?(): void;
  mockAction?(): void;
}
const MockToast = ({ mockOnClose, mockAction }: MockToastProps) => {
  const toastRef = useRef<ToastRef>();
  const buttons = [
    {
      label: "No Variation",
      variation: "cancel",
      onClick: () => {
        toastRef.current.add({
          message: "Bland Toast",
          actionLabel: "Do The Action",
          action: () => mockAction && mockAction(),
          onClose: () => mockOnClose && mockOnClose(),
        });
      },
    },
    {
      label: "Success",
      onClick: () => {
        toastRef.current.add({
          message:
            "Successful Message that should last the full 5 seconds, it just needs to be 50 charachters long",
          variation: "success",
        });
      },
    },
    {
      label: "Error",
      onClick: () => {
        toastRef.current.add({
          message: "Errorful should last inbetween min-max",
          variation: "error",
        });
      },
    },
  ];
  return (
    <>
      {buttons.map(button => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        <Button key={button.label} {...button} />
      ))}
      <Toast ref={toastRef} />
    </>
  );
};
