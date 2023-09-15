import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Host } from "react-native-portalize";
import { FormProvider, useForm } from "react-hook-form";
import { InputDate } from "./InputDate";
import { Button } from "../Button";
import * as atlantisContext from "../AtlantisContext/AtlantisContext";

describe("InputDate", () => {
  describe("Visuals", () => {
    const placeholder = "Start time";
    const expectedDate = "May 30, 2022";
    const value = new Date(2022, 4, 30);
    const handleChange = jest.fn();

    const setup = () =>
      render(
        <InputDate
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />,
      );

    it("should show a calendar prefix icon", () => {
      const screen = setup();

      const calendarIcon = screen.getByTestId("calendar");
      expect(calendarIcon).toBeDefined();
      expect(calendarIcon.type).toBe("RNSVGSvgView");
    });

    it("should show a formatted date", () => {
      const screen = setup();
      expect(
        screen.getByText(expectedDate, { includeHiddenElements: true }),
      ).toBeDefined();
    });

    it("should be clearable when there's a value", () => {
      const screen = setup();
      const clearAction = screen.getByLabelText("Clear input");
      expect(clearAction).toBeDefined();

      fireEvent.press(clearAction);
      expect(handleChange).toHaveBeenCalledWith(undefined);
    });
  });

  describe("String value", () => {
    it("should show a formatted date", () => {
      const expectedDate = "May 31, 2022";
      const value = new Date(2022, 4, 31).toISOString();
      const screen = render(<InputDate value={value} onChange={jest.fn()} />);

      expect(
        screen.getByText(expectedDate, { includeHiddenElements: true }),
      ).toBeDefined();
    });
  });

  describe("With emptyValueLabel", () => {
    it("should show the emptyValueLabel when there's no value", () => {
      const label = "Unscheduled";
      const screen = render(<InputDate name="test" emptyValueLabel={label} />);

      expect(
        screen.getByText(label, { includeHiddenElements: true }),
      ).toBeDefined();
      expect(screen.queryByLabelText("Clear input")).toBeNull();
    });

    it("should not show the emptyValueLabel when there's a value", () => {
      const label = "Unscheduled";
      const screen = render(
        <InputDate
          emptyValueLabel={label}
          value={new Date()}
          onChange={jest.fn()}
        />,
      );

      expect(screen.queryByText(label)).toBeNull();
      expect(screen.getByLabelText("Clear input")).toBeDefined();
    });
  });

  describe("with a defaultValue", () => {
    it("renders the supplied value", () => {
      const { getByText } = render(
        <InputDate name="test" defaultValue={new Date("2022-01-17")} />,
      );

      expect(
        getByText("Jan 17, 2022", { includeHiddenElements: true }),
      ).toBeDefined();
    });
  });

  describe("Date picker", () => {
    const placeholder = "Tap me";
    const handleChange = jest.fn();

    function renderDatePicker() {
      const screen = render(
        <InputDate
          placeholder={placeholder}
          value={undefined}
          onChange={handleChange}
        />,
      );

      fireEvent.press(screen.getByLabelText(placeholder));
      expect(screen.getByTestId("inputDate-datePicker")).toBeDefined();

      return screen;
    }

    it("should not show a date picker", () => {
      const screen = render(<InputDate name="test" />);
      expect(screen.queryByTestId("inputDate-datePicker")).toBeNull();
    });

    it("should fire the onChange with the current value after canceling a date selection", () => {
      const screen = renderDatePicker();

      fireEvent.press(screen.getByLabelText("Cancel"));
      expect(handleChange).toHaveBeenCalledWith(undefined);
    });

    it("should fire the onChange after confirming a date selection", () => {
      const screen = renderDatePicker();

      fireEvent.press(screen.getByLabelText("Confirm"));
      expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
    });
  });
  const mockOnSubmit = jest.fn();
  const saveButtonText = "Submit";

  const requiredError = "This is required";
  function SimpleFormWithProvider({ children, defaultValues }) {
    const formMethods = useForm({
      reValidateMode: "onChange",
      defaultValues,
      mode: "onTouched",
    });

    return (
      <FormProvider {...formMethods}>
        {children}
        <Button
          onPress={formMethods.handleSubmit(values => mockOnSubmit(values))}
          label={saveButtonText}
          accessibilityLabel={saveButtonText}
        />
      </FormProvider>
    );
  }
  describe("Form controlled", () => {
    const pickerName = "datePicker";
    const expectedDate = "May 29, 2022";
    const value = new Date(2022, 4, 29);
    const handleChange = jest.fn();

    const setup = () =>
      render(
        <SimpleFormWithProvider defaultValues={{ [pickerName]: value }}>
          <Host>
            <InputDate
              name={pickerName}
              onChange={handleChange}
              validations={{ required: requiredError }}
            />
          </Host>
        </SimpleFormWithProvider>,
      );

    it("should show the initial value", async () => {
      const screen = setup();
      expect(
        screen.getByText(expectedDate, {
          includeHiddenElements: true,
        }),
      ).toBeDefined();
    });

    it("should update the value", async () => {
      const screen = await setup();

      fireEvent.press(
        screen.getByText(expectedDate, { includeHiddenElements: true }),
      );

      const expectedNewDate = "Jun 17, 2022";
      const newSelectedDate = new Date(2022, 5, 17);
      fireEvent(
        screen.getByTestId("inputDate-datePicker"),
        "onConfirm",
        newSelectedDate,
      );

      expect(
        screen.getByText(expectedNewDate, { includeHiddenElements: true }),
      ).toBeDefined();
      expect(handleChange).toHaveBeenCalledWith(newSelectedDate);
    });

    it("should show the client side validation error", async () => {
      const screen = setup();

      const clearAction = screen.getByLabelText("Clear input");
      expect(clearAction).toBeDefined();

      fireEvent.press(clearAction);

      await waitFor(() => {
        expect(
          screen.getAllByText(requiredError, { includeHiddenElements: true }),
        ).toHaveLength(1);
      });
    });

    it("should clear the input with null value when it is in a form", async () => {
      const screen = setup();
      const clearAction = screen.getByLabelText("Clear input");
      expect(clearAction).toBeDefined();

      fireEvent.press(clearAction);
      expect(handleChange).toHaveBeenCalledWith(null);
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
      const value = new Date(2023, 4, 24).toISOString();
      const screen = render(<InputDate value={value} onChange={jest.fn()} />);

      expect(
        screen.getByText(expectedDate, { includeHiddenElements: true }),
      ).toBeDefined();
    });

    it("should display mmmm d, yyyy when dateFormat is 'PP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PP",
      });
      const expectedDate = "Feb 20, 2023";
      const value = new Date(2023, 1, 20).toISOString();
      const screen = render(<InputDate value={value} onChange={jest.fn()} />);

      expect(
        screen.getByText(expectedDate, { includeHiddenElements: true }),
      ).toBeDefined();
    });

    it("should display mmmmm d, yyyy when dateFormat is 'PPP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PPP",
      });
      const expectedDate = "July 7th, 2023";
      const value = new Date(2023, 6, 7).toISOString();
      const screen = render(<InputDate value={value} onChange={jest.fn()} />);

      expect(
        screen.getByText(expectedDate, { includeHiddenElements: true }),
      ).toBeDefined();
    });

    it("should display dddd, mmmmm d, yyyy when dateFormat is 'PPPP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PPPP",
      });
      const expectedDate = "Thursday, June 22nd, 2023";
      const value = new Date(2023, 5, 22).toISOString();
      const screen = render(<InputDate value={value} onChange={jest.fn()} />);

      expect(
        screen.getByText(expectedDate, { includeHiddenElements: true }),
      ).toBeDefined();
    });
  });
});
