import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from ".";

it("renders a Button", () => {
  render(<Button label="Submit" />);
  const button = screen.getByRole("button", { name: "Submit" });
  expect(button).toBeInstanceOf(HTMLButtonElement);
  expect(button).toHaveClass("button base work primary");
  expect(button).toHaveAttribute("type", "button");
});

it("renders a secondary Button", () => {
  render(<Button label="Submit" type="secondary" />);
  const button = screen.getByRole("button", { name: "Submit" });
  expect(button).toHaveClass("button base work secondary");
});

it("renders a tertiary Button", () => {
  render(<Button label="Submit" type="tertiary" />);
  const button = screen.getByRole("button", { name: "Submit" });
  expect(button).toHaveClass("button base work tertiary");
});

it("renders a destructuve Button", () => {
  render(<Button label="Submit" variation="destructive" />);
  const button = screen.getByRole("button", { name: "Submit" });
  expect(button).toHaveClass("button base destructive primary");
});

it("renders a learning Button", () => {
  render(<Button label="Submit" variation="learning" />);
  const button = screen.getByRole("button", { name: "Submit" });
  expect(button).toHaveClass("button base learning primary");
});

it("renders a subtle Button", () => {
  render(<Button label="Submit" variation="subtle" />);
  const button = screen.getByRole("button", { name: "Submit" });
  expect(button).toHaveClass("button base subtle primary");
});

it("renders a disabled Button", () => {
  render(<Button label="Submit" disabled={true} />);
  const button = screen.getByRole("button", { name: "Submit" });
  expect(button).toHaveClass("button base disabled primary");
});

it("renders a Button with a link and opens in new tab", () => {
  const label = "Go to 💩";
  const url = "💩.com";
  render(<Button label={label} url={url} external={true} />);
  const button = screen.getByRole("link", { name: label });
  expect(button).toBeInstanceOf(HTMLAnchorElement);
  expect(button).toHaveClass("button base work primary");
  expect(button).toHaveAttribute("href", url);
  expect(button).toHaveAttribute("target", "_blank");
});

it("renders a Button with an icon", () => {
  render(<Button label="Add" icon="add" />);
  const button = screen.getByRole("button", { name: "Add" });
  expect(button).toHaveClass("button base hasIconAndLabel work primary");
  expect(button).toContainElement(screen.getByTestId("add"));
});

it("renders a Button with an icon on the right", () => {
  render(<Button label="Add" icon="add" iconOnRight={true} />);
  const button = screen.getByRole("button", { name: "Add" });
  expect(button).toHaveClass(
    "button base hasIconAndLabel iconOnRight work primary",
  );
  expect(button).toContainElement(screen.getByTestId("add"));
});

it("renders a Button that is just an icon", () => {
  render(<Button icon="user" ariaLabel="Person" />);
  const button = screen.getByRole("button", { name: "Person" });
  expect(button).toHaveClass("button base onlyIcon work primary");
  expect(button).toContainElement(screen.getByTestId("user"));
  expect(button).toHaveAttribute("aria-label", "Person");
  expect(screen.queryByText("Person")).not.toBeInTheDocument();
});

it("renders a small Button", () => {
  render(<Button label="Add" size="small" />);
  const button = screen.getByRole("button", { name: "Add" });
  expect(button).toHaveClass("button small work primary");
});

it("renders a large Button", () => {
  render(<Button label="Add" size="large" />);
  const button = screen.getByRole("button", { name: "Add" });
  expect(button).toHaveClass("button large work primary");
});

it("renders a Button with a loading state", () => {
  render(<Button label="Adding" loading={true} />);
  const button = screen.getByRole("button", { name: "Adding" });
  expect(button).toHaveClass("button base work primary loading");
});

test("it should call the handler on click", () => {
  const label = "Click Me";
  const clickHandler = jest.fn();
  const { getByText } = render(<Button label={label} onClick={clickHandler} />);

  fireEvent.click(getByText(label));
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

test("it shouldn't call the handler on click when disabled", () => {
  const label = "I'm disabled";
  const clickHandler = jest.fn();
  const { getByText } = render(
    <Button label={label} disabled={true} onClick={clickHandler} />,
  );

  fireEvent.click(getByText(label));
  expect(clickHandler).toHaveBeenCalledTimes(0);
});

test("it should call the handler on mouse down", () => {
  const label = "Click Me";
  const mouseDownHandler = jest.fn();
  const { getByText } = render(
    <Button label={label} onMouseDown={mouseDownHandler} />,
  );

  fireEvent.mouseDown(getByText(label));
  expect(mouseDownHandler).toHaveBeenCalledTimes(1);
});

test("it shouldn't call the handler on mouse down when disabled", () => {
  const label = "I'm disabled";
  const mouseDownHandler = jest.fn();
  const { getByText } = render(
    <Button label={label} disabled={true} onMouseDown={mouseDownHandler} />,
  );

  fireEvent.mouseDown(getByText(label));
  expect(mouseDownHandler).toHaveBeenCalledTimes(0);
});

it("renders a Link as a Button for routing", () => {
  render(
    <Router>
      <Button label="Adding" to="/jobber" />
    </Router>,
  );
  const button = screen.getByRole("link", { name: "Adding" });
  expect(button).toBeInstanceOf(HTMLAnchorElement);
  expect(button).toHaveAttribute("href", "/jobber");
});

it("renders button type='button' by default", () => {
  const { container } = render(<Button label="hello" />);
  const button = container.querySelector("button[type='button']");
  expect(button).toBeInstanceOf(HTMLButtonElement);
});

it("renders button type='submit'", () => {
  const { container } = render(<Button label="hello" submit={true} />);
  const button = container.querySelector("button[type='submit']");
  expect(button).toBeInstanceOf(HTMLButtonElement);
});

it("routes when buttons are clicked", () => {
  const { queryByText } = render(
    <Router>
      <Button label="One" to="/" />
      <Button label="Two" to="/two" />
      <Button label="Three" to="/three" />
      <Switch>
        <Route exact path="/">
          Uno
        </Route>
        <Route exact path="/two">
          Dos
        </Route>
        <Route exact path="/three">
          Tres
        </Route>
      </Switch>
    </Router>,
  );

  expect(queryByText("Uno")).toBeInstanceOf(HTMLElement);
  expect(queryByText("Dos")).not.toBeInstanceOf(HTMLElement);
  expect(queryByText("Tres")).not.toBeInstanceOf(HTMLElement);

  fireEvent.click(queryByText("Two"));

  expect(queryByText("Uno")).not.toBeInstanceOf(HTMLElement);
  expect(queryByText("Dos")).toBeInstanceOf(HTMLElement);
  expect(queryByText("Tres")).not.toBeInstanceOf(HTMLElement);

  fireEvent.click(queryByText("Three"));

  expect(queryByText("Uno")).not.toBeInstanceOf(HTMLElement);
  expect(queryByText("Dos")).not.toBeInstanceOf(HTMLElement);
  expect(queryByText("Tres")).toBeInstanceOf(HTMLElement);
});
