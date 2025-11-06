import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputTime } from ".";
import * as TimePredictHook from "./hooks/useTimePredict";

const mockSetTypedTime = jest.fn();
jest.mock("./hooks/useTimePredict", () => ({
  useTimePredict: jest.fn(() => ({ setTypedTime: mockSetTypedTime })),
}));

const createDate = (hours: number, minutes: number): Date => {
  const date = new Date(0);
  date.setHours(hours, minutes, 0, 0);

  return date;
};

describe("InputTimeRebuilt", () => {
  it("should set the value when given 'value'", () => {
    const valueDate = createDate(12, 30);
    render(<InputTime version={2} value={valueDate} onChange={jest.fn()} />);
    expect(screen.getByDisplayValue("12:30")).toBeInTheDocument();
  });

  it("should call the onChange function when the component is modified", () => {
    const startDate = createDate(2, 35);
    const newValue = "05:32";
    const newDate = createDate(5, 32);
    const changeHandler = jest.fn();

    render(
      <InputTime version={2} value={startDate} onChange={changeHandler} />,
    );

    fireEvent.change(screen.getByTestId("ATL-InputTime-input"), {
      target: { value: newValue },
    });

    expect(changeHandler).toHaveBeenCalledTimes(1);
    const calledDate: Date | undefined = changeHandler.mock.calls[0][0];

    expect(calledDate).toBeInstanceOf(Date);
    expect(calledDate?.getHours()).toBe(newDate.getHours());
    expect(calledDate?.getMinutes()).toBe(newDate.getMinutes());
  });

  it("should call onFocus when the input is focused", async () => {
    const focusHandler = jest.fn();
    render(
      <InputTime
        version={2}
        onFocus={focusHandler}
        value={createDate(10, 0)}
      />,
    );
    await userEvent.click(screen.getByDisplayValue("10:00"));
    expect(focusHandler).toHaveBeenCalledTimes(1);
  });

  it("should call onBlur when the input loses focus", async () => {
    const blurHandler = jest.fn();
    render(<InputTime version={2} onBlur={blurHandler} />);
    const input = screen.getByTestId("ATL-InputTime-input");
    await userEvent.click(input);
    await userEvent.tab();
    expect(blurHandler).toHaveBeenCalledTimes(1);
  });

  it("should call onChange with undefined and focus input when cleared", async () => {
    const startDate = createDate(10, 15);
    const changeHandler = jest.fn();
    const blurHandler = jest.fn();
    const inputRef = React.createRef<HTMLInputElement>();

    render(
      <InputTime
        version={2}
        value={startDate}
        onChange={changeHandler}
        onBlur={blurHandler}
        clearable="always"
        inputRef={inputRef}
      />,
    );

    const clearButton = screen.getByTestId("ATL-FormField-clearButton");

    await userEvent.click(clearButton);

    expect(changeHandler).toHaveBeenCalledWith(undefined);
    // onBlur should NOT be called when clearing - that was a bug
    expect(blurHandler).not.toHaveBeenCalled();

    expect(document.activeElement).toBe(inputRef.current);
  });

  it("forwards modern ref to the input element", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<InputTime version={2} ref={ref} />);

    const input = screen.getByTestId("ATL-InputTime-input");
    expect(ref.current).toBe(input);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("can access native input methods through modern ref", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<InputTime version={2} ref={ref} />);

    const input = screen.getByTestId("ATL-InputTime-input");
    expect(ref.current).toBe(input);

    ref.current?.focus();
    expect(input).toHaveFocus();

    ref.current?.blur();
    expect(input).not.toHaveFocus();
  });

  it("should display the error message when error prop is provided", () => {
    const errorMessage = "Please enter a valid time";
    render(<InputTime version={2} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  describe("useTimePredict integration", () => {
    const initialValue = createDate(10, 0);

    beforeEach(() => {
      mockSetTypedTime.mockClear();
      (TimePredictHook.useTimePredict as jest.Mock).mockClear();
    });

    // This is asserting imperfect behavior that is preexisting
    // ideally it would only be called once
    it("calls useTimePredict hook on initial render", () => {
      const handleChange = jest.fn();

      render(
        <InputTime
          version={2}
          value={initialValue}
          onChange={handleChange}
          name="Hook Test"
        />,
      );

      expect(TimePredictHook.useTimePredict).toHaveBeenCalledTimes(2);
      expect(TimePredictHook.useTimePredict).toHaveBeenCalledWith({
        value: initialValue,
        handleChange: expect.any(Function),
      });
    });

    it("calls setTypedTime for single numeric key press", async () => {
      const handleChange = jest.fn();

      render(
        <InputTime
          version={2}
          value={initialValue}
          onChange={handleChange}
          name="Hook Test"
        />,
      );
      const input = screen.getByTestId("ATL-InputTime-input");

      await userEvent.type(input, "1");

      expect(mockSetTypedTime).toHaveBeenCalledTimes(1);
      expect(mockSetTypedTime).toHaveBeenCalledWith(expect.any(Function));
    });

    it("calls setTypedTime for multiple numeric key presses", async () => {
      const handleChange = jest.fn();

      render(
        <InputTime
          version={2}
          value={initialValue}
          onChange={handleChange}
          name="Hook Test"
        />,
      );
      const input = screen.getByTestId("ATL-InputTime-input");

      await userEvent.type(input, "23");

      expect(mockSetTypedTime).toHaveBeenCalledTimes(2);
      expect(mockSetTypedTime).toHaveBeenNthCalledWith(1, expect.any(Function));
      expect(mockSetTypedTime).toHaveBeenNthCalledWith(2, expect.any(Function));
    });

    it("does not call setTypedTime for non-numeric key press", async () => {
      const handleChange = jest.fn();

      render(
        <InputTime
          version={2}
          value={initialValue}
          onChange={handleChange}
          name="Hook Test"
        />,
      );
      const input = screen.getByTestId("ATL-InputTime-input");

      await userEvent.type(input, "a");

      expect(mockSetTypedTime).not.toHaveBeenCalled();
    });

    it("calls setTypedTime correctly for mixed key presses", async () => {
      const handleChange = jest.fn();

      render(
        <InputTime
          version={2}
          value={initialValue}
          onChange={handleChange}
          name="Hook Test"
        />,
      );
      const input = screen.getByTestId("ATL-InputTime-input");

      await userEvent.type(input, "1a2");

      expect(mockSetTypedTime).toHaveBeenCalledTimes(2);
      expect(mockSetTypedTime).toHaveBeenNthCalledWith(1, expect.any(Function));
      expect(mockSetTypedTime).toHaveBeenNthCalledWith(2, expect.any(Function));
    });

    it("should not call setTypedTime if the input is disabled", async () => {
      const handleChange = jest.fn();

      render(
        <InputTime
          version={2}
          value={initialValue}
          onChange={handleChange}
          disabled
        />,
      );
      const input = screen.getByTestId("ATL-InputTime-input");

      await userEvent.type(input, "1");

      expect(mockSetTypedTime).not.toHaveBeenCalled();
    });

    it("should not call setTypedTime if the input is readonly", async () => {
      const handleChange = jest.fn();

      render(
        <InputTime
          version={2}
          value={initialValue}
          onChange={handleChange}
          readonly
        />,
      );
      const input = screen.getByTestId("ATL-InputTime-input");

      await userEvent.type(input, "1");

      expect(mockSetTypedTime).not.toHaveBeenCalled();
    });
  });
});
