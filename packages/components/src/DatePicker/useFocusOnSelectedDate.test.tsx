import React, { useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { useFocusOnSelectedDate } from "./useFocusOnSelectedDate";

describe("useFocusOnSelectedDate hook", () => {
  it("focuses when the selected class name exists in the dom", async () => {
    const { getByTestId } = render(<TestComponent hasSelectedDay={true} />);
    await waitFor(() => {
      expect(getByTestId("this is it")).toHaveFocus();
    });
  });

  it("doesn't focus when the selected class name doesn't exist in the dom", async () => {
    render(<TestComponent hasSelectedDay={false} />);
    await waitFor(() => {
      expect(document.body).toHaveFocus();
    });
  });
});

interface TestComponentProps {
  readonly hasSelectedDay?: boolean;
}

function TestComponent({ hasSelectedDay }: TestComponentProps) {
  const { ref, focusOnSelectedDate } = useFocusOnSelectedDate();

  useEffect(focusOnSelectedDate, []);

  return (
    <div ref={ref}>
      {hasSelectedDay && (
        <div
          data-testid="this is it"
          className="react-datepicker__day--selected"
          tabIndex={0}
        />
      )}
      <div />
    </div>
  );
}
