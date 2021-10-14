import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Card } from "..";

it("renders a simple card", () => {
  const { container } = render(
    <Card accent="purple">
      <p>This is the card content.</p>
    </Card>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="card accent purple"
      >
        <p>
          This is the card content.
        </p>
      </div>
    </div>
  `);
});

it("renders a card", () => {
  const { container } = render(
    <Card accent="green" title="The Undiscovered Country">
      <p>This is the card content.</p>
    </Card>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="card accent green"
      >
        <div
          class="header"
        >
          <h3
            class="base extraBold large uppercase"
          >
            The Undiscovered Country
          </h3>
        </div>
        <p>
          This is the card content.
        </p>
      </div>
    </div>
  `);
});

it("renders a link card", () => {
  const { container } = render(
    <Card accent="green" url="https://frend.space">
      <p>This is a link card.</p>
    </Card>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <a
        class="card accent clickable green"
        href="https://frend.space"
      >
        <p>
          This is a link card.
        </p>
      </a>
    </div>
  `);
});

it("renders a clickable card", () => {
  const { container } = render(
    <Card accent="green" onClick={jest.fn()}>
      <p>This is a clickable card.</p>
    </Card>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="card accent clickable green"
        data-testid="clickable-card"
        role="button"
        tabindex="0"
      >
        <p>
          This is a clickable card.
        </p>
      </div>
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
