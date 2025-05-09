import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BaseSwitch } from "./BaseSwitch";

describe("BaseSwitch", () => {
  describe("rendering", () => {
    it("renders with value true", () => {
      const { getByRole } = render(<BaseSwitch value={true} />);
      const switchElement = getByRole("switch");
      expect(switchElement).toBeDefined();
      expect(switchElement.props.accessibilityState.checked).toBe(true);
    });

    it("renders with defaultValue true", () => {
      const { getByRole } = render(<BaseSwitch defaultValue={true} />);
      const switchElement = getByRole("switch");
      expect(switchElement).toBeDefined();
      expect(switchElement.props.accessibilityState.checked).toBe(true);
    });

    it("renders with value false", () => {
      const { getByRole } = render(<BaseSwitch value={false} />);
      const switchElement = getByRole("switch");
      expect(switchElement).toBeDefined();
      expect(switchElement.props.accessibilityState.checked).toBe(false);
    });

    it("renders with defaultValue false", () => {
      const { getByRole } = render(<BaseSwitch defaultValue={false} />);
      const switchElement = getByRole("switch");
      expect(switchElement).toBeDefined();
      expect(switchElement.props.accessibilityState.checked).toBe(false);
    });

    it("renders correctly when disabled with value true", () => {
      const { getByRole } = render(<BaseSwitch value={true} disabled={true} />);
      const switchElement = getByRole("switch");
      expect(switchElement).toBeDefined();
      expect(switchElement.props.accessibilityState.checked).toBe(true);
      expect(switchElement.props.accessibilityState.disabled).toBe(true);
    });

    it("renders correctly when disabled with value false", () => {
      const { getByRole } = render(
        <BaseSwitch value={false} disabled={true} />,
      );
      const switchElement = getByRole("switch");
      expect(switchElement).toBeDefined();
      expect(switchElement.props.accessibilityState.checked).toBe(false);
      expect(switchElement.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe("behavior", () => {
    it("invokes the valueChange callback", () => {
      const valueChangedCallback = jest.fn();
      const { getByLabelText } = render(
        <BaseSwitch
          value={false}
          onValueChange={valueChangedCallback}
          accessibilityLabel={"test switch"}
        />,
      );

      fireEvent(getByLabelText("test switch"), "valueChange", true);
      expect(valueChangedCallback).toHaveBeenCalledWith(true);

      fireEvent(getByLabelText("test switch"), "valueChange", false);
      expect(valueChangedCallback).toHaveBeenCalledWith(false);
    });

    it("doesn't invoke the valueChange callback if disabled", () => {
      const valueChangedCallback = jest.fn();
      const { getByLabelText } = render(
        <BaseSwitch
          value={false}
          disabled={true}
          onValueChange={valueChangedCallback}
          accessibilityLabel={"test switch"}
        />,
      );

      fireEvent(getByLabelText("test switch"), "valueChange", true);
      expect(valueChangedCallback).not.toHaveBeenCalled();
    });
  });
});
