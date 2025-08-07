import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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

describe("UNSAFE_ props", () => {
  describe("Non-composable Button", () => {
    describe("UNSAFE_className", () => {
      it("applies to container", () => {
        render(
          <Button
            label="Custom Container ClassName"
            UNSAFE_className={{
              container: "custom-container",
            }}
          />,
        );

        expect(screen.getByRole("button")).toHaveClass("custom-container");
      });

      it("applies to label", () => {
        render(
          <Button
            label="Custom Label ClassName"
            UNSAFE_className={{
              buttonLabel: { textStyle: "custom-label" },
            }}
          />,
        );

        expect(screen.getByText("Custom Label ClassName")).toHaveClass(
          "custom-label",
        );
      });

      it("applies to icon", () => {
        render(
          <Button
            label="Custom Icon ClassName"
            icon="add"
            UNSAFE_className={{
              buttonIcon: {
                svg: "custom-icon-svg",
                path: "custom-icon-path",
              },
            }}
          />,
        );

        expect(screen.getByTestId("add")).toHaveClass("custom-icon-svg");
        expect(screen.getByTestId("add").querySelector("path")).toHaveClass(
          "custom-icon-path",
        );
      });
    });

    describe("UNSAFE_style", () => {
      it("applies to container", () => {
        render(
          <Button
            label="Custom Container Style"
            UNSAFE_style={{
              container: {
                backgroundColor: "var(--color-yellow)",
              },
            }}
          />,
        );
        expect(screen.getByRole("button")).toHaveStyle({
          backgroundColor: "var(--color-yellow)",
        });
      });

      it("applies to label", () => {
        render(
          <Button
            label="Custom Label Style"
            UNSAFE_style={{
              buttonLabel: {
                textStyle: {
                  color: "var(--color-blue)",
                },
              },
            }}
          />,
        );
        expect(screen.getByText("Custom Label Style")).toHaveStyle({
          color: "var(--color-blue)",
        });
      });

      it("applies to icon", () => {
        render(
          <Button
            label="Custom Icon Style"
            icon="add"
            UNSAFE_style={{
              buttonIcon: {
                svg: {
                  width: "var(--space-large)",
                },
                path: {
                  fill: "var(--color-green)",
                },
              },
            }}
          />,
        );

        expect(screen.getByTestId("add")).toHaveStyle({
          width: "var(--space-large)",
        });
        expect(screen.getByTestId("add").querySelector("path")).toHaveStyle({
          fill: "var(--color-green)",
        });
      });
    });
  });

  describe("Composable Button", () => {
    describe("UNSAFE_className", () => {
      it("applies to Button.Icon", () => {
        render(
          <Button>
            <Button.Icon
              name="add"
              UNSAFE_className={{
                svg: "custom-icon-svg",
                path: "custom-icon-path",
              }}
            />
          </Button>,
        );

        expect(screen.getByTestId("add")).toHaveClass("custom-icon-svg");
        expect(screen.getByTestId("add").querySelector("path")).toHaveClass(
          "custom-icon-path",
        );
      });

      it("applies to Button.Label", () => {
        render(
          <Button>
            <Button.Label UNSAFE_className={{ textStyle: "custom-label" }}>
              Custom Composable Label ClassName
            </Button.Label>
          </Button>,
        );

        expect(
          screen.getByText("Custom Composable Label ClassName"),
        ).toHaveClass("custom-label");
      });
    });

    describe("UNSAFE_style", () => {
      it("applies to Button.Icon", () => {
        render(
          <Button>
            <Button.Icon
              name="add"
              UNSAFE_style={{
                svg: {
                  width: "var(--space-large)",
                },
                path: {
                  fill: "var(--color-green)",
                },
              }}
            />
          </Button>,
        );

        expect(screen.getByTestId("add")).toHaveStyle({
          width: "var(--space-large)",
        });
        expect(screen.getByTestId("add").querySelector("path")).toHaveStyle({
          fill: "var(--color-green)",
        });
      });

      it("applies to Button.Label", () => {
        render(
          <Button>
            <Button.Label
              UNSAFE_style={{
                textStyle: {
                  color: "var(--color-blue)",
                },
              }}
            >
              Custom Composable Label Style
            </Button.Label>
          </Button>,
        );

        expect(screen.getByText("Custom Composable Label Style")).toHaveStyle({
          color: "var(--color-blue)",
        });
      });
    });
  });
});
