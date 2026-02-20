import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StatusLabel } from "@jobber/components/StatusLabel";
import { Page } from ".";
import { getActionProps } from "./Page";
import type { SectionProps } from "../Menu";
import { Heading } from "../Heading";
import { Menu } from "../Menu";

jest.mock("@jobber/hooks", () => {
  return {
    ...(jest.requireActual("@jobber/hooks") as Record<string, unknown>),
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

  it("renders secondary action without primary action", () => {
    const handleSecondaryAction = jest.fn();

    const { getByText } = render(
      <Page
        title="Secondary Only"
        secondaryAction={{
          label: "Secondary Action",
          onClick: handleSecondaryAction,
        }}
      >
        Content
      </Page>,
    );

    expect(getByText("Secondary Action")).toBeVisible();
    fireEvent.click(getByText("Secondary Action"));
    expect(handleSecondaryAction).toHaveBeenCalledTimes(1);
  });

  describe("getActionProps", () => {
    it("given action props, it returns the correct props", () => {
      const buttonActionProps = {
        label: "Label",
      };
      const buttonActionWithRefProps = {
        label: "Label",
        ref: { current: null },
      };

      expect(getActionProps(buttonActionProps)).toEqual(buttonActionProps);
      expect(getActionProps(buttonActionWithRefProps)).toEqual(
        buttonActionProps,
      );
    });
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

describe("When titleMetaData is provided", () => {
  it("should render the component", () => {
    const titleMetaDataTestId = "titleMetaDataTestId";
    const pageTitle = "The greatest page";

    const { getByText, getByTestId } = render(
      <Page
        title={pageTitle}
        titleMetaData={
          <div data-testid={titleMetaDataTestId}>
            <StatusLabel label={"Success"} status={"success"} />
          </div>
        }
      >
        Sup
      </Page>,
    );

    expect(getByText(pageTitle)).toBeDefined();
    expect(getByTestId(titleMetaDataTestId)).toBeDefined();
  });
});

describe("when title is a React node", () => {
  it("renders a Page using that node as the title", () => {
    render(
      <Page title={<Heading level={1}>Custom Heading Title</Heading>}>
        Page content
      </Page>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Custom Heading Title" }),
    ).toBeVisible();
  });

  it("does not render titleMetaData", () => {
    render(
      <Page
        title={<Heading level={1}>Custom Heading Title</Heading>}
        titleMetaData={<StatusLabel label={"Success"} status={"success"} />}
      >
        Page content
      </Page>,
    );

    expect(screen.queryByText("Success")).not.toBeInTheDocument();
  });
});

describe("Composable Page", () => {
  it("renders a page with title and body content", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>Composable Title</Page.Title>
        </Page.Header>
        <Page.Body>Body content</Page.Body>
      </Page>,
    );

    expect(
      screen.getByRole("heading", { name: "Composable Title", level: 1 }),
    ).toBeVisible();
    expect(screen.getByText("Body content")).toBeVisible();
  });

  it("renders title with metadata as a sub-component", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>
            Title With Badge
            <Page.TitleMetaData>
              <StatusLabel label="Active" status="success" />
            </Page.TitleMetaData>
          </Page.Title>
        </Page.Header>
        <Page.Body>Content</Page.Body>
      </Page>,
    );

    expect(
      screen.getByRole("heading", { name: "Title With Badge", level: 1 }),
    ).toBeVisible();
    expect(screen.getByText("Active")).toBeVisible();
  });

  it("renders subtitle with default styling for any children type", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>Title</Page.Title>
          <Page.Subtitle>A subtitle</Page.Subtitle>
        </Page.Header>
        <Page.Body>Content</Page.Body>
      </Page>,
    );

    expect(screen.getByText("A subtitle")).toBeVisible();
  });

  it("renders subtitle with ReactNode children using default styling", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>Title</Page.Title>
          <Page.Subtitle>
            <span>Translated subtitle</span>
          </Page.Subtitle>
        </Page.Header>
        <Page.Body>Content</Page.Body>
      </Page>,
    );

    expect(screen.getByText("Translated subtitle")).toBeVisible();
  });

  it("renders intro with default styling for any children type", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>Title</Page.Title>
        </Page.Header>
        <Page.Intro>
          <span>Translated intro</span>
        </Page.Intro>
        <Page.Body>Content</Page.Body>
      </Page>,
    );

    expect(screen.getByText("Translated intro")).toBeVisible();
  });

  it("renders actions with slots and default buttons", async () => {
    const handlePrimary = jest.fn();
    const handleSecondary = jest.fn();

    render(
      <Page>
        <Page.Header>
          <Page.Title>Actions</Page.Title>
          <Page.Actions>
            <Page.PrimarySlot>
              <Page.PrimaryAction label="Create" onClick={handlePrimary} />
            </Page.PrimarySlot>
            <Page.SecondarySlot>
              <Page.SecondaryAction label="Cancel" onClick={handleSecondary} />
            </Page.SecondarySlot>
          </Page.Actions>
        </Page.Header>
        <Page.Body>Content</Page.Body>
      </Page>,
    );

    expect(screen.getByText("Create")).toBeVisible();
    expect(screen.getByText("Cancel")).toBeVisible();

    await userEvent.click(screen.getByText("Create"));
    expect(handlePrimary).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByText("Cancel"));
    expect(handleSecondary).toHaveBeenCalledTimes(1);
  });

  it("allows custom children in slots", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>Slot Test</Page.Title>
          <Page.Actions>
            <Page.PrimarySlot>
              <button type="button">My Custom Button</button>
            </Page.PrimarySlot>
          </Page.Actions>
        </Page.Header>
        <Page.Body>Content</Page.Body>
      </Page>,
    );

    expect(screen.getByText("My Custom Button")).toBeVisible();
  });

  it("renders Page.Menu inside TertiarySlot", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>Menu Test</Page.Title>
          <Page.Actions>
            <Page.TertiarySlot>
              <Page.Menu>
                <Menu.Item textValue="Export" onClick={jest.fn()}>
                  <Menu.ItemLabel>Export</Menu.ItemLabel>
                </Menu.Item>
              </Page.Menu>
            </Page.TertiarySlot>
          </Page.Actions>
        </Page.Header>
        <Page.Body>Content</Page.Body>
      </Page>,
    );

    expect(screen.getByText("More Actions")).toBeVisible();
  });

  it("renders Page.Menu with custom trigger label", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>Menu Test</Page.Title>
          <Page.Actions>
            <Page.TertiarySlot>
              <Page.Menu triggerLabel="Options">
                <Menu.Item textValue="Settings" onClick={jest.fn()}>
                  <Menu.ItemLabel>Settings</Menu.ItemLabel>
                </Menu.Item>
              </Page.Menu>
            </Page.TertiarySlot>
          </Page.Actions>
        </Page.Header>
        <Page.Body>Content</Page.Body>
      </Page>,
    );

    expect(screen.getByText("Options")).toBeVisible();
  });

  it("renders a complete page with all composable pieces", () => {
    render(
      <Page width="fill">
        <Page.Header>
          <Page.Title>
            Full Example
            <Page.TitleMetaData>
              <StatusLabel label="Draft" status="warning" />
            </Page.TitleMetaData>
          </Page.Title>
          <Page.Subtitle>A subtitle here</Page.Subtitle>
          <Page.Actions>
            <Page.PrimarySlot>
              <Page.PrimaryAction label="Create" onClick={jest.fn()} />
            </Page.PrimarySlot>
            <Page.SecondarySlot>
              <Page.SecondaryAction label="Export" onClick={jest.fn()} />
            </Page.SecondarySlot>
            <Page.TertiarySlot>
              <Page.Menu>
                <Menu.Item textValue="Import" onClick={jest.fn()}>
                  <Menu.ItemLabel>Import</Menu.ItemLabel>
                </Menu.Item>
              </Page.Menu>
            </Page.TertiarySlot>
          </Page.Actions>
        </Page.Header>
        <Page.Body>Main content</Page.Body>
      </Page>,
    );

    expect(
      screen.getByRole("heading", { name: "Full Example", level: 1 }),
    ).toBeVisible();
    expect(screen.getByText("Draft")).toBeVisible();
    expect(screen.getByText("A subtitle here")).toBeVisible();
    expect(screen.getByText("Create")).toBeVisible();
    expect(screen.getByText("Export")).toBeVisible();
    expect(screen.getByText("More Actions")).toBeVisible();
    expect(screen.getByText("Main content")).toBeVisible();
  });
});
