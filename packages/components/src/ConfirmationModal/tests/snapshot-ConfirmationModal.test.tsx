/**
 * Once this PR lands we should be able to un-split these different test files.
 * https://github.com/GetJobber/atlantis/pull/171/files
 */

import { render } from "@testing-library/react";
import React, { ReactPortal } from "react";
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
  const { container } = render(
    <ConfirmationModal
      title="Should we?"
      message="Do something…"
      open={true}
      confirmLabel="We Shall"
      onConfirm={() => jest.fn()}
      onCancel={() => jest.fn()}
    />,
  );
  expect(container).toMatchSnapshot();
});
