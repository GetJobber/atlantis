import React from "react";
import renderer from "react-test-renderer";
import {
  cleanup,
  fireEvent,
  getByLabelText,
  render,
} from "@testing-library/react";
import { Menu } from ".";

afterEach(cleanup);

it("renders a Menu", () => {
  const actions = [
    {
      actions: [{ label: "Import file" }, { label: "Export file" }],
    },
    {
      header: "Mark as...",
      actions: [{ label: "Sent" }, { label: "Paid" }],
    },
  ];
  const tree = renderer.create(<Menu items={actions} />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper"
    >
      <button
        aria-controls="menuID"
        aria-expanded={false}
        aria-haspopup={true}
        className="button base hasIcon work secondary"
        disabled={false}
        id="buttonID"
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

test("it should call the handler with the new value", () => {
  const header = "Mark as...";
  const actionLabel = "Awaiting Response";
  const clickHandler = jest.fn();
  const actions = [
    {
      header: header,
      actions: [{ label: actionLabel, onClick: clickHandler }],
    },
  ];

  const { getByRole, queryByTestId } = render(<Menu items={actions} />);

  fireEvent.click(getByRole("button"));
  expect(queryByTestId("menu-popup")).toBeTruthy();

  fireEvent.click(getByRole("menuitem"));
  expect(clickHandler).toHaveBeenCalledTimes(1);

  fireEvent.click(getByRole("button"));
  expect(queryByTestId("menu-popup")).toBeNull();
});
