import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Menu } from ".";
import { Button } from "../Button";

afterEach(cleanup);
jest.mock("uuid");

it("renders a Menu", () => {
  const tree = renderer
    .create(
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
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Menu with custom activator", () => {
  const tree = renderer
    .create(
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
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should open and close the menu", () => {
  const header = "Mark as...";
  const actionLabel = "Awaiting Response";
  const clickHandler = jest.fn();
  const actions = [
    {
      header: header,
      actions: [{ label: actionLabel, onClick: clickHandler }],
    },
  ];

  const { getByRole, queryAllByText } = render(<Menu items={actions} />);

  fireEvent.click(getByRole("button"));
  expect(queryAllByText(actionLabel).length).toBe(1);

  fireEvent.click(getByRole("menuitem"));
  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(queryAllByText(actionLabel).length).toBe(0);
});

test("it should passthrough an activator's click action", () => {
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
