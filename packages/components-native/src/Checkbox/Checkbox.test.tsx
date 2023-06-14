import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Checkbox } from "./Checkbox";

const accessibilityLabel = "testA11y";
const onChange = jest.fn();
afterEach(() => jest.resetAllMocks());

describe("Checkbox", () => {
  it("renders checkbox label", () => {
    const label = "TestLabel";
    const { getByLabelText } = render(
      <Checkbox name="testCheckbox" label={label} />,
    );
    expect(getByLabelText(label)).toBeTruthy();
  });

  it("renders checkbox with defaultChecked set to true", () => {
    const { getByTestId, getByRole } = render(
      <Checkbox name="testCheckbox" defaultChecked={true} />,
    );
    expect(getByRole("checkbox").props.accessibilityState).toHaveProperty(
      "checked",
      true,
    );
    expect(getByTestId("checkmark")).toBeDefined();
  });

  it("renders checkbox label with assistive text", () => {
    const label = "TestLabel";
    const assistive = "TestAssistive";
    const { getByLabelText, getByText } = render(
      <Checkbox name="testCheckbox" label={label} assistiveText={assistive} />,
    );
    expect(getByLabelText(label)).toBeTruthy();
    expect(getByText(assistive)).toBeTruthy();
  });

  it("will call onChange with true when pressed without default checked state set", () => {
    const { getByLabelText } = render(
      <Checkbox
        name="testCheckbox"
        onChange={onChange}
        accessibilityLabel={accessibilityLabel}
      />,
    );
    const checkbox = getByLabelText(accessibilityLabel);
    fireEvent.press(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("will call onChange with false when checked checkbox is pressed", () => {
    const { getByLabelText } = render(
      <Checkbox
        name="onChangeTest"
        checked={true}
        onChange={onChange}
        accessibilityLabel={accessibilityLabel}
      />,
    );
    const checkbox = getByLabelText(accessibilityLabel);
    fireEvent.press(checkbox);
    expect(onChange).toHaveBeenCalledWith(false);
  });
  it("will call onChange with true when unchecked checkbox is pressed", () => {
    const { getByLabelText } = render(
      <Checkbox
        name="onChangeTest"
        checked={false}
        onChange={onChange}
        accessibilityLabel={accessibilityLabel}
      />,
    );
    const checkbox = getByLabelText(accessibilityLabel);
    fireEvent.press(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("will not call onChange when disabled", () => {
    const { getByLabelText } = render(
      <Checkbox
        name="testCheckbox"
        onChange={onChange}
        disabled={true}
        accessibilityLabel={accessibilityLabel}
      />,
    );
    const checkbox = getByLabelText(accessibilityLabel);
    fireEvent.press(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("can be set as indeterminate", () => {
    const { getByTestId } = render(
      <Checkbox
        name="testCheckbox"
        onChange={onChange}
        indeterminate={true}
        accessibilityLabel={accessibilityLabel}
      />,
    );
    expect(getByTestId("minus2")).toBeDefined();
  });
});
