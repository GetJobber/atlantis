/* eslint-disable max-statements */
import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { InputDateProps } from ".";
import { InputDate } from ".";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { Text } from "../Text";
import * as atlantisContext from "../AtlantisContext/AtlantisContext";

describe("InputDate V1", () => {
  it("renders a blank form by default", () => {
    render(<InputDate onChange={jest.fn()} />);
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
    expect(screen.queryByText("15")).not.toBeInTheDocument();
  });

  it("fires onChange with the new value when you click a date", () => {
    const date = "11/11/2011";
    const newDate = "11/15/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    const calendarButton = screen.getByRole("button");

    fireEvent.click(calendarButton);

    const selectDate = screen.getByText("15");
    fireEvent.click(selectDate);
    expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
  });

  it("shouldn't call onChange with the new value when you click a disabled date", () => {
    const date = "11/11/2011";
    const minDate = "11/9/2011";
    const maxDate = "11/15/2011";
    const changeHandler = jest.fn();
    render(
      <InputDate
        minDate={new Date(minDate)}
        maxDate={new Date(maxDate)}
        value={new Date(date)}
        onChange={changeHandler}
      />,
    );
    const calendarButton = screen.getByRole("button");
    fireEvent.click(calendarButton);

    const selectDate1 = screen.getByText("7");
    fireEvent.click(selectDate1);
    const selectDate2 = screen.getByText("17");
    fireEvent.click(selectDate2);
    expect(changeHandler).not.toHaveBeenCalled();
  });

  it("fires onChange with the new value when you type a different date", () => {
    const date = "11/11/2011";
    const newDate = "11/15/2011";
    const placeholder = "placeholder";
    const changeHandler = jest.fn();
    render(
      <InputDate
        value={new Date(date)}
        onChange={changeHandler}
        placeholder={placeholder}
      />,
    );

    fireEvent.change(screen.getByLabelText(placeholder), {
      target: { value: newDate },
    });
    expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
  });

  it("updates the value of the field when the value prop changes", () => {
    const date = "11/11/2011";
    const newDate = "11/15/2011";
    const changeHandler = jest.fn();
    const { rerender } = render(
      <InputDate value={new Date(date)} onChange={changeHandler} />,
    );
    expect(screen.queryByDisplayValue(date)).toBeInTheDocument();

    rerender(<InputDate value={new Date(newDate)} onChange={changeHandler} />);

    expect(screen.queryByDisplayValue(date)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(newDate)).toBeInTheDocument();
  });

  it("returns the correct date object when long formatted date is supplied", () => {
    const date = "11/11/2011";
    const newDate = "November 15, 2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    expect(screen.getByDisplayValue(date)).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue(date), {
      target: { value: newDate },
    });

    expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
  });

  it("doesn't fire onChange when the new value is invalid", async () => {
    const date = "11/11/2011";
    const badInput = "bad input";
    const changeHandler = jest.fn();
    const placeholder = "placeholder";
    render(
      <InputDate
        placeholder={placeholder}
        value={new Date(date)}
        onChange={changeHandler}
      />,
    );

    expect(screen.getByDisplayValue(date)).toBeInTheDocument();

    const form = screen.getByDisplayValue(date);
    fireEvent.focus(form);

    fireEvent.change(screen.getByLabelText(placeholder), {
      target: { value: badInput },
    });
    expect(changeHandler).toHaveBeenCalledTimes(0);
  });

  it("doesn't display the calendar when input is focused with keyboard", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    const input = screen.getByDisplayValue(date);

    fireEvent.focus(input);

    expect(screen.queryByText("15")).not.toBeInTheDocument();
  });

  it("doesn't display the calendar when calendar button is focused with keyboard", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    const calendarButton = screen.getByRole("button");

    fireEvent.focus(calendarButton);

    expect(screen.queryByText("15")).not.toBeInTheDocument();
  });

  it("displays the calendar when button is pressed", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    const calendarButton = screen.getByRole("button");

    fireEvent.click(calendarButton);

    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("displays the calendar when input is focused with a click", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    const input = screen.getByDisplayValue(date);

    fireEvent.click(input);

    expect(screen.getByText("15")).toBeInTheDocument();
  });

  describe("when InputDate is used within a Modal", () => {
    it("should close only the open picker when the escape key is pressed", async () => {
      const date = "11/11/2011";
      render(<NestedTestComponent date={date} />);
      const button = screen.getByRole("button");
      fireEvent.click(button);

      const input = screen.getByDisplayValue(date);
      fireEvent.click(input);

      expect(screen.getByText("15")).toBeInTheDocument();
      fireEvent.keyDown(input, { key: "Escape" });

      expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
      expect(screen.queryByText("15")).not.toBeInTheDocument();
    });
  });

  describe("dateFormat pattern", () => {
    afterEach(() => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockRestore();
    });

    it("should display MM/DD/YYYY when dateFormat is 'P'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "P",
      });
      const expectedDate = "05/24/2023";
      const date = new Date(2023, 4, 24).toISOString();
      const changeHandler = jest.fn();
      render(<InputDate value={new Date(date)} onChange={changeHandler} />);
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });

    it("should display mmmm d, yyyy when dateFormat is 'PP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PP",
      });
      const expectedDate = "Feb 20, 2023";
      const date = new Date(2023, 1, 20).toISOString();
      const changeHandler = jest.fn();
      render(<InputDate value={new Date(date)} onChange={changeHandler} />);
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });

    it("should display mmmmm d, yyyy when dateFormat is 'PPP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PPP",
      });
      const expectedDate = "July 7th, 2023";
      const date = new Date(2023, 6, 7).toISOString();
      const changeHandler = jest.fn();
      render(<InputDate value={new Date(date)} onChange={changeHandler} />);
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });

    it("should display dddd, mmmmm d, yyyy when dateFormat is 'PPPP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PPPP",
      });
      const expectedDate = "Thursday, June 22nd, 2023";
      const date = new Date(2023, 5, 22).toISOString();
      const changeHandler = jest.fn();
      render(<InputDate value={new Date(date)} onChange={changeHandler} />);
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });
  });

  describe("showIcon prop", () => {
    it("should display the calendar icon when set to true", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(
        <InputDate
          value={new Date(date)}
          onChange={changeHandler}
          showIcon={true}
        />,
      );
      expect(screen.getByRole("button")).toBeDefined();
    });

    it("should display the calendar icon when set to undefined", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(<InputDate value={new Date(date)} onChange={changeHandler} />);
      expect(screen.getByRole("button")).toBeDefined();
    });

    it("should not display the calendar icon when set to false", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(
        <InputDate
          value={new Date(date)}
          onChange={changeHandler}
          showIcon={false}
        />,
      );
      expect(screen.queryByRole("button")).toBeNull();
    });

    it("should show mini calendar when set to false and down arrow is pressed", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(
        <InputDate
          value={new Date(date)}
          onChange={changeHandler}
          showIcon={false}
        />,
      );
      const input = screen.getByDisplayValue(date);

      fireEvent.keyUp(input, { key: "ArrowDown" });

      expect(screen.getByText("15")).toBeInTheDocument();
    });
  });

  it("should display the selected date when emptyValueLabel is undefined", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);

    expect(screen.queryByDisplayValue(date)).toBeInTheDocument();
  });

  it("should display emptyValueLabel when set", () => {
    const changeHandler = jest.fn();
    const expectedDisplayValue = "Unscheduled";
    render(
      <InputDate
        onChange={changeHandler}
        emptyValueLabel={expectedDisplayValue}
      />,
    );

    expect(
      screen.queryByDisplayValue(expectedDisplayValue),
    ).toBeInTheDocument();
  });

  function NestedTestComponent(props: { readonly date: string }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const changeHandler = jest.fn();

    return (
      <div>
        <Modal open={isOpen}>
          <Text>Test Modal Content</Text>
          <InputDate value={new Date(props.date)} onChange={changeHandler} />
        </Modal>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          label={isOpen ? "Close" : "Open"}
        />
      </div>
    );
  }

  function InputDateWithStateTest(
    props: {
      readonly initialValue: string;
    } & Partial<InputDateProps>,
  ): JSX.Element {
    const [date, setDate] = useState(new Date(props.initialValue));

    return (
      <InputDate
        {...props}
        value={date}
        onChange={d => {
          // Skips empty date values: this scenario expects the input to always be valid
          if (!d) return;
          setDate(d);
        }}
      />
    );
  }

  describe("when onChange skips empty or invalid dates", () => {
    it("restores the last value when the input is empty", async () => {
      const originalValue = "11/11/2011";
      const placeholder = "placeholder";
      render(
        <>
          <textarea data-testid="textarea" />
          <InputDateWithStateTest
            initialValue={originalValue}
            placeholder={placeholder}
          />
        </>,
      );

      const textarea = screen.getByTestId("textarea");
      const input = screen.getByLabelText(placeholder);

      // Focus an element, tab to the input and clear the value, then blur the input
      await userEvent.click(textarea);
      await userEvent.tab();
      await userEvent.clear(input);
      await userEvent.type(input, "what");
      await userEvent.tab({
        shift: true,
      });

      expect(input).toHaveValue(originalValue);
    });

    it("restores the last value when the input contains an invalid date", async () => {
      const originalValue = "11/11/2011";
      const placeholder = "placeholder";
      render(
        <>
          <textarea data-testid="textarea" />
          <InputDateWithStateTest
            initialValue={originalValue}
            placeholder={placeholder}
          />
        </>,
      );

      const textarea = screen.getByTestId("textarea");
      const input = screen.getByLabelText(placeholder);

      // Focus an element, tab to the input and enter an invalid date, then blur the input
      await userEvent.click(textarea);
      await userEvent.tab();
      await userEvent.type(input, "invalidtext");
      await userEvent.tab({
        shift: true,
      });

      expect(input).toHaveValue(originalValue);
    });
  });
});
