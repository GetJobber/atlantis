import React from "react";
import { cleanup, render } from "@testing-library/react";
import { RootPortal } from "./RootPortal";
import { Modal } from "./Modal";

afterEach(cleanup);

test("Portal componet should render modal", () => {
  const title = "imma title";
  const content = "imma content";
  const handleClose = jest.fn();

  const modal = (
    <Modal title={title} open={true} onRequestClose={handleClose}>
      {content}
    </Modal>
  );

  const portal = render(<RootPortal>{modal}</RootPortal>);
  expect(portal).toMatchSnapshot();
});
