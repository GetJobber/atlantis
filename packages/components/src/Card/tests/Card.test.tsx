import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Text } from "../../Text";
import { Button } from "../../Button";
import { Card } from "..";
import { Menu } from "../../Menu";

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
  expect(getByRole("heading")).toHaveClass("base bold largest heading");
  expect(getByText("The Undiscovered Country")).toBeDefined();
  expect(getByText("This is the card content.")).toBeDefined();
});

it("renders a card with button", () => {
  const { getByRole, getByText } = render(
    <Card
      header={{
        title: "Header with button",
        action: <Button label="add" type="primary" />,
      }}
    >
      <p>This is the card content.</p>
    </Card>,
  );

  expect(getByRole("button", { name: "add" })).toBeDefined();
  expect(getByText("Header with button")).toBeDefined();
  expect(getByText("This is the card content.")).toBeDefined();
});

it("renders a card with menu", async () => {
  const header = "Mark as...";
  const actionLabel = "Awaiting Response";
  const clickHandler = jest.fn();
  const actions = [
    {
      header: header,
      actions: [{ label: actionLabel, onClick: clickHandler }],
    },
  ];
  const { getByRole, getByText } = render(
    <Card
      header={{
        title: "Header with menu",
        action: <Menu items={actions} />,
      }}
    >
      <p>This is the card content.</p>
    </Card>,
  );

  fireEvent.click(getByRole("button"));
  await waitFor(() => {
    expect(getByRole("menuitem")).toBeInTheDocument();
  });
  expect(getByText("Header with menu")).toBeDefined();
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

it("renders a card with an elevation", () => {
  const { getByText, container } = render(
    <Card elevation="base">
      <p>This is the card content.</p>
    </Card>,
  );

  expect(container.firstChild).toHaveClass("card baseElevation");
  expect(getByText("This is the card content.")).toBeDefined();
});

it("renders a card with compound components", () => {
  const { getByText, container } = render(
    <Card accent="green">
      <Card.Header>
        <Text>Compound Header</Text>
      </Card.Header>
      <Card.Body>
        <p>This is the card content.</p>
      </Card.Body>
    </Card>,
  );

  expect(container.firstChild).toHaveClass("card accent green");
  expect(getByText("Compound Header")).toBeInTheDocument();
  expect(getByText("This is the card content.")).toBeInTheDocument();
});

it("renders a clickable card with compound components", () => {
  const clickHandler = jest.fn();
  const { getByText, container } = render(
    <Card accent="green" onClick={clickHandler}>
      <Card.Header>
        <Text>Clickable Header</Text>
      </Card.Header>
      <Card.Body>
        <p>This is a clickable card.</p>
      </Card.Body>
    </Card>,
  );

  expect(container.firstChild).toHaveClass("card accent clickable green");
  expect(getByText("Clickable Header")).toBeInTheDocument();
  expect(getByText("This is a clickable card.")).toBeInTheDocument();
  fireEvent.click(container.firstChild as HTMLElement);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it("renders a link card with compound components", () => {
  const { getByText, getByRole } = render(
    <Card accent="green" url="https://frend.space">
      <Card.Header>
        <Text>Link Header</Text>
      </Card.Header>
      <Card.Body>
        <p>This is a link card.</p>
      </Card.Body>
    </Card>,
  );

  expect(getByRole("link")).toHaveClass("card accent clickable green");
  expect(getByRole("link")).toHaveAttribute("href", "https://frend.space");
  expect(getByText("Link Header")).toBeInTheDocument();
  expect(getByText("This is a link card.")).toBeInTheDocument();
});

it("renders a card with compound components and elevation", () => {
  const { getByText, container } = render(
    <Card elevation="base">
      <Card.Header>
        <Text>Elevated Header</Text>
      </Card.Header>
      <Card.Body>
        <p>This is an elevated card.</p>
      </Card.Body>
    </Card>,
  );

  expect(container.firstChild).toHaveClass("card baseElevation");
  expect(getByText("Elevated Header")).toBeInTheDocument();
  expect(getByText("This is an elevated card.")).toBeInTheDocument();
});
