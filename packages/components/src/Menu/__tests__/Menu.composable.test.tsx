import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "@jobber/components/Chip";
import * as POM from "../Menu.pom";
import { Menu } from "..";
import { Button } from "../../Button";
import { Text } from "../../Text";

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
            <span>Nav</span>
          </Menu.Header>
          <Menu.Item onClick={props.onItem}>
            <span>Open</span>
          </Menu.Item>
        </Menu.Section>
        <Menu.Separator />
        <Menu.Section>
          <Menu.Item>
            <Text>Two</Text>
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
          <Menu.Item>
            <Text>One</Text>
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
        <Menu.Item>
          <Text>One</Text>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
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
});
