import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from ".";

it("renders a Button", () => {
  const tree = renderer.create(<Button label="Submit" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a secondary Button", () => {
  const tree = renderer
    .create(<Button label="Submit" type="secondary" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a tertiary Button", () => {
  const tree = renderer
    .create(<Button label="Submit" type="tertiary" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a destructuve Button", () => {
  const tree = renderer
    .create(<Button label="Submit" variation="destructive" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a learning Button", () => {
  const tree = renderer
    .create(<Button label="Submit" variation="learning" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a cancel Button", () => {
  const tree = renderer
    .create(<Button label="Submit" variation="cancel" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a disabled Button", () => {
  const tree = renderer
    .create(<Button label="Submit" disabled={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Button with a link and opens in new tab", () => {
  const tree = renderer
    .create(<Button label="Submit" url="💩.com" external={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Button with an icon", () => {
  const tree = renderer.create(<Button label="Add" icon="add" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Button with an icon on the right", () => {
  const tree = renderer
    .create(<Button label="Add" icon="add" iconOnRight={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Button that is just an icon", () => {
  const tree = renderer
    .create(<Button icon="user" ariaLabel="Person" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a small Button", () => {
  const tree = renderer.create(<Button label="Add" size="small" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a large Button", () => {
  const tree = renderer.create(<Button label="Add" size="large" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Button with a loading state", () => {
  const tree = renderer
    .create(<Button label="Adding" loading={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
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

it("renders a Link as a Button for routing", () => {
  const tree = renderer
    .create(
      <Router>
        <Button label="Adding" to="/jobber" />
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
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
