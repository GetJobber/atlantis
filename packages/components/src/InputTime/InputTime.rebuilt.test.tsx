import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputTimeRebuilt } from "./InputTime.rebuilt";
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
  it("renders an initial time when given 'defaultValue'", () => {
    const defaultDate = createDate(11, 23);
    render(<InputTimeRebuilt version={2} defaultValue={defaultDate} />);
    expect(screen.getByDisplayValue("11:23")).toBeInTheDocument();
  });

  it("should set the value when given 'value'", () => {
    const valueDate = createDate(12, 30);
    render(
      <InputTimeRebuilt version={2} value={valueDate} onChange={jest.fn()} />,
    );
    expect(screen.getByDisplayValue("12:30")).toBeInTheDocument();
  });

  const testOnChange = () => {
    const startDate = createDate(2, 35);
    const newValue = "05:32";
    const newDate = createDate(5, 32);
    const changeHandler = jest.fn();

    render(
      <InputTimeRebuilt
        version={2}
        value={startDate}
        onChange={changeHandler}
      />,
    );

    fireEvent.change(screen.getByTestId("ATL-InputTime-input"), {
      target: { value: newValue },
    });

    expect(changeHandler).toHaveBeenCalledTimes(1);
    const calledDate: Date | undefined = changeHandler.mock.calls[0][0];

    expect(calledDate).toBeInstanceOf(Date);
    expect(calledDate?.getHours()).toBe(newDate.getHours());
    expect(calledDate?.getMinutes()).toBe(newDate.getMinutes());
  };

  it(
    "should call the onChange function when the component is modified",
    testOnChange,
  );

  it("should call onFocus when the input is focused", async () => {
    const focusHandler = jest.fn();
    render(
      <InputTimeRebuilt
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
    render(<InputTimeRebuilt version={2} onBlur={blurHandler} />);
    const input = screen.getByTestId("ATL-InputTime-input");
    await userEvent.click(input);
    await userEvent.tab();
    expect(blurHandler).toHaveBeenCalledTimes(1);
  });

  it("should call onChange with undefined, call onBlur, and focus input when cleared", async () => {
    const startDate = createDate(10, 15);
    const changeHandler = jest.fn();
    const blurHandler = jest.fn();
    const inputRef = React.createRef<HTMLInputElement>();

    render(
      <InputTimeRebuilt
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
    expect(blurHandler).toHaveBeenCalledTimes(1);

    expect(document.activeElement).toBe(inputRef.current);
  });

  describe("useTimePredict integration", () => {
    let input: HTMLElement;
    const initialValue = createDate(10, 0);
    const handleChange = jest.fn();

    beforeEach(() => {
      mockSetTypedTime.mockClear();
      (TimePredictHook.useTimePredict as jest.Mock).mockClear();
      handleChange.mockClear();

      render(
        <InputTimeRebuilt
          version={2}
          value={initialValue}
          onChange={handleChange}
          name="Hook Test"
        />,
      );
      input = screen.getByTestId("ATL-InputTime-input");
    });

    // This is asserting imperfect behavior that is preexisting
    // ideally it would only be called once
    it("calls useTimePredict hook on initial render", () => {
      expect(TimePredictHook.useTimePredict).toHaveBeenCalledTimes(2);
      expect(TimePredictHook.useTimePredict).toHaveBeenCalledWith({
        value: initialValue,
        handleChange: expect.any(Function),
      });
    });

    it("calls setTypedTime for single numeric key press", async () => {
      await userEvent.type(input, "1");
      expect(mockSetTypedTime).toHaveBeenCalledTimes(1);
      expect(mockSetTypedTime).toHaveBeenCalledWith(expect.any(Function));
    });

    it("calls setTypedTime for multiple numeric key presses", async () => {
      await userEvent.type(input, "23");

      expect(mockSetTypedTime).toHaveBeenCalledTimes(2);
      expect(mockSetTypedTime).toHaveBeenNthCalledWith(1, expect.any(Function));
      expect(mockSetTypedTime).toHaveBeenNthCalledWith(2, expect.any(Function));
    });

    it("does not call setTypedTime for non-numeric key press", async () => {
      await userEvent.type(input, "a");
      expect(mockSetTypedTime).not.toHaveBeenCalled();
    });

    it("calls setTypedTime correctly for mixed key presses", async () => {
      await userEvent.type(input, "1a2");

      expect(mockSetTypedTime).toHaveBeenCalledTimes(2);
      expect(mockSetTypedTime).toHaveBeenNthCalledWith(1, expect.any(Function));
      expect(mockSetTypedTime).toHaveBeenNthCalledWith(2, expect.any(Function));
    });
  });
});
