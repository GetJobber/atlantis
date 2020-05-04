import React, { ReactPortal } from "react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { ConfirmationModal } from "..";

beforeEach(() => {
  ReactDOM.createPortal = jest.fn(element => {
    return element as ReactPortal;
  });
});

afterEach(() => {
  (ReactDOM.createPortal as jest.Mock).mockClear();
});

it("renders a simple ConfirmationModal", () => {
  const tree = renderer
    .create(
      <ConfirmationModal
        title="Should we?"
        text="Do something…"
        open={true}
        confirmLabel="We Shall"
        onConfirm={() => jest.fn()}
        onCancel={() => jest.fn()}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
