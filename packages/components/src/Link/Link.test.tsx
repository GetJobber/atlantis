import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Link } from ".";

afterEach(cleanup);

describe("when a Link is rendered", () => {
  it("opens the link in the same tab if external is left at default value of false", () => {
    const { getByText } = render(
      <Link url="https://getjobber.com">This is a link</Link>,
    );
    const link = getByText("This is a link");
    expect(link.getAttribute("target")).toBeNull();
  });
  it("opens in a new tab if external is set to true", () => {
    const { getByText } = render(
      <Link url="https://getjobber.com" external={true}>
        This is a link
      </Link>,
    );
    const link = getByText("This is a link");
    expect(link.getAttribute("target")).toBe("_blank");
  });
});
