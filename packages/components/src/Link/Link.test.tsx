import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Link } from ".";

afterEach(cleanup);

it("renders a Link", () => {
  const { container } = render(<Link text="Foo" url="https://getjobber.com" />);
  expect(container).toMatchSnapshot();
});

it("renders an external Link", () => {
  const { container } = render(
    <Link text="Foo" url="https://example.com" external={true} />,
  );
  expect(container).toMatchSnapshot();
});
