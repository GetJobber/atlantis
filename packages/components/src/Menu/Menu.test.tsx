import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Menu } from ".";

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
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper"
    >
      <button
        aria-controls="123e4567-e89b-12d3-a456-426655440000"
        aria-expanded={false}
        aria-haspopup={true}
        className="button base hasIcon work secondary"
        disabled={false}
        id="123e4567-e89b-12d3-a456-426655440000"
        onClick={[Function]}
      >
        <div
          className="icon more base"
        />
        <span
          className="base small extraBold uppercase green"
        >
          More
        </span>
      </button>
    </div>
  `);
});

test("It should open and close the menu", () => {
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

  fireEvent.click(getByRole("button"));
  expect(queryAllByText(actionLabel).length).toBe(0);
});
