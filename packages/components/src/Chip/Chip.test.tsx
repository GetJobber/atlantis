import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Chip } from ".";

afterEach(cleanup);

describe("with an on click", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Chip
        label="jobber!"
        onClick={jest.fn}
        dismissAction={{ ariaLabel: "Remove", onRequestDismiss: jest.fn() }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should trigger the on click", () => {
    const onClickFn = jest.fn();
    const { getByText } = render(<Chip label="jobber!" onClick={onClickFn} />);
    fireEvent.click(getByText("jobber!"));
    expect(onClickFn).toHaveBeenCalledTimes(1);
  });

  describe("and disabled", () => {
    it("renders correctly", () => {
      const { container } = render(
        <Chip
          label="jobber!"
          disabled
          onClick={jest.fn}
          dismissAction={{ ariaLabel: "Remove", onRequestDismiss: jest.fn() }}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("should disable on click", () => {
      const onClickFn = jest.fn();
      const { getByText } = render(
        <Chip label="jobber!" disabled onClick={onClickFn} />,
      );
      fireEvent.click(getByText("jobber!"));
      expect(onClickFn).not.toHaveBeenCalled();
    });

    it("should hide dismissible action", () => {
      const onDismissFn = jest.fn();
      const { queryByLabelText } = render(
        <Chip
          avatar={{ name: "Joobler", initials: "JBL" }}
          label="jobber!"
          disabled
          dismissAction={{ ariaLabel: "Remove", onRequestDismiss: onDismissFn }}
        />,
      );
      expect(queryByLabelText("Remove")).toBeNull();
    });
  });

  describe("and selected", () => {
    it("renders correctly", () => {
      const { container } = render(
        <Chip
          label="jobber!"
          selected
          onClick={jest.fn}
          dismissAction={{ ariaLabel: "Remove", onRequestDismiss: jest.fn() }}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("should disable on click", () => {
      const onClickFn = jest.fn();
      const { getByText } = render(
        <Chip label="jobber!" selected onClick={onClickFn} />,
      );
      fireEvent.click(getByText("jobber!"));
      expect(onClickFn).not.toHaveBeenCalled();
    });

    it("should be able to trigger dismiss", () => {
      const onDismissFn = jest.fn();
      const { getByLabelText } = render(
        <Chip
          avatar={{ name: "Joobler", initials: "JBL" }}
          label="jobber!"
          selected
          dismissAction={{ ariaLabel: "Remove", onRequestDismiss: onDismissFn }}
        />,
      );
      fireEvent.click(getByLabelText("Remove"));
      expect(onDismissFn).toHaveBeenCalledTimes(1);
    });
  });

  describe("and with a dismiss", () => {
    it("won't bubble up", () => {
      const onDismissFn = jest.fn();
      const onClickFn = jest.fn();
      const { getByLabelText } = render(
        <Chip
          avatar={{ name: "Joobler", initials: "JBL" }}
          label="jobber!"
          onClick={onClickFn}
          dismissAction={{ ariaLabel: "Remove", onRequestDismiss: onDismissFn }}
        />,
      );
      fireEvent.click(getByLabelText("Remove"));
      expect(onDismissFn).toHaveBeenCalledTimes(1);
      expect(onClickFn).not.toHaveBeenCalled();
    });
  });
});

describe("with an avatar", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Chip avatar={{ name: "Joobler", initials: "JBL" }} label="jobber!" />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe("with an icon", () => {
  it("renders correctly", () => {
    const { container } = render(<Chip icon="apple" label="apple" />);
    expect(container).toMatchSnapshot();
  });
});

describe("with a dismissible action", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Chip
        label="apple"
        dismissAction={{ ariaLabel: "Remove", onRequestDismiss: jest.fn }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe("with an icon, avatar", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Chip
        avatar={{ name: "Joobler", initials: "JBL" }}
        icon="apple"
        label="apple"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
