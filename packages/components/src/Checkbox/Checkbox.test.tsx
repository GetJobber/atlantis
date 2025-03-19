import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Checkbox } from ".";
import { Text } from "../Text";

it("renders a Checkbox", () => {
  const { getByRole } = render(
    <Checkbox label="Send me spam?" name="send_me_span" value="spam" />,
  );
  const checkbox = getByRole("checkbox");
  expect(checkbox).toBeInTheDocument();
});

it("renders a disabled Checkbox", () => {
  const { getByRole } = render(
    <Checkbox label="Dont click me" disabled={true} />,
  );
  const checkbox = getByRole("checkbox");
  expect(checkbox).toBeDisabled();
});

it("renders each variation of checked, defaultChecked and indeterminate", () => {
  const variations = [
    { checked: true, indeterminate: true },
    { checked: false, indeterminate: true },
    { checked: true, indeterminate: false },
    { checked: false, indeterminate: false },

    { defaultChecked: true, indeterminate: true },
    { defaultChecked: false, indeterminate: true },
    { defaultChecked: true, indeterminate: false },
    { defaultChecked: false, indeterminate: false },
  ];

  variations.forEach(variation => {
    expect(render(<Checkbox label="Foo" {...variation} />)).toMatchSnapshot();
  });
});

it("renders a description when set", () => {
  const { getByText } = render(<Checkbox description="Checkers" />);
  const description = getByText("Checkers");
  expect(description).toBeInstanceOf(HTMLParagraphElement);
});

describe("With children components", () => {
  it("renders a checkbox with children", () => {
    const { getByText } = render(<Checkbox>{<Text>Content</Text>}</Checkbox>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("should still fire the onClick within the children", () => {
    const handleLinkClick = jest.fn();
    const { getByText } = render(
      <Checkbox description="Checkers">
        <Text>
          I agree to the
          <a onClick={handleLinkClick}>Terms of Service</a>
        </Text>
      </Checkbox>,
    );
    const TOSAnchorElement = getByText("Terms of Service");
    expect(TOSAnchorElement).toBeInTheDocument();
    fireEvent.click(TOSAnchorElement);
    expect(handleLinkClick).toHaveBeenCalled();
  });
});

describe("Clicking the checkbox it should call the handler", () => {
  test("with a true value", () => {
    const clickHandler = jest.fn();

    const { getByLabelText } = render(
      <Checkbox checked={false} onChange={clickHandler} label="foo" />,
    );

    fireEvent.click(getByLabelText("foo"));
    expect(clickHandler).toHaveBeenCalledWith(true);
  });

  test("with a false value", () => {
    const clickHandler = jest.fn();

    const { getByLabelText } = render(
      <Checkbox checked={true} onChange={clickHandler} label="foo" />,
    );

    fireEvent.click(getByLabelText("foo"));
    expect(clickHandler).toHaveBeenCalledWith(false);
  });
});

describe("Checkbox", () => {
  describe("focus handling", () => {
    it("calls onFocus when the checkbox receives focus", () => {
      const onFocus = jest.fn();
      const { getByRole } = render(
        <Checkbox version={2} label="Test" onFocus={onFocus} />,
      );

      const checkbox = getByRole("checkbox");
      checkbox.focus();

      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when the checkbox loses focus", () => {
      const onBlur = jest.fn();
      const { getByRole } = render(
        <Checkbox version={2} label="Test" onBlur={onBlur} />,
      );

      const checkbox = getByRole("checkbox");
      checkbox.focus();
      checkbox.blur();

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it("handles both focus and blur events", () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const { getByRole } = render(
        <Checkbox version={2} label="Test" onFocus={onFocus} onBlur={onBlur} />,
      );

      const checkbox = getByRole("checkbox");
      checkbox.focus();
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).not.toHaveBeenCalled();

      checkbox.blur();
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });
});
