import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Divider } from ".";

afterEach(cleanup);

describe("Divider", () => {
  it("should render", () => {
    const { container } = render(<Divider />);
    expect(container).toMatchSnapshot();
  });

  it("should render element as hr", () => {
    const { queryByRole } = render(<Divider />);
    expect(queryByRole("none").tagName).toBe("HR");
  });

  describe("when large", () => {
    it("renders", () => {
      const { container } = render(<Divider size="large" />);
      expect(container).toMatchSnapshot();
    });

    describe("when also vertical", () => {
      it("renders", () => {
        const { container } = render(<Divider vertical size="large" />);
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe("when vertical", () => {
    it("should render as div", () => {
      const { queryByRole } = render(<Divider vertical />);
      expect(queryByRole("none").tagName).toBe("DIV");
    });
  });
});
