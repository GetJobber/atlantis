import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import { Card, CardTitle } from ".";

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
      <Card accent="green">
        <CardTitle title="The Undiscovered Country" />

        <p>This is the card content.</p>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="card accent green"
        >
          <div
            className="header fill"
          >
            <span
              className="title"
            >
              The Undiscovered Country
            </span>
          </div>
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
      <Card accent="green" onClick={() => {}}>
        <p>This is a clickable card.</p>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="card accent clickable green"
      onClick={[Function]}
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
