import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Page } from ".";
import { SectionProps } from "../Menu";

jest.mock("@jobber/hooks", () => {
  return {
    ...(jest.requireActual("@jobber/hooks") as object),
    useResizeObserver: () => [
      { current: undefined },
      { width: 1000, height: 100 },
    ],

    Breakpoints: {
      base: 640,
      small: 500,
      smaller: 265,
      large: 750,
      larger: 1024,
    },
  };
});

afterEach(cleanup);

it("renders a Page", () => {
  const { container } = render(
    <Page
      title="Notifications"
      intro="Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us/articles/115009737128)."
    >
      Sup
    </Page>,
  );

  expect(container).toMatchSnapshot();
});

describe("When actions are provided", () => {
  it("renders a Page with action buttons and a menu", () => {
    const sampleActionMenu: SectionProps[] = [
      {
        header: "Send as...",
        actions: [
          {
            label: "Text Message",
            icon: "sms",
            onClick: jest.fn(),
          },
          {
            label: "Email",
            icon: "email",
            onClick: jest.fn(),
          },
        ],
      },
      {
        actions: [
          {
            label: "Edit",
            icon: "edit",
            onClick: jest.fn(),
          },
        ],
      },
    ];

    const { container } = render(
      <Page
        title="Notifications"
        intro="Improve job completion rates."
        primaryAction={{ label: "Send Food", onClick: jest.fn() }}
        secondaryAction={{
          label: "Send Drink",
          onClick: jest.fn(),
        }}
        moreActionsMenu={sampleActionMenu}
      >
        Sup
      </Page>,
    );

    expect(container).toMatchSnapshot();
  });

  it("triggers the correct primary action on click", () => {
    const handlePrimaryAction = jest.fn();
    const handleSecondaryAction = jest.fn();

    const { getByText } = render(
      <Page
        title="Always Watching"
        intro="This be an intro."
        primaryAction={{ label: "First Do", onClick: handlePrimaryAction }}
        secondaryAction={{
          label: "Second Do",
          onClick: handleSecondaryAction,
        }}
      >
        Sup
      </Page>,
    );

    fireEvent.click(getByText("First Do"));
    expect(handlePrimaryAction).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText("Second Do"));
    expect(handleSecondaryAction).toHaveBeenCalledTimes(1);
  });
});

describe("When moreActions are provided", () => {
  it("renders a Page with a moreAction menu", () => {
    const handleMenuAction = jest.fn();

    const simpleActionMenu: SectionProps[] = [
      {
        actions: [
          {
            label: "Text Message",
            onClick: handleMenuAction,
          },
        ],
      },
    ];
    const { getByText } = render(
      <Page
        title="The Eye"
        intro="Huh, guess so."
        moreActionsMenu={simpleActionMenu}
      >
        Sup
      </Page>,
    );

    // Open the Menu
    fireEvent.click(getByText("More Actions"));

    fireEvent.click(getByText("Text Message"));
    expect(handleMenuAction).toHaveBeenCalledTimes(1);
  });
});

describe("When intro is provided with links", () => {
  it("opens intro links in same tab if externalIntrolinks is not provided", () => {
    const { getByRole } = render(
      <Page
        title="The Weakest Link"
        intro="Where does this link open? [click me, I dare you](https://example.com/)"
      >
        Sup
      </Page>,
    );

    const renderedLink = getByRole("link");
    expect(renderedLink.textContent).toBe("click me, I dare you");
    expect(renderedLink.getAttribute("target")).toBeNull();
  });

  it("opens intro links in same tab if externalIntrolinks is false", () => {
    const { getByRole } = render(
      <Page
        title="The Weakest Link"
        intro="Where does this link open? [click me, I dare you](https://example.com/)"
        externalIntroLinks={false}
      >
        Sup
      </Page>,
    );

    const renderedLink = getByRole("link");
    expect(renderedLink.textContent).toBe("click me, I dare you");
    expect(renderedLink.getAttribute("target")).toBeNull();
  });

  it("opens intro links in a new tab if externalIntrolinks is true", () => {
    const { getByRole } = render(
      <Page
        title="The Weakest Link"
        intro="Where does this link open? [click me, I dare you](https://example.com/)"
        externalIntroLinks={true}
      >
        Sup
      </Page>,
    );

    const renderedLink = getByRole("link");
    expect(renderedLink.textContent).toBe("click me, I dare you");
    expect(renderedLink.getAttribute("target")).toBe("_blank");
  });
});
