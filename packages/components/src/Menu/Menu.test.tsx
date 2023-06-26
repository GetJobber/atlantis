import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Menu } from ".";
import { Button } from "../Button";

afterEach(cleanup);
jest.mock("uuid");

describe("Menu", () => {
  it("renders", () => {
    const { container } = render(
      <Menu
        items={[
          {
            header: "Send as...",
            actions: [
              {
                label: "Text Message",
                icon: "sms",
              },
              {
                label: "Email",
                icon: "email",
              },
            ],
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  describe("when clicking on the activator", () => {
    it("should open the menu", async () => {
      const header = "Mark as...";
      const actionLabel = "Awaiting Response";
      const clickHandler = jest.fn();
      const actions = [
        {
          header: header,
          actions: [{ label: actionLabel, onClick: clickHandler }],
        },
      ];
      const { getByRole } = render(<Menu items={actions} />);
      fireEvent.click(getByRole("button"));
      await waitFor(() => {
        expect(getByRole("menuitem")).toBeInTheDocument();
      });
    });
  });

  describe("when clicking on menu item", () => {
    it("should close the menu and trigger onClick", async () => {
      const header = "Mark as...";
      const actionLabel = "Awaiting Response";
      const clickHandler = jest.fn();
      const actions = [
        {
          header: header,
          actions: [{ label: actionLabel, onClick: clickHandler }],
        },
      ];
      const { getByRole, queryByRole } = render(<Menu items={actions} />);

      fireEvent.click(getByRole("button"));
      fireEvent.click(getByRole("menuitem"));
      expect(clickHandler).toHaveBeenCalledTimes(1);
      await waitFor(() => {
        expect(queryByRole("menuitem")).not.toBeInTheDocument();
      });
    });
  });

  describe("when menu is opened and escape is pressed", () => {
    const actionLabel = "Text Message";
    it("should close the menu", async () => {
      const { getByRole, queryByRole, container } = render(
        <Menu
          items={[
            {
              header: "Send as...",
              actions: [
                {
                  label: actionLabel,
                  icon: "sms",
                },
                {
                  label: "Email",
                  icon: "email",
                },
              ],
            },
          ]}
        />,
      );

      fireEvent.click(getByRole("button"));
      fireEvent.keyDown(container, {
        key: "Escape",
        code: "Escape",
      });
      await waitFor(() => {
        expect(queryByRole("menuitem")).not.toBeInTheDocument();
      });
    });
  });

  describe("with custom activator", () => {
    it("renders", () => {
      const { container } = render(
        <Menu
          activator={<Button label="Menu" />}
          items={[
            {
              header: "Send as...",
              actions: [
                {
                  label: "Text Message",
                  icon: "sms",
                },
                {
                  label: "Email",
                  icon: "email",
                },
              ],
            },
          ]}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  it("should passthrough the onClick action", () => {
    const clickHandler = jest.fn();
    const actions = [];

    const { getByRole } = render(
      <Menu
        activator={<Button label="Menu" onClick={clickHandler} />}
        items={actions}
      />,
    );

    fireEvent.click(getByRole("button"));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});

it("should focus first action item from the menu when activated", async () => {
  jest.useFakeTimers();
  const { getByRole } = render(
    <Menu
      activator={<Button label="Menu" />}
      items={[
        {
          header: "Send as...",
          actions: [
            {
              label: "Text Message",
              icon: "sms",
            },
            {
              label: "Email",
              icon: "email",
            },
          ],
        },
      ]}
    />,
  );

  fireEvent.click(getByRole("button"));
  const firstMenuItem = screen.getAllByRole("menuitem")[0];
  expect(firstMenuItem).not.toHaveFocus();
  jest.runAllTimers();
  expect(firstMenuItem).toHaveFocus();
  jest.useRealTimers();
});
