import React from "react";
import { render } from "@testing-library/react";
import { Divider } from ".";

describe("Divider", () => {
  it("should render", () => {
    const { container } = render(<Divider />);
    expect(container).toMatchSnapshot();
  });

  describe("when large", () => {
    it("renders", () => {
      const { container } = render(<Divider size="large" />);
      expect(container).toMatchSnapshot();
    });

    describe("when also vertical", () => {
      it("renders", () => {
        const { container } = render(
          <Divider direction="vertical" size="large" />,
        );
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe("when larger", () => {
    it("renders", () => {
      const { container } = render(<Divider size="larger" />);
      expect(container).toMatchSnapshot();
    });

    describe("when also vertical", () => {
      it("renders", () => {
        const { container } = render(
          <Divider direction="vertical" size="larger" />,
        );
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe("when largest", () => {
    it("renders", () => {
      const { container } = render(<Divider size="largest" />);
      expect(container).toMatchSnapshot();
    });

    describe("when also vertical", () => {
      it("renders", () => {
        const { container } = render(
          <Divider direction="vertical" size="largest" />,
        );
        expect(container).toMatchSnapshot();
      });
    });
  });
});
