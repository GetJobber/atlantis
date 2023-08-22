import React from "react";
import { act, render, screen } from "@testing-library/react";
import { mockIntersectionObserver } from "jsdom-testing-mocks";
import { DataListTags } from "./DataListTags";

const observer = mockIntersectionObserver();

describe("DataListTags", () => {
  const tags = ["uno", "dos"];

  beforeEach(() => {
    render(<DataListTags items={tags} />);
  });

  it("should render the passed in items", () => {
    expect(screen.getByText(tags[0])).toBeInTheDocument();
    expect(screen.getByText(tags[1])).toBeInTheDocument();
  });

  it("should NOT render the '+' counter", () => {
    expect(screen.queryByText("+", { exact: false })).not.toBeInTheDocument();
  });

  it("should render the '+' counter with the amount of tags hidden", () => {
    act(observer.leaveAll);

    expect(screen.getByText(`+${tags.length}`)).toBeInTheDocument();

    // Testing the inverse of the one on other test and ensure that's not a
    // false positive
    expect(screen.getByText("+", { exact: false })).toBeInTheDocument();
  });

  it("should count the correct amount of overflown tags", async () => {
    const element = screen.getByText(tags[1]);
    const target: HTMLElement | null = element.closest("[data-tag-element]");
    act(() => {
      target && observer.leaveNode(target);
    });

    expect(await screen.findByText("+1")).toBeInTheDocument();
  });
});
