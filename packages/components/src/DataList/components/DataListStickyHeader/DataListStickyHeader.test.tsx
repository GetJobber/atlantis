import React from "react";
import { act, render, screen } from "@testing-library/react";
import { configMocks, mockIntersectionObserver } from "jsdom-testing-mocks";
import { DataListStickyHeader } from "./DataListStickyHeader";

configMocks({ act });
const observer = mockIntersectionObserver();

describe("DataListStickyHeader", () => {
  it("should have an isStuck className when it's slightly off screen", () => {
    render(
      <DataListStickyHeader>
        <button>Click me</button>
      </DataListStickyHeader>,
    );
    const el = screen.getByRole("button");
    const target = el.parentElement as HTMLElement;

    observer.leaveNode(target, { intersectionRatio: 0.9 });
    expect(target).toHaveClass("stuck");
  });

  it("should not have an isStuck className it's fully visible on the screen", () => {
    render(
      <DataListStickyHeader>
        <button>Click me</button>
      </DataListStickyHeader>,
    );
    const el = screen.getByRole("button");
    const target = el.parentElement as HTMLElement;

    // Control test: Make sure it has the class name first before checking if
    // it's not there
    observer.leaveNode(target, { intersectionRatio: 0.9 });
    expect(target).toHaveClass("stuck");

    observer.enterNode(target, { intersectionRatio: 1 });
    expect(target).not.toHaveClass("stuck");
  });
});
