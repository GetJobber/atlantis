import React from "react";
import { render, screen } from "@testing-library/react";
import { TextList } from ".";

describe("TextList", () => {
  describe("Bulleted", () => {
    const data = ["Here", "Comes", "a", "List"];
    beforeEach(() => {
      render(<TextList data={data} />);
    });

    it("should render a bulleted list", () => {
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass("textList bulleted");
      expect(list).toBeInstanceOf(HTMLUListElement);
    });

    it("should render a list item", () => {
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(data.length);
      expect(listItems[0]).toBeInstanceOf(HTMLLIElement);
    });
  });

  describe("Numbered", () => {
    const data = ["Here", "Comes", "an", "Ordered", "List"];
    beforeEach(() => {
      render(<TextList type="numbers" data={data} />);
    });

    it("should render a numbered list", () => {
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass("textList numbered");
      expect(list).toBeInstanceOf(HTMLOListElement);
    });
  });

  it("should allow elements but still wrapped in LI element", () => {
    const text = "I am a div";
    render(<TextList type="numbers" data={[<div key="1">{text}</div>]} />);

    expect(screen.getByText(text)).toBeInstanceOf(HTMLDivElement);
    expect(screen.getByText(text).parentElement).toBeInstanceOf(HTMLLIElement);
  });

  describe("Nested list", () => {
    it("should render a nested list", () => {
      const noNestedList = "No nested list";
      const withNestedList = "With nested list";
      render(
        <TextList
          type="numbers"
          data={[
            noNestedList,
            [
              withNestedList,
              <TextList
                key="3"
                type="numbers"
                data={["We", "counting", "down", "to", "five"]}
              />,
            ],
          ]}
        />,
      );
      screen.logTestingPlaygroundURL();
      expect(
        screen.getByText(noNestedList).closest("li")?.childElementCount,
      ).toBe(1);
      expect(
        screen.getByText(withNestedList).closest("li")?.childElementCount,
      ).toBe(2);
    });
  });
});
