import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFocusTrap } from "./useFocusTrap";

const targetId = "target";
const firstFocusableChild = "first-element";
const lastFocusableChild = "last-element";

it("should focus on the ref target on mount", () => {
  const { getByTestId } = render(<TestComponent />);
  expect(getByTestId(targetId)).toHaveFocus();
});

it("should focus on the ref target when tabbing out of the last focusable element and ignore the tabindex'=-1'", () => {
  const { getByTestId } = render(<TestComponent />);
  getByTestId(lastFocusableChild).focus();
  userEvent.tab();
  expect(getByTestId(targetId)).toHaveFocus();
});

it("should focus on the first focusable element", () => {
  const { getByTestId } = render(<TestComponent />);
  userEvent.tab();
  expect(getByTestId(firstFocusableChild)).toHaveFocus();
});

it("should focus on the last focusable element", () => {
  const { getByTestId } = render(<TestComponent />);
  userEvent.tab({ shift: true });
  expect(getByTestId(lastFocusableChild)).toHaveFocus();
});

it("should not trap the tabbing and focus on the first child node", () => {
  const { getByTestId } = render(<TestComponent trap={false} />);
  userEvent.tab();
  expect(getByTestId(targetId).previousElementSibling).toHaveFocus();
});

it("should have the proper aria-hidden on body and ref target when active trapping focus", () => {
  const { getByTestId } = render(<TestComponent />);
  expect(document.body.hasAttribute("aria-hidden")).toBeTruthy();
  expect(document.body.getAttribute("aria-hidden")).toBe("true");
  expect(getByTestId(targetId).hasAttribute("aria-hidden")).toBeTruthy();
  expect(getByTestId(targetId).getAttribute("aria-hidden")).toBe("false");
});

it("should NOT have the aria-hidden on the body and ref target when not actively trapping focus", () => {
  const { getByTestId } = render(<TestComponent trap={false} />);
  expect(document.body.hasAttribute("aria-hidden")).toBeFalsy();
  expect(getByTestId(targetId).hasAttribute("aria-hidden")).toBeFalsy();
});

interface TestComponentProps {
  readonly trap?: boolean;
}

function TestComponent({ trap = true }: TestComponentProps) {
  const testRef = useFocusTrap<HTMLDivElement>(trap);

  return (
    <>
      <input type="number" />

      <div ref={testRef} data-testid={targetId} tabIndex={0}>
        <button data-testid={firstFocusableChild}>Click me</button>
        <a href="#"></a>
        <input type="text" />
        <select>
          <option value="A"></option>
        </select>
        <textarea></textarea>
        <span tabIndex={0} data-testId={lastFocusableChild}></span>
        <span tabIndex={-1}></span>
      </div>

      <input type="calendar" />
    </>
  );
}
