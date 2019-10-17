import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { List } from ".";

afterEach(cleanup);

it("renders 1 List item with all the props", () => {
  const tree = renderer
    .create(
      <List
        items={[
          {
            amount: "$30.00",
            content: ["Build a deck", "Fa la la la la"],
            date: "Sep 24, 2019",
            url: "#",
            icon: "checkmark",
            iconColor: "green",
            id: 1,
            isActive: true,
            section: "Notification",
            title: "Jordan Yeo completed a visit",
            onClick: () => {
              /* do stuff */
            },
          },
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render a link with url list item", () => {
  const tree = renderer
    .create(
      <List
        items={[
          {
            id: 1,
            content: "Learn more",
            url: "/path/to/stuff",
          },
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render a button list item", () => {
  const tree = renderer
    .create(
      <List
        items={[
          {
            id: 1,
            content: "Click me",
            onClick: () => {
              /* do stuff */
            },
          },
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render an a tag with url and on click list item", () => {
  const tree = renderer
    .create(
      <List
        items={[
          {
            id: 1,
            content: "Learn more",
            url: "/path/to/stuff",
            onClick: () => {
              /* do stuff */
            },
          },
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("shouldn't render a list item if it's given an empty array", () => {
  const tree = renderer.create(<List items={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("When a list item is clicked", () => {
  test("it should call the handler when a onClick exists", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <List
        items={[
          {
            id: 1,
            content: "Build the deck",
            onClick: handleClick,
          },
        ]}
      />,
    );

    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });
});
