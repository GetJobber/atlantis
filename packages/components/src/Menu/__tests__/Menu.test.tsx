import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "..";
import { Button } from "../../Button";
import { withMockedViewport } from "../../testUtils/viewport";

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
      const pathElement = iconSvg.querySelector("path");
      expect(pathElement).toHaveStyle("fill: var(--color-job)");
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
      const pathElement = iconSvg.querySelector("path");
      expect(pathElement).toHaveStyle("fill: var(--color-icon)");
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
      const pathElement = iconSvg.querySelector("path");
      expect(pathElement).toHaveStyle("fill: var(--color-destructive)");
    });
  });

  describe("UNSAFE props", () => {
    it("should apply UNSAFE_className and UNSAFE_style to menu when opened", async () => {
      render(
        <Menu
          items={[
            {
              actions: [{ label: "Test" }],
            },
          ]}
          UNSAFE_className={{ menu: "custom-menu-class" }}
          UNSAFE_style={{ menu: { color: "blue" } }}
        />,
      );

      await userEvent.click(screen.getByRole("button"));

      const menu = screen.getByRole("menu");
      expect(menu).toHaveClass("custom-menu-class");
      expect(menu).toHaveStyle("color: blue");
    });
  });

  it("should apply UNSAFE_className and UNSAFE_style to section header", async () => {
    render(
      <Menu
        items={[
          {
            header: "Test",
            actions: [{ label: "Test" }],
          },
        ]}
        UNSAFE_className={{ header: "custom-header-class" }}
        UNSAFE_style={{ header: { color: "red" } }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    // The header element we're applying the style to is hidden for accessibility reasons and has no reliable identifier
    const header = screen.getByRole("heading", { hidden: true }).parentElement;

    expect(header).toHaveClass("custom-header-class");
    expect(header).toHaveStyle("color: red");
  });
  it("should apply UNSAFE_className and UNSAFE_style to all actions", async () => {
    render(
      <Menu
        items={[
          {
            actions: [{ label: "Test" }],
          },
        ]}
        UNSAFE_className={{ action: "custom-action-class" }}
        UNSAFE_style={{ action: { color: "green" } }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    const actions = screen.getAllByRole("menuitem");

    actions.forEach(action => {
      expect(action).toHaveClass("custom-action-class");
      expect(action).toHaveStyle("color: green");
    });
  });
});

it("should focus first action item from the menu when activated by keyboard", async () => {
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
  const trigger = screen.getByRole("button");

  trigger.focus();

  await userEvent.keyboard("{Enter}");
  const allItems = await screen.findAllByRole("menuitem");

  await waitFor(() => {
    expect(allItems[0]).toHaveFocus();
  });
});

describe("Menu max-height behavior", () => {
  const items = [
    {
      actions: [
        {
          label: "One",
        },
        {
          label: "Two",
        },
        {
          label: "Three",
        },
      ],
    },
  ];

  it("applies an inline max-height on large screens", async () => {
    await withMockedViewport({ width: 1024, height: 800 }, async () => {
      render(<Menu activator={<Button label="Menu" />} items={items} />);

      await userEvent.click(screen.getByRole("button"));

      const menu = await screen.findByRole("menu");
      await waitFor(() => {
        // Ensure inline max-height is present with a px value
        expect(menu).toHaveAttribute(
          "style",
          expect.stringMatching(/max-height:\s*\d+px/i),
        );
      });
    });
  });

  it("does not apply inline max-height on small screens", async () => {
    await withMockedViewport({ width: 360, height: 640 }, async () => {
      render(<Menu activator={<Button label="Menu" />} items={items} />);

      await userEvent.click(screen.getByRole("button"));

      const menu = await screen.findByRole("menu");

      // On small screens we omit the FloatingUI size middleware, so no inline max-height should be set
      expect(menu).not.toHaveAttribute(
        "style",
        expect.stringMatching(/max-height\s*:/i),
      );
    });
  });
});
