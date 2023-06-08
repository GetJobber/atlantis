import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { Host } from "react-native-portalize";
import { FormProvider, useForm } from "react-hook-form";
import { InputTime } from "./InputTime";
import * as atlantisContext from "../AtlantisContext/AtlantisContext";
import { Button } from "../Button";

afterEach(() => {
  cleanup();
  jest.spyOn(atlantisContext, "useAtlantisContext").mockRestore();
});

describe("Visuals", () => {
  const placeholder = "Start time";
  const expectedTime = "11:00 AM";
  const value = new Date(2022, 2, 2, 11, 0);
  const handleChange = jest.fn();

  const setup = (showIcon = true) =>
    render(
      <InputTime
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        showIcon={showIcon}
      />,
    );

  it("should show a timer prefix icon", () => {
    const screen = setup();

    const timerIcon = screen.getByTestId("timer");
    expect(timerIcon).toBeDefined();
    expect(timerIcon.type).toBe("RNSVGSvgView");
  });

  it("should not show a timer icon if showIcon is false", () => {
    const screen = setup(false);
    const timerIcon = screen.queryByTestId("timer");

    expect(timerIcon).toBeNull();
  });

  it("should show a formatted time", () => {
    const screen = setup();
    expect(
      screen.getByText(expectedTime, { includeHiddenElements: true }),
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
  const handleChange = jest.fn();

  it("should show a formatted time", () => {
    const expectedTime = "11:00 AM";
    const value = new Date(2022, 2, 2, 11, 0).toISOString();
    const screen = render(<InputTime value={value} onChange={handleChange} />);

    expect(
      screen.getByText(expectedTime, { includeHiddenElements: true }),
    ).toBeDefined();
  });
});

describe("With emptyValueLabel", () => {
  const handleChange = jest.fn();

  it("should show the emptyValueLabel when there's no value", () => {
    const label = "Unscheduled";
    const screen = render(<InputTime name="test" emptyValueLabel={label} />);

    expect(
      screen.getByText(label, { includeHiddenElements: true }),
    ).toBeDefined();
    expect(
      screen.queryByLabelText("Clear input", { includeHiddenElements: true }),
    ).toBeNull();
  });

  it("should not show the emptyValueLabel when there's a value", () => {
    const label = "Unscheduled";
    const screen = render(
      <InputTime
        emptyValueLabel={label}
        value={new Date()}
        onChange={handleChange}
      />,
    );

    expect(screen.queryByText(label)).toBeNull();
    expect(screen.getByLabelText("Clear input")).toBeDefined();
  });
});

describe("Time picker", () => {
  const placeholder = "Tap me";
  const handleChange = jest.fn();
  const getType = jest.fn().mockReturnValue(undefined);

  function renderTimePicker(value?: Date) {
    const screen = render(
      <InputTime
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        type={getType()}
      />,
    );

    fireEvent.press(screen.getByLabelText(placeholder));
    expect(screen.getByTestId("inputTime-Picker")).toBeDefined();

    return screen;
  }

  it("should not show a time picker", () => {
    const screen = render(<InputTime name="test" />);
    expect(screen.queryByTestId("inputTime-Picker")).toBeNull();
  });

  it("should fire the onChange with the current value after canceling a time selection", () => {
    const value = new Date();
    const screen = renderTimePicker(value);

    fireEvent.press(screen.getByLabelText("Cancel"));
    expect(handleChange).toHaveBeenCalledWith(value);
  });

  it("should fire the onChange after confirming a time selection", () => {
    const screen = renderTimePicker();

    fireEvent.press(screen.getByLabelText("Confirm"));
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it("should be a time picker", () => {
    const screen = renderTimePicker();
    expect(screen.getByTestId("inputTime-Picker").props.mode).toBe("time");
  });

  describe("Locale", () => {
    it("should be set to 12 hours", () => {
      const screen = renderTimePicker();
      expect(screen.getByTestId("inputTime-Picker").props.locale).toBe("en_US");
    });

    it("should be set to 24 hours", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.defaultValues,
        timeZone: "UTC",
        timeFormat: "HH:mm",
      });
      const screen = renderTimePicker();
      expect(screen.getByTestId("inputTime-Picker").props.locale).toBe("en_GB");
    });
  });

  it("should set the minute interval to 5 by default", () => {
    const screen = renderTimePicker();
    expect(screen.getByTestId("inputTime-Picker").props.minuteInterval).toBe(5);
  });

  it("should set the minute interval to 5 when the type is scheduling", () => {
    getType.mockReturnValueOnce("scheduling");
    const screen = renderTimePicker();
    expect(screen.getByTestId("inputTime-Picker").props.minuteInterval).toBe(5);
  });

  it("should set the minute interval to 1 when the type is granular", () => {
    getType.mockReturnValueOnce("granular");
    const screen = renderTimePicker();
    expect(screen.getByTestId("inputTime-Picker").props.minuteInterval).toBe(1);
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
  const pickerName = "timePicker";
  const expectedTime = "11:00 AM";
  const value = new Date(2022, 2, 2, 11, 0);
  const handleChange = jest.fn();

  const setup = () =>
    render(
      <SimpleFormWithProvider defaultValues={{ [pickerName]: value }}>
        <Host>
          <InputTime
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
      screen.getByText(expectedTime, { includeHiddenElements: true }),
    ).toBeDefined();
  });

  it("should update the value", async () => {
    const screen = setup();

    fireEvent.press(
      screen.getByText(expectedTime, { includeHiddenElements: true }),
    );

    const expectedNewTime = "10:00 AM";
    fireEvent(
      screen.getByTestId("inputTime-Picker"),
      "onConfirm",
      new Date(2022, 2, 2, 10, 0),
    );

    expect(
      screen.getByText(expectedNewTime, { includeHiddenElements: true }),
    ).toBeDefined();
  });

  it("should show the required message", async () => {
    const screen = setup();

    const clearAction = screen.getByLabelText("Clear input");
    expect(clearAction).toBeDefined();

    fireEvent.press(clearAction);
    screen.debug();
    await waitFor(() => {
      expect(
        screen.getByText(requiredError, { includeHiddenElements: true }),
      ).toBeDefined();
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

describe("Timezone conversion", () => {
  const placeholder = "Start time";
  const value = new Date(2022, 2, 2, 11, 0);
  const handleChange = jest.fn();
  const setup = () =>
    render(
      <InputTime
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />,
    );
  it("should display the time in the account timezone", async () => {
    jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
      ...atlantisContext.defaultValues,
      timeZone: "America/Los_Angeles",
    });

    const screen = setup();
    const expectedTimezonedTime = "3:00 AM";

    expect(
      screen.getByText(expectedTimezonedTime, { includeHiddenElements: true }),
    ).toBeDefined();
  });

  it("should have the correct offset on the time picker", async () => {
    jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
      ...atlantisContext.defaultValues,
      timeZone: "America/Los_Angeles",
    });

    const screen = setup();

    fireEvent.press(screen.getByLabelText(placeholder));
    expect(
      screen.getByTestId("inputTime-Picker").props.timeZoneOffsetInMinutes,
    ).toBe(-8 * 60);
  });
});
