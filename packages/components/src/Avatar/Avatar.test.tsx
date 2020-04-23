import React from "react";
import renderer from "react-test-renderer";
import { cleanup, render } from "@testing-library/react";
import { Avatar } from ".";

afterEach(cleanup);

it("renders a Avatar", () => {
  const tree = renderer
    .create(
      <Avatar
        imageUrl="https://api.adorable.io/avatars/150/jobbler"
        name="The Jobbler"
        size="large"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("displays initials if no image is set", () => {
  const tree = renderer.create(<Avatar initials="JBLR" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Initials are trimmed to the first 3 characters", () => {
  const { getByText } = render(<Avatar initials="JBLR ARE 2 MANY LETTERS" />);
  expect(getByText("JBL").innerHTML.length).toBeLessThanOrEqual(3);
  expect(getByText("JBL").innerHTML).toBe("JBL");
});

it("displays an icon if no image and no initials are set", () => {
  const tree = renderer.create(<Avatar />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Renders light text color if `color` is dark", () => {
  const { props } = renderer.create(<Avatar color="black" />).toJSON();
  expect(props.className).toContain("isDark");
});
