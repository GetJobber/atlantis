import React from "react";
import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  Route,
  RouteChildrenProps,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Button } from ".";
import { ButtonNavigationProvider } from "./ButtonNavigationProvider";

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

it("should call the handler on click", async () => {
  const label = "Click Me";
  const clickHandler = jest.fn();
  render(<Button label={label} onClick={clickHandler} />);

  await userEvent.click(screen.getByText(label));
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it("shouldn't call the handler on click when disabled", async () => {
  const label = "I'm disabled";
  const clickHandler = jest.fn();
  render(<Button label={label} disabled={true} onClick={clickHandler} />);

  await userEvent.click(screen.getByText(label));
  expect(clickHandler).toHaveBeenCalledTimes(0);
});

it("should call the handler on mouse down", async () => {
  const label = "Click Me";
  const mouseDownHandler = jest.fn();
  render(<Button label={label} onMouseDown={mouseDownHandler} />);

  await userEvent.click(screen.getByText(label));
  expect(mouseDownHandler).toHaveBeenCalledTimes(1);
});

it("shouldn't call the handler on mouse down when disabled", async () => {
  const label = "I'm disabled";
  const mouseDownHandler = jest.fn();
  render(
    <Button label={label} disabled={true} onMouseDown={mouseDownHandler} />,
  );

  await userEvent.click(screen.getByText(label));
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
  it("routes when buttons are clicked", async () => {
    render(
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

    expect(screen.queryByText("Uno")).toBeInstanceOf(HTMLElement);
    expect(screen.queryByText("Dos")).not.toBeInstanceOf(HTMLElement);
    expect(screen.queryByText("Tres")).not.toBeInstanceOf(HTMLElement);

    await userEvent.click(screen.getByText("Two"));

    expect(screen.queryByText("Uno")).not.toBeInstanceOf(HTMLElement);
    expect(screen.queryByText("Dos")).toBeInstanceOf(HTMLElement);
    expect(screen.queryByText("Tres")).not.toBeInstanceOf(HTMLElement);

    await userEvent.click(screen.getByText("Three"));

    expect(screen.queryByText("Uno")).not.toBeInstanceOf(HTMLElement);
    expect(screen.queryByText("Dos")).not.toBeInstanceOf(HTMLElement);
    expect(screen.queryByText("Tres")).toBeInstanceOf(HTMLElement);
  });

  it("routes with when buttons include link state", async () => {
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
    render(
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
    await userEvent.click(screen.getByText("Two"));
    expect(screen.getByText("This is state")).toBeDefined();
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

describe("Button Navigation Provider", () => {
  const mockOpenLink = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockRouterOptions: any = { routerOptions: true };
  const mockLocationHref = "https://getjobber.com";
  const mockClientSideRoutingURLProp = "/jobber";
  const buttonUrlProp = "jobber.com";
  const mockBuildLocationHref = jest.fn(() => mockLocationHref);

  function RenderNavigationButton(useClientSideRouting: boolean) {
    return (
      <ButtonNavigationProvider
        openLink={mockOpenLink}
        buildLocationHref={mockBuildLocationHref}
      >
        <Button
          label="hello"
          url={
            useClientSideRouting ? mockClientSideRoutingURLProp : buttonUrlProp
          }
          routerOptions={mockRouterOptions}
          useClientSideRouting={useClientSideRouting}
        />
      </ButtonNavigationProvider>
    );
  }
  it("should preventDefault and call openLink with the provided url prop when useClientSideRouting is true", async () => {
    render(RenderNavigationButton(true));
    const mouseEvent = createEvent("click", screen.getByText("hello"), {
      bubbles: true,
      cancelable: true,
    });
    fireEvent(screen.getByText("hello"), mouseEvent);
    await waitFor(() =>
      expect(mockOpenLink).toHaveBeenCalledWith(
        mockClientSideRoutingURLProp,
        mockRouterOptions,
        expect.objectContaining({
          nativeEvent: mouseEvent,
          defaultPrevented: true,
        }),
      ),
    );
  });

  it("should not call openLink when useClientSideRouting is false", async () => {
    render(RenderNavigationButton(false));
    await userEvent.click(screen.getByText("hello"));
    expect(mockOpenLink).not.toHaveBeenCalled();
  });

  it.each([
    { useClientSideRouting: true, expectedHref: mockLocationHref },
    { useClientSideRouting: false, expectedHref: buttonUrlProp },
  ])(
    `should should build the correct href with when client side routing is $clientSideRouting`,
    async ({ useClientSideRouting, expectedHref }) => {
      render(RenderNavigationButton(useClientSideRouting));
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", expectedHref);
    },
  );
});
