import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import type { BaseListItemProps } from ".";
import { List } from ".";
import { Text } from "../Text";

it("renders 1 List item with all the props", () => {
  const { container } = render(
    <List
      items={[
        {
          value: "$30.00",
          content: ["Build a deck", "Fa la la la la"],
          caption: "Sep 24, 2019",
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
  );
  expect(container).toMatchSnapshot();
});

it("renders a list with multiple sections", () => {
  const { container } = render(
    <List
      items={[
        {
          value: "$30.00",
          content: ["Build a deck", "Fa la la la la"],
          caption: "Sep 24, 2019",
          url: "#",
          icon: "checkmark",
          iconColor: "green",
          id: 1,
          isActive: true,
          section: "Notifications",
          title: "Jordan Yeo completed a visit",
          onClick: () => {
            /* do stuff */
          },
        },
        {
          value: "$40.00",
          content: ["Foo bar", "Baz"],
          caption: "Sep 25, 2019",
          url: "#",
          icon: "checkmark",
          iconColor: "green",
          id: 1,
          isActive: true,
          section: "Urgent Notifications",
          title: "Jordan Yeo requires assistance",
          onClick: () => {
            /* do stuff */
          },
        },
      ]}
    />,
  );
  expect(container).toMatchSnapshot();
});

it("should render a link with url list item", () => {
  const { container } = render(
    <List
      items={[
        {
          id: 1,
          content: "Learn more",
          url: "/path/to/stuff",
        },
      ]}
    />,
  );
  expect(container).toMatchSnapshot();
});

it("should render a button list item", () => {
  const { container } = render(
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
  );
  expect(container).toMatchSnapshot();
});

it("should render an a tag with url and on click list item", () => {
  const { container } = render(
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
  );
  expect(container).toMatchSnapshot();
});

it("shouldn't render a list item if it's given an empty array", () => {
  const { container } = render(<List items={[]} />);
  expect(container).toMatchSnapshot();
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

describe("When a list is provided a custom render function", () => {
  test("it should use the custom render instead of default ListItem behaviour", () => {
    interface CustomListItemProps extends BaseListItemProps {
      readonly name: string;
      readonly address: string;
    }

    function CustomRenderer({
      listItem,
    }: {
      readonly listItem: CustomListItemProps;
    }) {
      return (
        <div>
          <Text>{listItem.name}</Text>
          <Text>{listItem.address}</Text>
        </div>
      );
    }
    const { container } = render(
      <List
        items={[
          {
            id: 1,
            name: "Jane Doe",
            address: "123 Main St",
          },
          {
            id: 2,
            name: "Joe Doe",
            address: "456 Main St",
          },
        ]}
        customRenderItem={item => <CustomRenderer listItem={item} />}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test("it should handle a sectioned list with a custom render function", () => {
    interface CustomListItemProps extends BaseListItemProps {
      readonly name: string;
      readonly address: string;
      readonly section: string;
    }

    function CustomRenderer({
      listItem,
    }: {
      readonly listItem: CustomListItemProps;
    }) {
      return (
        <div>
          <Text>{listItem.name}</Text>
          <Text>{listItem.address}</Text>
        </div>
      );
    }
    const { container } = render(
      <List
        items={[
          {
            id: 1,
            name: "Jane Doe",
            address: "123 Main St",
            section: "Employees",
          },
          {
            id: 2,
            name: "Joe Doe",
            address: "456 Main St",
            section: "Employees",
          },
          {
            id: 3,
            name: "Milton Bradley",
            address: "123 Fake St",
            section: "Customers",
          },
          {
            id: 4,
            name: "Tony Redman",
            address: "456 Fake St",
            section: "Customers",
          },
        ]}
        customRenderItem={item => <CustomRenderer listItem={item} />}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test("it should allow for custom styles", () => {
    interface CustomListItemProps extends BaseListItemProps {
      readonly name: string;
      readonly address: string;
    }

    function CustomRenderer({
      listItem,
    }: {
      readonly listItem: CustomListItemProps;
    }) {
      return (
        <div style={{ padding: "10px" }}>
          <Text>{listItem.name}</Text>
          <Text>{listItem.address}</Text>
        </div>
      );
    }
    const { container } = render(
      <List
        items={[
          {
            id: 1,
            name: "Jane Doe",
            address: "123 Main St",
          },
          {
            id: 2,
            name: "Joe Doe",
            address: "456 Main St",
          },
        ]}
        customRenderItem={item => <CustomRenderer listItem={item} />}
        customItemStyles={true}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe("When a list is provided a custom render function for sections", () => {
  test("it should use the custom render instead of default section header behaviour", () => {
    render(
      <List
        items={[
          {
            id: 1,
            name: "Jane Doe",
            address: "123 Main St",
            section: "Employees",
          },
          {
            id: 3,
            name: "Milton Bradley",
            address: "123 Fake St",
            section: "Customers",
          },
        ]}
        customRenderSection={section => (
          <span data-testid="customSectionHeader">{section}</span>
        )}
      />,
    );

    const customSectionHeader = screen.getAllByTestId("customSectionHeader");
    // we have 2 different section header: customers and employees
    expect(customSectionHeader).toHaveLength(2);
  });
});

describe("Default Section Header", () => {
  test("it should render the default section header when at least one section value is absent", () => {
    render(
      <List
        items={[
          {
            id: 1,
            content: "Build the deck",
            onClick: () => {
              /* do stuff */
            },
          },
          {
            id: 2,
            content: "Hey I'm walkin here",
            section: "Gabbagool",
            onClick: () => {
              /* do stuff */
            },
          },
        ]}
      />,
    );

    const defaultSectionHeader = screen.getByText("Other");
    expect(defaultSectionHeader).toBeInTheDocument();
  });
  test("it should render the provided section header when at least one section value is absent", () => {
    render(
      <List
        defaultSectionHeader="Alternative"
        items={[
          {
            id: 1,
            content: "Build the deck",
            onClick: () => {
              /* do stuff */
            },
          },
          {
            id: 2,
            content: "Hey I'm walkin here",
            section: "Gabbagool",
            onClick: () => {
              /* do stuff */
            },
          },
        ]}
      />,
    );

    const defaultSectionHeader = screen.getByText("Alternative");
    expect(defaultSectionHeader).toBeInTheDocument();
  });
});
