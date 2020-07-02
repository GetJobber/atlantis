import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Page } from ".";
import { SectionProps } from "../Menu";

jest.mock("@jobber/hooks", () => {
  return {
    useResizeObserver: () => [
      { current: undefined },
      { width: 1000, height: 100 },
    ],
    defaultSizes: {
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
  const tree = renderer.create(
    <Page
      title="Notifications"
      intro="Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us/articles/115009737128)."
    >
      Sup
    </Page>,
  );

  expect(tree).toMatchSnapshot();
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
            onClick: () => {},
          },
          {
            label: "Email",
            icon: "email",
            onClick: () => {},
          },
        ],
      },
      {
        actions: [
          {
            label: "Edit",
            icon: "edit",
            onClick: () => {},
          },
        ],
      },
    ];

    const tree = renderer
      .create(
        <Page
          title="Notifications"
          intro="Improve job completion rates."
          primaryAction={{ label: "Send Food", onClick: () => {} }}
          secondaryAction={{
            label: "Send Drink",
            onClick: () => {},
          }}
          moreActionsMenu={sampleActionMenu}
        >
          Sup
        </Page>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
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
