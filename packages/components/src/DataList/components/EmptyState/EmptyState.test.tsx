import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { DataListEmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("should render the empty state component with a message", () => {
    const emptyStateMessage = "No results found";

    const { getByText } = render(
      <DataListEmptyState message={emptyStateMessage} />,
    );

    expect(getByText(emptyStateMessage)).toBeTruthy();
  });

  describe("empty state action", () => {
    it("should render the empty state component with a message and a button", () => {
      const emptyStateMessage = "No results found";
      const emptyStateActionLabel = "Create a new item";
      const emptyStateActionOnClick = jest.fn();
      const { getByText } = render(
        <DataListEmptyState
          message={emptyStateMessage}
          recommendedAction={{
            label: emptyStateActionLabel,
            onClick: emptyStateActionOnClick,
          }}
        />,
      );

      expect(getByText(emptyStateMessage)).toBeTruthy();
      const emptyStateAction = getByText(emptyStateActionLabel);
      expect(emptyStateAction).toBeTruthy();
      fireEvent.click(emptyStateAction);
      expect(emptyStateActionOnClick).toHaveBeenCalled();
    });
  });
});
