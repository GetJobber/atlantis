import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from ".";
import { Button } from "../Button";

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
      await userEvent.click(getByRole("button"));
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

      await userEvent.click(getByRole("button"));
      await userEvent.click(getByRole("menuitem"));
      expect(clickHandler).toHaveBeenCalledTimes(1);
      await waitFor(() => {
        expect(queryByRole("menuitem")).not.toBeInTheDocument();
      });
    });
  });

  describe("when menu is opened and escape is pressed", () => {
    const actionLabel = "Text Message";
    it("should close the menu", async () => {
      const { getByRole, queryByRole } = render(
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

      await userEvent.click(getByRole("button"));
      await userEvent.keyboard("{Escape}");
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

  it("should passthrough the onClick action", async () => {
    const clickHandler = jest.fn();

    const { getByRole } = render(
      <Menu
        activator={<Button label="Menu" onClick={clickHandler} />}
        items={[]}
      />,
    );

    await userEvent.click(getByRole("button"));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  describe("icon colors", () => {
    it("should default to --color-icon", async () => {
      render(
        <Menu
          activator={<Button label="Menu" />}
          items={[
            {
              actions: [
                {
                  label: "Down",
                  icon: "arrowDown",
                },
              ],
            },
          ]}
        />,
      );

      await userEvent.click(screen.getByRole("button"));

      const iconSvg = screen.getByTestId("arrowDown");
      expect(iconSvg.style.fill).toBe("var(--color-icon)");
    });

    it("should respect special icon colors", async () => {
      render(
        <Menu
          activator={<Button label="Menu" />}
          items={[
            {
              actions: [
                {
                  label: "New job",
                  icon: "job",
                },
              ],
            },
          ]}
        />,
      );

      await userEvent.click(screen.getByRole("button"));

      const iconSvg = screen.getByTestId("job");
      const pathElement = iconSvg.querySelectorAll("path")[0];
      expect(pathElement.style.fill).toBe("var(--color-job)");
    });

    it("should allow overriding icon colors", async () => {
      render(
        <Menu
          activator={<Button label="Menu" />}
          items={[
            {
              actions: [
                {
                  label: "New job",
                  icon: "job",
                  iconColor: "icon",
                },
              ],
            },
          ]}
        />,
      );

      await userEvent.click(screen.getByRole("button"));

      const iconSvg = screen.getByTestId("job");
      const pathElement = iconSvg.querySelectorAll("path")[0];
      expect(pathElement.style.fill).toBe("var(--color-icon)");
    });

    it("should use destructive icon color when action is marked as destructive", async () => {
      render(
        <Menu
          activator={<Button label="Menu" />}
          items={[
            {
              header: "Danger Zone",
              actions: [
                {
                  label: "Delete Item",
                  icon: "trash",
                  destructive: true,
                },
              ],
            },
          ]}
        />,
      );

      await userEvent.click(screen.getByRole("button"));

      const iconSvg = screen.getByTestId("trash");
      const pathElement = iconSvg.querySelectorAll("path")[0];
      expect(pathElement.style.fill).toBe("var(--color-destructive)");
    });
  });
});

it("should focus first action item from the menu when activated", async () => {
  render(
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

  await userEvent.click(screen.getByRole("button"));
  const firstMenuItem = screen.getAllByRole("menuitem")[0];
  expect(firstMenuItem).toHaveFocus();
});
