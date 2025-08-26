import React from "react";
import { render } from "@testing-library/react";
import { Divider } from ".";

describe("Divider", () => {
  it("should render", () => {
    const { container } = render(<Divider />);
    expect(container).toMatchSnapshot();
  });

  it("applies testID prop to div element", () => {
    const { getByTestId } = render(<Divider testID="ATL-divider" />);
    expect(getByTestId("ATL-divider")).toBeInTheDocument();
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

  describe("UNSAFE props", () => {
    it("should apply UNSAFE_className to the container", () => {
      const { getByTestId } = render(
        <Divider
          UNSAFE_className={{ container: "custom-class" }}
          testID="ATL-divider"
        />,
      );

      expect(getByTestId("ATL-divider")).toHaveClass("custom-class");
    });

    it("should apply UNSAFE_style to the container", () => {
      const { getByTestId } = render(
        <Divider
          UNSAFE_style={{ container: { color: "red" } }}
          testID="ATL-divider"
        />,
      );
      expect(getByTestId("ATL-divider")).toHaveStyle("color: red");
    });
  });
});
