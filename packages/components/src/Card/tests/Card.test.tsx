import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Text } from "../../Text";
import { Card } from "..";

it("renders a simple card", () => {
  const { getByText, container } = render(
    <Card accent="purple">
      <p>This is the card content.</p>
    </Card>,
  );

  expect(container.firstChild).toHaveClass("card accent purple");
  expect(getByText("This is the card content.")).toBeDefined();
});

it("renders a card", () => {
  const { getByText, getByRole, container } = render(
    <Card accent="green" header="The Undiscovered Country">
      <p>This is the card content.</p>
    </Card>,
  );

  expect(container.firstChild).toHaveClass("card accent green");
  expect(container.firstChild?.firstChild).toHaveClass("header");
  expect(getByRole("heading")).toHaveClass("base extraBold larger heading");
  expect(getByText("The Undiscovered Country")).toBeDefined();
  expect(getByText("This is the card content.")).toBeDefined();
});

it("renders a card with button", () => {
  const { getByRole, getByText } = render(
    <Card
      header={{
        title: "Header with button",
        action: {
          label: "add",
          size: "small",
          type: "primary",
        },
      }}
    >
      <p>This is the card content.</p>
    </Card>,
  );

  expect(getByRole("button", { name: "add" })).toBeDefined();
  expect(getByText("Header with button")).toBeDefined();
  expect(getByText("This is the card content.")).toBeDefined();
});

it("renders a card with custom header", () => {
  const headerProp = {
    header: <Text>Custom Header</Text>,
  };

  const { getByText } = render(
    <Card {...headerProp}>
      <p>This is the card content.</p>
    </Card>,
  );

  expect(getByText("Custom Header")).toBeDefined();
  expect(getByText("This is the card content.")).toBeDefined();
});

it("renders a link card", () => {
  const { getByText, getByRole } = render(
    <Card accent="green" url="https://frend.space">
      <p>This is a link card.</p>
    </Card>,
  );

  expect(getByRole("link")).toHaveClass("card accent clickable green");
  expect(getByRole("link")).toHaveAttribute("href", "https://frend.space");
  expect(getByText("This is a link card.")).toBeDefined();
});

it("renders a clickable card", () => {
  const clickHandler = jest.fn();

  const { getByText, getByRole, container } = render(
    <Card accent="green" onClick={clickHandler}>
      <p>This is a clickable card.</p>
    </Card>,
  );

  expect(container.firstChild).toHaveClass("card accent clickable green");
  expect(getByText("This is a clickable card.")).toBeDefined();
  fireEvent.click(getByRole("button"));
  expect(clickHandler).toHaveBeenCalled();
});

test("it should should be clickable if it's clickable", () => {
  const clickHandler = jest.fn();
  const text = "This is a clickable card.";

  const { getByText } = render(
    <Card onClick={clickHandler}>
      <p>{text}</p>
    </Card>,
  );

  fireEvent.click(getByText(text));

  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it("renders an external link card without target attribute", () => {
  const { getByRole } = render(
    <Card url="https://frend.space" external={true}>
      <p>This is a link card.</p>
    </Card>,
  );

  expect(getByRole("link")).toHaveAttribute("target", "_blank");
  expect(getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
});
