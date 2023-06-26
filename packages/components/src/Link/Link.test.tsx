import React from "react";
import { render } from "@testing-library/react";
import { Link } from ".";

const testUrl = "https://getjobber.com";
const testText = "This is a link";

describe("when a Link is rendered", () => {
  it("opens the link in the same tab if external is left at default value of false", () => {
    const { getByText } = render(<Link url={testUrl}>{testText}</Link>);
    const link = getByText(testText);
    expect(link.getAttribute("target")).toBeNull();
  });
  it("opens in a new tab if external is set to true", () => {
    const { getByText } = render(
      <Link url={testUrl} external={true}>
        {testText}
      </Link>,
    );
    const link = getByText(testText);
    expect(link.getAttribute("target")).toBe("_blank");
  });
  it("links to the correct url provided", () => {
    const { getByText } = render(<Link url={testUrl}>{testText}</Link>);
    const link = getByText(testText);
    expect(link.getAttribute("href")).toBe(testUrl);
  });
});
