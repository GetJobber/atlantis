import React from "react";
import { render, screen } from "@testing-library/react";
import { Disclosure } from ".";
import { Icon } from "../Icon";

it("renders a Disclosure", () => {
  const { container } = render(
    <Disclosure title="Example Disclosure Title">
      <p>Wafer topping soufflé bear claw cake chocolate toffee.</p>
    </Disclosure>,
  );
  expect(container).toMatchSnapshot();
});

it("renders a Disclosure which should be closed by default", () => {
  const { queryByRole } = render(
    <Disclosure title="I am Disclosure">
      <span>Bacon ipsum dolor amet leberkas picanha landjaeger ham.</span>
    </Disclosure>,
  );

  const detailsElement = queryByRole("group");
  expect(detailsElement.getAttribute("open")).toBeNull();
});

it("renders a Disclosure that is opened if `defaultOpen` is set", () => {
  const { queryByRole } = render(
    <Disclosure defaultOpen title="I am Disclosure">
      <span>Cotton candy tootsie roll lemon drops tiramisu cake tart.</span>
    </Disclosure>,
  );

  const detailsElement = queryByRole("group");
  expect(detailsElement.getAttribute("open")).not.toBeNull();
});

describe("When a custom title is provided", () => {
  it("renders the custom title", () => {
    render(
      <Disclosure
        title={
          <>
            <Icon name="archive" />
            <span>Custom Title</span>
          </>
        }
      >
        <span>Content</span>
      </Disclosure>,
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByTestId("archive")).toBeInTheDocument();
  });

  it("should not render a custom title if the passed 'title' is a string", () => {
    const title = "String Title";
    const customTitleClass = "customSummaryWrap";
    render(
      <Disclosure title={title}>
        <span>Content</span>
      </Disclosure>,
    );
    expect(screen.getByText(title).parentElement).not.toHaveClass(
      customTitleClass,
    );
  });
});
