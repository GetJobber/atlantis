import { render } from "@testing-library/react";
import React, { ReactPortal } from "react";
import ReactDOM from "react-dom";
import { Modal } from ".";

describe("Button Variations", () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => {
      return element as ReactPortal;
    });
  });

  afterEach(() => {
    (ReactDOM.createPortal as jest.Mock).mockClear();
  });

  test("modal shows with primary learning button", () => {
    const { container } = render(
      <Modal
        title="Teaching Modal"
        open={true}
        primaryAction={{
          label: "I Would Like to Know More",
          variation: "learning",
        }}
        secondaryAction={{
          label: "Nevermind",
        }}
      >
        Learn a lesson?
      </Modal>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
