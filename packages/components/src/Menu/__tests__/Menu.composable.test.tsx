import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "@jobber/components/Chip";
import * as POM from "../Menu.pom";
import { Menu } from "..";
import { Button } from "../../Button";

// eslint-disable-next-line max-statements
describe("Menu (composable API)", () => {
  it("opens via mouse click and renders items", async () => {
    render(<TestSectionMenu />);
    await POM.openWithClick("Menu");
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
  });

  it("opens via Enter and focuses first item", async () => {
    render(<TestSectionMenu />);
    await POM.openWithKeyboard("Menu", "Enter");
    expect(screen.getAllByRole("menuitem")[0]).toHaveFocus();
  });

  it("opens via Space and focuses first item", async () => {
    render(<TestSectionMenu />);
    await POM.openWithKeyboard("Menu", "Space");
    expect(screen.getAllByRole("menuitem")[0]).toHaveFocus();
  });

  it("activates first item with Enter and closes", async () => {
    const onItem = jest.fn();
    render(<TestSectionMenu onItem={onItem} />);
    await POM.openWithKeyboard("Menu", "Enter");
    await waitFor(() =>
      expect(screen.getAllByRole("menuitem")[0]).toHaveFocus(),
    );
    await userEvent.keyboard("{Enter}");
    expect(onItem).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("activates an item when clicked", async () => {
    const onItem = jest.fn();
    render(<TestSectionMenu onItem={onItem} />);
    await POM.openWithClick("Menu");
    await userEvent.click(screen.getAllByRole("menuitem")[0]);
    expect(onItem).toHaveBeenCalledTimes(1);
  });

  it("activates first item with Space and closes", async () => {
    const onItem = jest.fn();
    render(<TestSectionMenu onItem={onItem} />);
    await POM.openWithKeyboard("Menu", "Space");
    await waitFor(() =>
      expect(screen.getAllByRole("menuitem")[0]).toHaveFocus(),
    );
    await userEvent.keyboard(" ");
    expect(onItem).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("renders a separator", async () => {
    render(<TestSectionMenu />);
    await POM.openWithClick("Menu");
    expect(screen.getByTestId("ATL-Menu-Separator")).toBeInTheDocument();
  });

  it("renders a header", async () => {
    render(<TestSectionMenu />);
    await POM.openWithClick("Menu");
    expect(screen.getByText("Section Header")).toBeInTheDocument();
  });

  describe("Trigger content without visible text", () => {
    it("opens via click using provided ariaLabel", async () => {
      render(<TestIconTriggerMenu />);
      await POM.openWithIconClick("menu");
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });
  describe("Trigger content with Chip", () => {
    it("calls onOpenChange when the menu is opened", async () => {
      const onOpenChange = jest.fn();
      render(<TestChipTriggerMenu onOpenChange={onOpenChange} />);
      await POM.openWithClick("ChipMenu");
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    describe("onOpenChange", () => {
      it("calls onOpenChange when the menu is opened", async () => {
        const onOpenChange = jest.fn();
        render(<TestSectionMenu onOpenChange={onOpenChange} />);
        await POM.openWithClick("Menu");
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });
  });

  describe("UNSAFE_className and UNSAFE_style", () => {
    it("applies UNSAFE props on Menu.Content", async () => {
      render(<TestUnsafePropsMenu />);
      await POM.openWithClick("Menu");

      const menu = screen.getByRole("menu");
      expect(menu).toHaveClass("unsafe-menu");
      expect(menu).toHaveStyle("border: 1px solid red");
    });

    it("applies UNSAFE props on Menu.Section", async () => {
      render(<TestUnsafePropsMenu />);
      await POM.openWithClick("Menu");

      const headingText = screen.getByText("Section Header");
      const headerEl = headingText.closest("header");
      const sectionContainer = headerEl?.closest(".unsafe-section");
      expect(sectionContainer).toBeInTheDocument();
      expect(sectionContainer).toHaveClass("unsafe-section");
      expect(sectionContainer).toHaveStyle("padding: 13px");
    });

    it("applies UNSAFE props on Menu.Header", async () => {
      render(<TestUnsafePropsMenu />);
      await POM.openWithClick("Menu");

      const headingText = screen.getByText("Section Header");
      const headerContainer = headingText.closest(".unsafe-header");
      expect(headerContainer).toBeInTheDocument();
      expect(headerContainer).toHaveClass("unsafe-header");
      expect(headerContainer).toHaveStyle("color: rgb(10, 20, 30)");
    });

    it("applies UNSAFE props on Menu.Item", async () => {
      render(<TestUnsafePropsMenu />);
      await POM.openWithClick("Menu");

      const item = screen.getAllByRole("menuitem")[0];
      expect(item).toHaveClass("unsafe-item");
      expect(item).toHaveStyle("margin: 11px");
    });

    it("applies UNSAFE props on Menu.Separator", async () => {
      render(<TestUnsafePropsMenu />);
      await POM.openWithClick("Menu");

      const separator = screen.getByTestId("ATL-Menu-Separator");
      expect(separator).toHaveClass("unsafe-sep");
      expect(separator).toHaveStyle("height: 7px");
    });
  });

  describe("Link integration and event mapping", () => {
    it("calls onClick with a MouseEvent for link items", async () => {
      const onItemClick = jest.fn();
      render(<TestLinkMenu onItemClick={onItemClick} />);

      await POM.openWithClick("Menu");
      await userEvent.click(screen.getByRole("menuitem"));

      expect(onItemClick).toHaveBeenCalledTimes(1);
      const evt = onItemClick.mock.calls[0][0];
      expect(evt).toBeDefined();
      expect(typeof evt.preventDefault).toBe("function");
    });

    it("forwards ref to the underlying anchor when href is provided", async () => {
      const ref = React.createRef<HTMLElement>();
      render(<TestLinkMenu withRef={ref} />);

      await POM.openWithClick("Menu");
      expect(ref.current).toBeTruthy();
      expect(ref.current?.tagName).toBe("A");
      expect(ref.current?.getAttribute("href") || "").toContain("/jobs");
    });

    it("calls onClick without an event for non-link items", async () => {
      const onItem = jest.fn();
      render(
        <Menu>
          <Menu.Trigger ariaLabel="Menu">
            <Button label="Menu" />
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item onClick={onItem} textValue="Open">
              <Menu.ItemLabel>Open</Menu.ItemLabel>
            </Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      await POM.openWithClick("Menu");
      await userEvent.click(screen.getByRole("menuitem"));

      expect(onItem).toHaveBeenCalledTimes(1);
      expect(onItem.mock.calls[0][0]).toBeUndefined();
    });
  });

  describe("Menu Customized", () => {
    it("uses customRender to fully customize item content", async () => {
      render(<TestCustomRenderMenu />);
      await POM.openWithClick("Menu");
      expect(screen.getByTestId("custom-item")).toBeInTheDocument();
    });

    it("uses customRender to fully customize header content", async () => {
      render(<TestCustomRenderMenu />);
      await POM.openWithClick("Menu");
      expect(screen.getByTestId("custom-header")).toBeInTheDocument();
    });
  });

  describe("Menu Default", () => {
    it("renders opinionated Menu.Item with label and icon", async () => {
      render(<TestDefaultMenuWithIcons />);
      await POM.openWithClick("Menu");
      const items = screen.getAllByRole("menuitem");
      expect(items.length).toBeGreaterThan(0);
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByTestId("email")).toBeInTheDocument();
    });

    it("renders opinionated Menu.Header with label", async () => {
      render(<TestDefaultMenuWithIcons />);

      await POM.openWithClick("Menu");
      expect(
        screen.getByRole("heading", { name: "Send as..." }),
      ).toBeInTheDocument();
    });
  });
});

function TestLinkMenu(props: {
  readonly onItemClick?: (e: React.MouseEvent) => void;
  readonly withRef?: React.Ref<HTMLElement>;
}) {
  return (
    <Menu>
      <Menu.Trigger ariaLabel="Menu">
        <Button label="Menu" />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item
          href="/jobs"
          textValue="Jobs"
          onClick={
            props.onItemClick as ((e?: React.MouseEvent) => void) | undefined
          }
          ref={props.withRef}
        >
          <Menu.ItemLabel>Jobs</Menu.ItemLabel>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

function TestSectionMenu(props: {
  readonly onItem?: () => void;
  readonly onOpenChange?: () => void;
}) {
  return (
    <Menu onOpenChange={props.onOpenChange}>
      <Menu.Trigger ariaLabel="Menu">
        <Button label="Menu" />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Section>
          <Menu.Header>
            <Menu.HeaderLabel>Section Header</Menu.HeaderLabel>
          </Menu.Header>
          <Menu.Item onClick={props.onItem} textValue="Open">
            <Menu.ItemLabel>Open</Menu.ItemLabel>
          </Menu.Item>
        </Menu.Section>
        <Menu.Separator />
        <Menu.Section>
          <Menu.Item textValue="Two">
            <Menu.ItemLabel>Two</Menu.ItemLabel>
          </Menu.Item>
        </Menu.Section>
      </Menu.Content>
    </Menu>
  );
}

function TestIconTriggerMenu() {
  return (
    <Menu>
      <Menu.Trigger ariaLabel="menu">
        <Button>
          <Button.Icon name="menu" />
        </Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Section>
          <Menu.Item textValue="One">
            <Menu.ItemLabel>One</Menu.ItemLabel>
          </Menu.Item>
        </Menu.Section>
      </Menu.Content>
    </Menu>
  );
}

function TestChipTriggerMenu(props: { readonly onOpenChange?: () => void }) {
  return (
    <Menu onOpenChange={props.onOpenChange}>
      <Menu.Trigger ariaLabel="ChipMenu">
        <Chip label="Menu" />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item textValue="One">
          <Menu.ItemLabel>One</Menu.ItemLabel>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

function TestUnsafePropsMenu() {
  return (
    <Menu>
      <Menu.Trigger ariaLabel="Menu">
        <Button label="Menu" />
      </Menu.Trigger>
      <Menu.Content
        UNSAFE_className="unsafe-menu"
        UNSAFE_style={{ border: "1px solid red" }}
      >
        <Menu.Section
          UNSAFE_className="unsafe-section"
          UNSAFE_style={{ padding: "13px" }}
        >
          <Menu.Header
            UNSAFE_className="unsafe-header"
            UNSAFE_style={{ color: "rgb(10, 20, 30)" }}
          >
            <Menu.HeaderLabel>Section Header</Menu.HeaderLabel>
          </Menu.Header>
          <Menu.Item
            UNSAFE_className="unsafe-item"
            UNSAFE_style={{ margin: "11px" }}
            textValue="Open"
          >
            <Menu.ItemLabel>Open</Menu.ItemLabel>
          </Menu.Item>
        </Menu.Section>
        <Menu.Separator
          UNSAFE_className="unsafe-sep"
          UNSAFE_style={{ height: "7px" }}
        />
      </Menu.Content>
    </Menu>
  );
}

function TestCustomRenderMenu() {
  return (
    <Menu>
      <Menu.Trigger ariaLabel="Menu">
        <Button label="Menu" />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Section>
          <Menu.Header>
            <div data-testid="custom-header">Header</div>
          </Menu.Header>
          <Menu.Item textValue="Email">
            <div data-testid="custom-item">Email</div>
          </Menu.Item>
          <Menu.Item textValue="Text message">
            <div>Text message</div>
          </Menu.Item>
          <Menu.Item textValue="Phone">
            <div>Phone</div>
          </Menu.Item>
        </Menu.Section>
      </Menu.Content>
    </Menu>
  );
}

function TestDefaultMenuWithIcons() {
  return (
    <Menu>
      <Menu.Trigger ariaLabel="Menu">
        <Button label="Menu" />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Section>
          <Menu.Header>
            <Menu.HeaderLabel>Send as...</Menu.HeaderLabel>
          </Menu.Header>
          <Menu.Item textValue="Email">
            <Menu.ItemLabel>Email</Menu.ItemLabel>
            <Menu.ItemIcon name="email" />
          </Menu.Item>
        </Menu.Section>
        <Menu.Separator />
        <Menu.Section>
          <Menu.Item destructive textValue="Delete">
            <Menu.ItemLabel>Delete</Menu.ItemLabel>
            <Menu.ItemIcon name="trash" />
          </Menu.Item>
        </Menu.Section>
      </Menu.Content>
    </Menu>
  );
}
