import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { useIntl } from "react-intl";
import { InputNumber } from ".";
import { messages } from "./messages";

type OS = "ios" | "android";
let Platform: { OS: OS };
beforeEach(() => {
  Platform = require("react-native").Platform;
});

const platforms: OS[] = ["ios", "android"];
it.each(platforms)("renders an InputNumber on %s", platform => {
  Platform.OS = platform;
  const label = "My Accessible label";
  const { getByLabelText } = render(<InputNumber accessibilityLabel={label} />);
  expect(getByLabelText(label)).toBeTruthy();
});

it.each(platforms)(
  "renders an InputNumber with defaultValue on %s",
  platform => {
    Platform.OS = platform;
    const value = 200;
    const { getByDisplayValue } = render(<InputNumber value={value} />);
    expect(getByDisplayValue(value.toString())).toBeTruthy();
  },
);

it("Displays a validation message when the value is not a number", async () => {
  const { formatMessage } = useIntl();
  const a11yLabel = "InputNumberTest";
  const onChange = jest.fn();
  const { getByText, getByLabelText } = render(
    <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
  );
  const inputValue = "this";
  fireEvent.changeText(getByLabelText(a11yLabel), inputValue);

  await waitFor(() => {
    fireEvent(getByLabelText(a11yLabel), "blur");
  });
  expect(
    getByText(formatMessage(messages.notANumberError), {
      includeHiddenElements: true,
    }),
  ).toBeDefined();
  expect(onChange).toHaveBeenCalledWith(inputValue);
});

it("When onChange is called it returns a number", async () => {
  const a11yLabel = "InputNumberTest";
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
  );

  fireEvent.changeText(getByLabelText(a11yLabel), "100");
  expect(onChange).toHaveBeenCalledWith(100);
});

it("doesn't change the value when the input is controlled without an onChange", async () => {
  const a11yLabel = "InputNumberTest";
  const initialValue = 12;
  const changeValue = 100;
  const { queryByText, getByLabelText, getByDisplayValue } = render(
    <InputNumber accessibilityLabel={a11yLabel} value={initialValue} />,
  );

  fireEvent.changeText(getByLabelText(a11yLabel), changeValue.toString());
  expect(queryByText(changeValue.toString())).toBeNull();
  expect(getByDisplayValue(initialValue.toString())).toBeDefined();
});

it("passes validation when decimal value is entered", async () => {
  const { formatMessage } = useIntl();
  const a11yLabel = "InputNumberTest";
  const onChange = jest.fn();
  const { queryByText, getByLabelText } = render(
    <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
  );
  const numInput = "13.5";
  fireEvent.changeText(getByLabelText(a11yLabel), numInput);

  await waitFor(() => {
    fireEvent(getByLabelText(a11yLabel), "blur");
  });
  expect(queryByText(formatMessage(messages.notANumberError))).toBeNull();
  expect(onChange).toHaveBeenCalledWith(parseFloat(numInput));
});

it("passes validation when negative value is entered", async () => {
  const { formatMessage } = useIntl();
  const a11yLabel = "InputNumberTest";
  const onChange = jest.fn();
  const { queryByText, getByLabelText } = render(
    <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
  );

  const numInput = "-15";
  fireEvent.changeText(getByLabelText(a11yLabel), numInput);

  await waitFor(() => {
    fireEvent(getByLabelText(a11yLabel), "blur");
  });
  expect(queryByText(formatMessage(messages.notANumberError))).toBeNull();
  expect(onChange).toHaveBeenCalledWith(parseInt(numInput, 10));
});

it("passes validation when negative decimal value is entered", async () => {
  const { formatMessage } = useIntl();
  const a11yLabel = "InputNumberTest";
  const onChange = jest.fn();
  const { queryByText, getByLabelText } = render(
    <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
  );
  const numInput = "-15.123";
  fireEvent.changeText(getByLabelText(a11yLabel), numInput);

  await waitFor(() => {
    fireEvent(getByLabelText(a11yLabel), "blur");
  });
  expect(queryByText(formatMessage(messages.notANumberError))).toBeNull();
  expect(onChange).toHaveBeenCalledWith(parseFloat(numInput));
});

it("passes validation when explicit positive value is entered", async () => {
  const { formatMessage } = useIntl();
  const a11yLabel = "InputNumberTest";
  const onChange = jest.fn();
  const { queryByText, getByLabelText } = render(
    <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
  );

  const numInput = "+15";
  fireEvent.changeText(getByLabelText(a11yLabel), numInput);

  await waitFor(() => {
    fireEvent(getByLabelText(a11yLabel), "blur");
  });
  expect(queryByText(formatMessage(messages.notANumberError))).toBeNull();
  expect(onChange).toHaveBeenCalledWith(parseInt(numInput, 10));
});

it("passes validation when e notation value is entered", async () => {
  const { formatMessage } = useIntl();
  const a11yLabel = "InputNumberTest";
  const onChange = jest.fn();
  const { queryByText, getByLabelText } = render(
    <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
  );

  const numInput = "6e10";
  fireEvent.changeText(getByLabelText(a11yLabel), numInput);

  await waitFor(() => {
    fireEvent(getByLabelText(a11yLabel), "blur");
  });
  expect(queryByText(formatMessage(messages.notANumberError))).toBeNull();
  expect(onChange).toHaveBeenCalledWith(parseFloat(numInput));
});

it("passes validation when e notation decimal value is entered", async () => {
  const { formatMessage } = useIntl();
  const a11yLabel = "InputNumberTest";
  const onChange = jest.fn();
  const { queryByText, getByLabelText } = render(
    <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
  );

  const numInput = "6.456e10";
  fireEvent.changeText(getByLabelText(a11yLabel), numInput);

  await waitFor(() => {
    fireEvent(getByLabelText(a11yLabel), "blur");
  });
  expect(queryByText(formatMessage(messages.notANumberError))).toBeNull();
  expect(onChange).toHaveBeenCalledWith(parseFloat(numInput));
});

it("passes validation when e notation for representing decimal value is entered", async () => {
  const { formatMessage } = useIntl();
  const a11yLabel = "InputNumberTest";
  const onChange = jest.fn();
  const { queryByText, getByLabelText } = render(
    <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
  );

  const numInput = "6e-10";
  fireEvent.changeText(getByLabelText(a11yLabel), numInput);

  await waitFor(() => {
    fireEvent(getByLabelText(a11yLabel), "blur");
  });
  expect(queryByText(formatMessage(messages.notANumberError))).toBeNull();
  expect(onChange).toHaveBeenCalledWith(parseFloat(numInput));
});

describe("when the value ends with period", () => {
  const values = [".", "0.", "12.", "+1.", "-0."];

  it.each(values)("doesn't convert the value %s", value => {
    const a11yLabel = "InputNumberTest";
    const onChange = jest.fn();
    const { getByLabelText, getByDisplayValue } = render(
      <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
    );

    fireEvent.changeText(getByLabelText(a11yLabel), value);
    expect(getByDisplayValue(value)).toBeDefined();
  });
});

describe("when the value ends with scientific notation", () => {
  const values = ["1e", "+2e", "1.2e", "-3e"];

  it.each(values)("doesn't convert the value %s", value => {
    const a11yLabel = "InputNumberTest";
    const onChange = jest.fn();
    const { getByLabelText, getByDisplayValue } = render(
      <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
    );

    fireEvent.changeText(getByLabelText(a11yLabel), value);
    expect(getByDisplayValue(value)).toBeDefined();
  });
});

describe("when the value ends with + or -", () => {
  const values = ["+", "-"];

  it.each(values)("doesn't convert the value %s", value => {
    const a11yLabel = "InputNumberTest";
    const onChange = jest.fn();
    const { getByLabelText, getByDisplayValue } = render(
      <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
    );

    fireEvent.changeText(getByLabelText(a11yLabel), value);
    expect(getByDisplayValue(value)).toBeDefined();
  });
});

describe("when the value ends with zero decimal", () => {
  const values = ["0.0", "+0.00000", "-3.00000", "2.100", ".0", ".00000"];

  it.each(values)("doesn't convert the value %s", value => {
    const a11yLabel = "InputNumberTest";
    const onChange = jest.fn();
    const { getByLabelText, getByDisplayValue } = render(
      <InputNumber accessibilityLabel={a11yLabel} onChange={onChange} />,
    );

    fireEvent.changeText(getByLabelText(a11yLabel), value);
    expect(getByDisplayValue(value)).toBeDefined();
  });
});

describe("when the OS is iOS", () => {
  const a11yLabel = "InputNumberTest";
  beforeEach(() => {
    Platform.OS = "ios";
  });
  it("uses the decimal-pad keyboard when keyboard is 'decimal-pad'", () => {
    const { getByLabelText } = render(
      <InputNumber accessibilityLabel={a11yLabel} keyboard={"decimal-pad"} />,
    );
    expect(getByLabelText(a11yLabel).props.keyboardType).toEqual("decimal-pad");
  });

  it("uses the default numbers-and-punctuation keyboard when missing keyboard prop", () => {
    const { getByLabelText } = render(
      <InputNumber accessibilityLabel={a11yLabel} />,
    );
    expect(getByLabelText(a11yLabel).props.keyboardType).toEqual(
      "numbers-and-punctuation",
    );
  });

  it("uses the numbers-and-punctuation keyboard when keyboard is 'numbers-and-punctuation'", () => {
    const { getByLabelText } = render(
      <InputNumber
        accessibilityLabel={a11yLabel}
        keyboard={"numbers-and-punctuation"}
      />,
    );
    expect(getByLabelText(a11yLabel).props.keyboardType).toEqual(
      "numbers-and-punctuation",
    );
  });
});

describe("when the OS is android", () => {
  const a11yLabel = "InputNumberTest";
  beforeEach(() => {
    Platform.OS = "android";
  });

  it("uses the numeric keyboard when missing keyboard prop", () => {
    const { getByLabelText } = render(
      <InputNumber accessibilityLabel={a11yLabel} />,
    );
    expect(getByLabelText(a11yLabel).props.keyboardType).toEqual("numeric");
  });

  it("uses the numeric keyboard when keyboard is 'decimal-pad'", () => {
    const { getByLabelText } = render(
      <InputNumber accessibilityLabel={a11yLabel} keyboard={"decimal-pad"} />,
    );
    expect(getByLabelText(a11yLabel).props.keyboardType).toEqual("numeric");
  });

  it("uses the numeric keyboard when keyboard is 'numbers-and-punctuation'", () => {
    const { getByLabelText } = render(
      <InputNumber
        accessibilityLabel={a11yLabel}
        keyboard={"numbers-and-punctuation"}
      />,
    );
    expect(getByLabelText(a11yLabel).props.keyboardType).toEqual("numeric");
  });
});
