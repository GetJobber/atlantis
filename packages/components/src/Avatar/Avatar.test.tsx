import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Avatar } from ".";

afterEach(cleanup);

describe("Avatar", () => {
  describe("with image", () => {
    it("renders", () => {
      const { container } = render(
        <Avatar
          imageUrl="https://api.adorable.io/avatars/150/jobbler"
          name="The Jobbler"
          size="large"
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("with initials", () => {
    it("renders", () => {
      const { container } = render(<Avatar initials="JBLR" />);
      expect(container).toMatchSnapshot();
    });

    it("trims to the first 3 characters", () => {
      const { getByText } = render(
        <Avatar initials="JBLR ARE 2 MANY LETTERS" />,
      );
      expect(getByText("JBL").innerHTML.length).toBeLessThanOrEqual(3);
      expect(getByText("JBL").innerHTML).toBe("JBL");
    });

    describe("with dark color", () => {
      it("renders with light text", () => {
        const { getByText } = render(<Avatar initials="JB" color="black" />);
        expect(getByText("JB").closest("div").classList).toContain("isDark");
      });
    });
  });

  describe("without image or initials", () => {
    // Disabling typecheck here to test a fallback. This version of avatar
    // should never be used, but is created as an extra safety.
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { container } = render(<Avatar />);
    expect(container).toMatchSnapshot();
  });

  describe("with onClick", () => {
    it("renders as a button", () => {
      const { getByText } = render(<Avatar initials="JB" onClick={jest.fn} />);
      expect(getByText("JB").closest("button")).toBeInTheDocument();
    });

    it("triggers onClick when clicked", () => {
      const onClickFn = jest.fn();
      const { getByText } = render(
        <Avatar initials="JB" onClick={onClickFn} />,
      );
      fireEvent.click(getByText("JB"));
      expect(onClickFn).toHaveBeenCalledTimes(1);
    });
  });
});
