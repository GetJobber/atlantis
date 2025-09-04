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

describe("UNSAFE_ props", () => {
  describe("Non-composable Card", () => {
    describe("UNSAFE_className", () => {
      it("applies to container", () => {
        const { container } = render(
          <Card
            header="Test Header"
            UNSAFE_className={{
              container: "custom-container",
            }}
          >
            <p>Card content</p>
          </Card>,
        );

        // Regular cards render as div elements
        const cardElement = container.firstChild as HTMLDivElement;
        expect(cardElement.tagName).toBe("DIV");
        expect(cardElement).toHaveClass("custom-container");
      });
      it("applies to header", () => {
        const { container } = render(
          <Card
            header="Test Header"
            UNSAFE_className={{
              header: "custom-header",
            }}
          >
            <p>Card content</p>
          </Card>,
        );

        const headerElement = container.querySelector(".header");
        expect(headerElement).toHaveClass("custom-header");
      });

      it("applies to link card container", () => {
        const { getByRole } = render(
          <Card
            header="Link Header"
            url="https://example.com"
            UNSAFE_className={{
              container: "custom-link-container",
            }}
          >
            <p>Link card content</p>
          </Card>,
        );

        const linkElement = getByRole("link");
        expect(linkElement).toHaveClass("custom-link-container");
      });
    });

    describe("UNSAFE_style", () => {
      it("applies to container", () => {
        const { container } = render(
          <Card
            header="Test Header"
            UNSAFE_style={{
              container: {
                backgroundColor: "var(--color-yellow)",
              },
            }}
          >
            <p>Card content</p>
          </Card>,
        );

        // Regular cards render as div elements
        const cardElement = container.firstChild as HTMLDivElement;
        expect(cardElement.tagName).toBe("DIV");
        expect(cardElement).toHaveStyle({
          backgroundColor: "var(--color-yellow)",
        });
      });

      it("applies to header", () => {
        const { container } = render(
          <Card
            header="Test Header"
            UNSAFE_style={{
              header: {
                backgroundColor: "var(--color-blue)",
              },
            }}
          >
            <p>Card content</p>
          </Card>,
        );

        const headerElement = container.querySelector(".header");
        expect(headerElement).toHaveStyle({
          backgroundColor: "var(--color-blue)",
        });
      });

      it("applies to link card container", () => {
        const { getByRole } = render(
          <Card
            header="Link Header"
            url="https://example.com"
            UNSAFE_style={{
              container: {
                backgroundColor: "var(--color-purple)",
              },
            }}
          >
            <p>Link card content</p>
          </Card>,
        );

        const linkElement = getByRole("link");
        expect(linkElement).toHaveStyle({
          backgroundColor: "var(--color-purple)",
        });
      });
    });
  });

  describe("Composable Card", () => {
    describe("UNSAFE_className", () => {
      it("applies to Card container", () => {
        const { container } = render(
          <Card
            UNSAFE_className={{
              container: "custom-compound-container",
            }}
          >
            <Card.Header>
              <Text>Compound Header</Text>
            </Card.Header>
            <Card.Body>
              <p>Compound content</p>
            </Card.Body>
          </Card>,
        );

        // Regular compound cards render as div elements
        const cardElement = container.firstChild as HTMLDivElement;
        expect(cardElement.tagName).toBe("DIV");
        expect(cardElement).toHaveClass("custom-compound-container");
      });
      it("applies to Card.Header", () => {
        const { container } = render(
          <Card>
            <Card.Header
              UNSAFE_className={{
                header: "custom-compound-header",
              }}
            >
              <Text>Compound Header</Text>
            </Card.Header>
            <Card.Body>
              <p>Compound content</p>
            </Card.Body>
          </Card>,
        );

        const headerElement = container.querySelector(".header");
        expect(headerElement).toHaveClass("custom-compound-header");
      });

      it("applies to link compound card container", () => {
        const { getByRole } = render(
          <Card
            url="https://example.com"
            UNSAFE_className={{
              container: "custom-link-compound-container",
            }}
          >
            <Card.Header>
              <Text>Link Compound Header</Text>
            </Card.Header>
            <Card.Body>
              <p>Link compound content</p>
            </Card.Body>
          </Card>,
        );

        const linkElement = getByRole("link");
        expect(linkElement).toHaveClass("custom-link-compound-container");
      });
    });

    describe("UNSAFE_style", () => {
      it("applies to Card container", () => {
        const { container } = render(
          <Card
            UNSAFE_style={{
              container: {
                backgroundColor: "var(--color-yellow)",
              },
            }}
          >
            <Card.Header>
              <Text>Compound Header</Text>
            </Card.Header>
            <Card.Body>
              <p>Compound content</p>
            </Card.Body>
          </Card>,
        );

        // Regular compound cards render as div elements
        const cardElement = container.firstChild as HTMLDivElement;
        expect(cardElement.tagName).toBe("DIV");
        expect(cardElement).toHaveStyle({
          backgroundColor: "var(--color-yellow)",
        });
      });

      it("applies to Card.Header", () => {
        const { container } = render(
          <Card>
            <Card.Header
              UNSAFE_style={{
                header: {
                  backgroundColor: "var(--color-blue)",
                },
              }}
            >
              <Text>Compound Header</Text>
            </Card.Header>
            <Card.Body>
              <p>Compound content</p>
            </Card.Body>
          </Card>,
        );

        const headerElement = container.querySelector(".header");
        expect(headerElement).toHaveStyle({
          backgroundColor: "var(--color-blue)",
        });
      });

      it("applies to link compound card container", () => {
        const { getByRole } = render(
          <Card
            url="https://example.com"
            UNSAFE_style={{
              container: {
                backgroundColor: "var(--color-purple)",
              },
            }}
          >
            <Card.Header>
              <Text>Link Compound Header</Text>
            </Card.Header>
            <Card.Body>
              <p>Link compound content</p>
            </Card.Body>
          </Card>,
        );

        const linkElement = getByRole("link");
        expect(linkElement).toHaveStyle({
          backgroundColor: "var(--color-purple)",
        });
      });
    });
  });
});
