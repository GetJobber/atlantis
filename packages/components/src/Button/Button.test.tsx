import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  Route,
  RouteChildrenProps,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

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

it("renders a Link as a Button for routing", () => {
  const { container } = render(
    <Router>
      <Button label="Adding" to="/jobber" />
    </Router>,
  );
  expect(container).toMatchSnapshot();
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
describe("react router dom", () => {
  it("routes when buttons are clicked", () => {
    const { getByText, queryByText } = render(
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

    fireEvent.click(getByText("Two"));

    expect(queryByText("Uno")).not.toBeInstanceOf(HTMLElement);
    expect(queryByText("Dos")).toBeInstanceOf(HTMLElement);
    expect(queryByText("Tres")).not.toBeInstanceOf(HTMLElement);

    fireEvent.click(getByText("Three"));

    expect(queryByText("Uno")).not.toBeInstanceOf(HTMLElement);
    expect(queryByText("Dos")).not.toBeInstanceOf(HTMLElement);
    expect(queryByText("Tres")).toBeInstanceOf(HTMLElement);
  });

  it("routes with when buttons include link state", () => {
    interface LocationStateTest {
      locationStateTest: string;
    }

    function Test2(
      props: RouteChildrenProps<
        Record<string, string | undefined>,
        LocationStateTest
      >,
    ) {
      return <span>{props.location?.state?.locationStateTest}</span>;
    }
    const { getByText } = render(
      <Router>
        <Button label="One" to="/" />
        <Button
          label="Two"
          to={{
            pathname: "/two",
            state: { locationStateTest: "This is state" },
          }}
        />
        <Button label="Three" to="/three" />
        <Switch>
          <Route exact path="/">
            Uno
          </Route>
          <Route path="/two" component={Test2}></Route>
          <Route exact path="/three">
            Tres
          </Route>
        </Switch>
      </Router>,
    );
    fireEvent.click(getByText("Two"));
    expect(getByText("This is state")).toBeDefined();
  });
});

describe("Button role", () => {
  it("should have a role of button when role not provided", () => {
    const { getByRole } = render(<Button label="hello" />);
    expect(getByRole("button")).toBeInstanceOf(HTMLButtonElement);
  });
  it("should not have a role of button when role not provided and it's a link", () => {
    const { queryByRole, getByRole } = render(
      <Button label="hello" url="myspace.com" />,
    );
    expect(queryByRole("button")).not.toBeInTheDocument();
    expect(getByRole("link")).toBeInTheDocument();
  });
  it("should apply provided role when present", () => {
    const { getByRole } = render(<Button label="hello" role="combobox" />);
    expect(getByRole("combobox")).toBeInstanceOf(HTMLButtonElement);
  });
});

describe("Button with children", () => {
  it("renders custom children", () => {
    const { getByText } = render(
      <Button type="primary">
        <Button.Label>Custom Button Content</Button.Label>
      </Button>,
    );

    expect(getByText("Custom Button Content")).toBeInTheDocument();
  });

  it("applies button styles to the wrapper when using children", () => {
    render(
      <Button type="primary" variation="destructive">
        <Button.Label>Custom Content</Button.Label>
      </Button>,
    );
    const button = screen.getByRole("button");

    // The button should have the destructive class
    expect(button).toHaveClass("destructive");
  });

  it("supports children with other button props", async () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick}>
        <Button.Label>Click Me</Button.Label>
      </Button>,
    );

    await userEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("allows both rendering of label and icon", () => {
    render(
      <Button type="primary">
        <Button.Label>Click Me</Button.Label>
        <Button.Icon name="add" />
      </Button>,
    );

    expect(screen.getByText("Click Me")).toBeInTheDocument();
    expect(screen.getByTestId("add")).toBeInTheDocument();
  });
});
