import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Checkbox } from ".";
import { Text } from "../Text";

describe("Checkbox", () => {
  it("renders a basic checkbox", () => {
    const { getByRole } = render(
      <Checkbox
        version={2}
        label="Send me spam?"
        name="send_me_spam"
        value="spam"
      />,
    );
    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("renders a disabled checkbox", () => {
    const { getByRole } = render(
      <Checkbox version={2} label="Dont click me" disabled={true} />,
    );
    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("renders a description when provided string", () => {
    const { getByText } = render(
      <Checkbox version={2} label="Label" description="Additional info" />,
    );
    const description = getByText("Additional info");
    expect(description).toBeInTheDocument();
  });

  it("renders a description when provided markup", () => {
    const { getByText } = render(
      <Checkbox version={2} label="Label" description="Additional info" />,
    );
    const description = getByText("Additional info");
    expect(description).toBeInTheDocument();
  });

  describe("Label rendering", () => {
    it("renders with string label", () => {
      const { getByText } = render(<Checkbox version={2} label="Click me" />);
      expect(getByText("Click me")).toBeInTheDocument();
    });

    it("renders with markup as label", () => {
      const { getByText } = render(
        <Checkbox version={2} label={<Text>Custom label content</Text>} />,
      );
      expect(getByText("Custom label content")).toBeInTheDocument();
    });
  });

  describe("Checkbox states", () => {
    it("handles indeterminate state", () => {
      const { getByTestId } = render(
        <Checkbox version={2} label="Parent" indeterminate={true} />,
      );
      expect(getByTestId("minus2")).toBeInTheDocument();
    });

    it("shows checkmark when checked", () => {
      const { getByTestId } = render(
        <Checkbox version={2} label="Option" checked={true} />,
      );
      expect(getByTestId("checkmark")).toBeInTheDocument();
    });

    it("respects defaultChecked prop", () => {
      const { getByRole } = render(
        <Checkbox version={2} label="Default On" defaultChecked={true} />,
      );
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveProperty("defaultChecked", true);
    });
  });

  describe("Event handling", () => {
    it("calls onChange with true when unchecked checkbox is clicked", () => {
      const handleChange = jest.fn();
      const { getByRole } = render(
        <Checkbox
          version={2}
          label="Click me"
          checked={false}
          onChange={handleChange}
        />,
      );

      fireEvent.click(getByRole("checkbox"));
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("calls onChange with false when checked checkbox is clicked", () => {
      const handleChange = jest.fn();
      const { getByRole } = render(
        <Checkbox
          version={2}
          label="Click me"
          checked={true}
          onChange={handleChange}
        />,
      );

      fireEvent.click(getByRole("checkbox"));
      expect(handleChange).toHaveBeenCalledWith(false, expect.any(Object));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("calls onFocus when checkbox receives focus", () => {
      const handleFocus = jest.fn();
      const { getByRole } = render(
        <Checkbox version={2} label="Focus me" onFocus={handleFocus} />,
      );

      fireEvent.focus(getByRole("checkbox"));
      expect(handleFocus).toHaveBeenCalled();
    });

    it("calls onBlur when checkbox loses focus", () => {
      const handleBlur = jest.fn();
      const { getByRole } = render(
        <Checkbox version={2} label="Blur me" onBlur={handleBlur} />,
      );

      fireEvent.blur(getByRole("checkbox"));
      expect(handleBlur).toHaveBeenCalled();
    });
  });
});
