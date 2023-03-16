import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Avatar } from ".";

afterEach(cleanup);

it("renders a Avatar", () => {
  const { container } = render(
    <Avatar
      imageUrl="https://api.adorable.io/avatars/150/jobbler"
      name="The Jobbler"
      size="large"
    />,
  );

  expect(container).toMatchSnapshot();
});

it("displays initials if no image is set", () => {
  const { container } = render(<Avatar initials="JBLR" />);
  expect(container).toMatchSnapshot();
});

it("Initials are trimmed to the first 3 characters", () => {
  const { getByText } = render(<Avatar initials="JBLR ARE 2 MANY LETTERS" />);
  expect(getByText("JBL").innerHTML.length).toBeLessThanOrEqual(3);
  expect(getByText("JBL").innerHTML).toBe("JBL");
});

// it("displays an icon if no image and no initials are set", () => {
//   // Disabling typecheck here to test a fallback. This version of avatar
//   // should never be used, but is created as an extra safety.
//   // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//   // @ts-ignore
//   const { container } = render(<Avatar />);
//   expect(container).toMatchSnapshot();
// });

it("Renders light text color if `color` is dark", () => {
  const { container } = render(<Avatar initials="JB" color="black" />);
  expect(container.firstChild).toHaveClass("isDark");
});
