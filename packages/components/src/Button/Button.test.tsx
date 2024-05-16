import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Button } from ".";

it("renders a Button", () => {
  const { container } = render(<Button label="Submit" />);
  expect(container).toMatchSnapshot();
});

it("renders a secondary Button", () => {
  const { container } = render(<Button label="Submit" type="secondary" />);
  expect(container).toMatchSnapshot();
});

it("renders a tertiary Button", () => {
  const { container } = render(<Button label="Submit" type="tertiary" />);
  expect(container).toMatchSnapshot();
});

it("renders a destructuve Button", () => {
  const { container } = render(
    <Button label="Submit" variation="destructive" />,
  );
  expect(container).toMatchSnapshot();
});

it("renders a learning Button", () => {
  const { container } = render(<Button label="Submit" variation="learning" />);
  expect(container).toMatchSnapshot();
});

it("renders a subtle Button", () => {
  const { container } = render(<Button label="Submit" variation="subtle" />);
  expect(container).toMatchSnapshot();
});

it("renders a disabled Button", () => {
  const { container } = render(<Button label="Submit" disabled={true} />);
  expect(container).toMatchSnapshot();
});

it("renders a Button with a link and opens in new tab", () => {
  const { container } = render(
    <Button label="Submit" url="💩.com" external={true} />,
  );
  expect(container).toMatchSnapshot();
});

it("renders a Button with an icon", () => {
  const { container } = render(<Button label="Add" icon="add" />);
  expect(container).toMatchSnapshot();
});

it("renders a Button with an icon on the right", () => {
  const { container } = render(
    <Button label="Add" icon="add" iconOnRight={true} />,
  );
  expect(container).toMatchSnapshot();
});

it("renders a Button that is just an icon", () => {
  const { container } = render(<Button icon="user" ariaLabel="Person" />);
  expect(container).toMatchSnapshot();
});

it("renders a small Button", () => {
  const { container } = render(<Button label="Add" size="small" />);
  expect(container).toMatchSnapshot();
});

it("renders a large Button", () => {
  const { container } = render(<Button label="Add" size="large" />);
  expect(container).toMatchSnapshot();
});

it("renders a Button with a loading state", () => {
  const { container } = render(<Button label="Adding" loading={true} />);
  expect(container).toMatchSnapshot();
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

describe("Button role", () => {
  it("should have a role of button when role not provided", () => {
    const { getByRole } = render(<Button label="hello" />);
    expect(getByRole("button")).toBeInstanceOf(HTMLButtonElement);
  });
  it("should apply provided role when present", () => {
    const { getByRole } = render(<Button label="hello" role="combobox" />);
    expect(getByRole("combobox")).toBeInstanceOf(HTMLButtonElement);
  });
});
