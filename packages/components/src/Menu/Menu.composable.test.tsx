import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from ".";
import * as POM from "./Menu.pom";
import { Button } from "../Button";
import { Text } from "../Text";

describe("Menu (composable API)", () => {
  function TestSectionMenu(props: { readonly onItem?: () => void }) {
    return (
      <Menu>
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
        </Menu.Content>
      </Menu>
    );
  }

  function TestStringTriggerMenu() {
    return (
      <Menu>
        <Menu.Trigger ariaLabel="Simple">
          <Text>Simple</Text>
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

  it("opens via mouse click and renders items", async () => {
    render(<TestSectionMenu />);
    await POM.openWithClick("Menu");
    expect(screen.getByRole("menuitem")).toBeInTheDocument();
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

  describe("string trigger content", () => {
    it("opens via click using provided ariaLabel", async () => {
      render(<TestStringTriggerMenu />);
      await POM.openWithClick("Simple");
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });
});
