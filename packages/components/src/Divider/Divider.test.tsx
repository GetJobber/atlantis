import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Divider } from ".";

afterEach(cleanup);

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
});
