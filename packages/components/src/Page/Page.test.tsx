import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StatusLabel } from "@jobber/components/StatusLabel";
import { type ButtonActionProps, Page } from ".";
import { getActionProps } from "./Page";
import type { SectionProps } from "../Menu";
import { Heading } from "../Heading";
import { Menu } from "../Menu";

describe("Page", () => {
  it("renders Page", () => {
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
  it("renders heading and intro text", () => {
    render(
      <Page
        title="Notifications"
        intro="Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us/articles/115009737128)."
      >
        Sup
      </Page>,
    );

    expect(
      screen.getByRole("heading", { name: "Notifications", level: 1 }),
    ).toBeVisible();
    expect(
      screen.getByText(/Improve job completion rates/i),
    ).toBeInTheDocument();
  });
});

describe("When actions are provided", () => {
  it("renders a Page with action buttons and a menu", () => {
    const sampleActionMenu: SectionProps[] = [
      {
        header: "Send as...",
        actions: [
          { label: "Text Message", icon: "sms", onClick: jest.fn() },
          { label: "Email", icon: "email", onClick: jest.fn() },
        ],
      },
      { actions: [{ label: "Edit", icon: "edit", onClick: jest.fn() }] },
    ];

    render(
      <Page
        title="Notifications"
        intro="Improve job completion rates."
        primaryAction={{ label: "Send Food", onClick: jest.fn() }}
        secondaryAction={{ label: "Send Drink", onClick: jest.fn() }}
        moreActionsMenu={sampleActionMenu}
      >
        Sup
      </Page>,
    );

    expect(screen.getByText("Send Food")).toBeVisible();
    expect(screen.getByText("Send Drink")).toBeVisible();
    expect(screen.getByText("More Actions")).toBeVisible();
  });

  it("triggers the correct primary action on click", () => {
    const handlePrimaryAction = jest.fn();
    const handleSecondaryAction = jest.fn();

    const { getByText } = render(
      <Page
        title="Always Watching"
        intro="This be an intro."
        primaryAction={{ label: "First Do", onClick: handlePrimaryAction }}
        secondaryAction={{ label: "Second Do", onClick: handleSecondaryAction }}
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
      const buttonActionProps = { label: "Label" };
      const divRef = React.createRef<HTMLDivElement>();
      const buttonActionWithRefProps: ButtonActionProps = {
        label: "Label",
        ref: divRef,
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
      { actions: [{ label: "Text Message", onClick: handleMenuAction }] },
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

  it("renders title with metadata alongside", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title
            metadata={<StatusLabel label="Active" status="success" />}
          >
            Title With Badge
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

  it("renders subtitle with default markdown styling", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>Title</Page.Title>
          <Page.Subtitle>A **bold** subtitle</Page.Subtitle>
        </Page.Header>
        <Page.Body>Content</Page.Body>
      </Page>,
    );

    expect(screen.getByText(/bold/)).toBeVisible();
  });

  it("renders primary and secondary actions with defaults", async () => {
    const handlePrimary = jest.fn();
    const handleSecondary = jest.fn();

    render(
      <Page>
        <Page.Header>
          <Page.Title>Actions</Page.Title>
          <Page.Actions>
            <Page.PrimaryAction label="Create" onClick={handlePrimary} />
            <Page.SecondaryAction label="Cancel" onClick={handleSecondary} />
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

  it("allows custom children as a slot in PrimaryAction", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>Slot Test</Page.Title>
          <Page.Actions>
            <Page.PrimaryAction>
              <button type="button">My Custom Button</button>
            </Page.PrimaryAction>
          </Page.Actions>
        </Page.Header>
        <Page.Body>Content</Page.Body>
      </Page>,
    );

    expect(screen.getByText("My Custom Button")).toBeVisible();
  });

  it("renders Page.Menu with default trigger", () => {
    render(
      <Page>
        <Page.Header>
          <Page.Title>Menu Test</Page.Title>
          <Page.Actions>
            <Page.Menu>
              <Menu.Item textValue="Export" onClick={jest.fn()}>
                <Menu.ItemLabel>Export</Menu.ItemLabel>
              </Menu.Item>
            </Page.Menu>
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
            <Page.Menu triggerLabel="Options">
              <Menu.Item textValue="Settings" onClick={jest.fn()}>
                <Menu.ItemLabel>Settings</Menu.ItemLabel>
              </Menu.Item>
            </Page.Menu>
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
          <Page.Title metadata={<StatusLabel label="Draft" status="warning" />}>
            Full Example
          </Page.Title>
          <Page.Subtitle>A subtitle here</Page.Subtitle>
          <Page.Actions>
            <Page.PrimaryAction label="Create" onClick={jest.fn()} />
            <Page.SecondaryAction label="Export" onClick={jest.fn()} />
            <Page.Menu>
              <Menu.Item textValue="Import" onClick={jest.fn()}>
                <Menu.ItemLabel>Import</Menu.ItemLabel>
              </Menu.Item>
            </Page.Menu>
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
