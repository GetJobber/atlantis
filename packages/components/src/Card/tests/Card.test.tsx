import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import { Text } from "../../Text";
import { Card } from "..";

it("renders a simple card", () => {
  const tree = renderer
    .create(
      <Card accent="purple">
        <p>This is the card content.</p>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="card accent purple"
    >
      <p>
        This is the card content.
      </p>
    </div>
  `);
});

it("renders a card", () => {
  const tree = renderer
    .create(
      <Card accent="green" title="The Undiscovered Country">
        <p>This is the card content.</p>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="card accent green"
    >
      <div
        className="header"
      >
        <div>
          <h3
            className="base extraBold larger heading"
          >
            The Undiscovered Country
          </h3>
        </div>
      </div>
      <p>
        This is the card content.
      </p>
    </div>
  `);
});

it("renders a card with button", () => {
  const tree = renderer
    .create(
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
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="card"
    >
      <div
        className="header"
      >
        <div>
          <h3
            className="base extraBold larger heading"
          >
            Header with button
          </h3>
        </div>
        <div
          className="headerButton"
        >
          <button
            className="button small work primary"
            disabled={false}
            type="button"
          >
            <span
              className="base extraBold small base"
            >
              add
            </span>
          </button>
        </div>
      </div>
      <p>
        This is the card content.
      </p>
    </div>
  `);
});

it("renders a card with custom header", () => {
  const headerProp = {
    header: { customHeader: <Text>Custom Header</Text> },
  };

  const tree = renderer
    .create(
      <Card {...headerProp}>
        <p>This is the card content.</p>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="card"
    >
      <p
        className="base regular base text"
      >
        Custom Header
      </p>
      <p>
        This is the card content.
      </p>
    </div>
  `);
});

it("renders a link card", () => {
  const tree = renderer
    .create(
      <Card accent="green" url="https://frend.space">
        <p>This is a link card.</p>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
                    <a
                      className="card accent clickable green"
                      href="https://frend.space"
                    >
                      <p>
                        This is a link card.
                      </p>
                    </a>
          `);
});

it("renders a clickable card", () => {
  const tree = renderer
    .create(
      <Card accent="green" onClick={jest.fn()}>
        <p>This is a clickable card.</p>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="card accent clickable green"
      data-testid="clickable-card"
      onClick={[MockFunction]}
      onKeyDown={[Function]}
      onKeyUp={[Function]}
      role="button"
      tabIndex={0}
    >
      <p>
        This is a clickable card.
      </p>
    </div>
  `);
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
