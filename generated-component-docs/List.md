# List

# List

The `List` component renders a collection of items in a structured way. It
supports both [flat lists](#basic-flat-list) and
[sectioned lists](#sectioned-list), and allows for
[custom rendering](#custom-rendering-advanced-usage) of list items via a render
function.

## Design & usage Guidelines

The `List` component is a great solution if you are looking to display a
collection of objects that are either the same type or related to one another,
like billing or activity feed. The main purpose of a list is to help the user
find an object that leads to its full representation.

The majority of list implementations can be achieved without needing to
customize rendering. If your items conform to the `ListItemProps` interface, the
component will render them automatically with the default behavior. A prop of
type `ListItemProps` must be used when using default rendering.

#### Basic Flat List

<Canvas>
  <Card>
    <List
      items={[
        {
          id: 1,
          content: "Content",
          icon: "work",
          iconColor: "interactive",
          title: "Title",
          value: "Value",
          onClick: () => alert("First list item clicked"),
        },
        {
          id: 2,
          content: "Content",
          icon: "work",
          iconColor: "interactive",
          title: "Title",
          value: "Value",
          onClick: () => alert("Second list item clicked"),
        },
      ]}
    />
  </Card>
</Canvas>

#### Sectioned List

If a section field is present in any item, the list will group the items by
their section and display them under section headers. If even one section key
exists in any of items then it will be expected that every object within that
collection will have a section defined.

If a section is missing, "Other" will be used by default, and any items with a
section of "Other" will be grouped with that first occurrence that has no
section. To provide your header value for items missing a section, use the
`defaultSectionHeader` prop.

<Canvas>
  <Card>
    <List
      items={[
        {
          id: 1,
          content: "Content",
          icon: "work",
          iconColor: "interactive",
          title: "Title",
          value: "Value",
          section: "Section 1",
          onClick: () => alert("First list item clicked"),
        },
        {
          id: 2,
          content: "Content",
          icon: "work",
          iconColor: "interactive",
          title: "Title",
          value: "Value",
          section: "Section 1",
          onClick: () => alert("Second list item clicked"),
        },
        {
          id: 3,
          content: "Content",
          icon: "work",
          iconColor: "interactive",
          title: "Title",
          value: "Value",
          section: "Section 2",
          onClick: () => alert("Second list item clicked"),
        },
      ]}
    />
  </Card>
</Canvas>

## Web Component Code

```tsx
List  Web React import React from "react";
import classnames from "classnames";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import { Typography } from "@jobber/components/Typography";
import type {
  BaseListItemProps,
  ListItemProps,
} from "@jobber/components/List/ListItem";
import { ListItem } from "@jobber/components/List/ListItem";
import sectionStyles from "./SectionHeader.module.css";
import styles from "./List.module.css";

interface ListProps<T extends BaseListItemProps = ListItemProps> {
  /**
   * Array of the list items.
   */
  readonly items: T[];

  /**
   * A function that will be called for each item instead of the default
   * rendering
   * @argument item - The item to render
   */
  readonly customRenderItem?: (item: T) => React.ReactNode;

  /**
   * Set to true for more control over the item styles. Only modifies styles
   * when used with customRenderItem.
   */
  readonly customItemStyles?: boolean;

  /**
   * A function that will be called for each section heading instead of the default
   * rendering
   * @argument sectionName - The name of the section to render
   */
  readonly customRenderSection?: (sectionName: string) => React.ReactNode;

  /**
   * Set to true for more control over the section heading styles. Only modifies styles
   * when used with customRenderItem.
   */
  readonly customSectionStyles?: boolean;

  /**
   * An ID of an element that provides the labelling for this list.
   */
  readonly labelledBy?: string;

  /**
   * A default section header value for items that do not have a section.
   * @default "Other"
   */
  readonly defaultSectionHeader?: string;
}

export function List<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
  customItemStyles,
  customRenderSection,
  customSectionStyles,
  defaultSectionHeader = "Other",
  labelledBy,
}: ListProps<T>) {
  const isSectioned = items.some(item => "section" in item && item.section);

  if (isSectioned) {
    return (
      <SectionedList
        items={items}
        customRenderItem={customRenderItem}
        customItemStyles={customItemStyles}
        customRenderSection={customRenderSection}
        customSectionStyles={customSectionStyles}
        defaultSectionHeader={defaultSectionHeader}
        labelledBy={labelledBy}
      />
    );
  } else {
    return (
      <DisplayList
        items={items}
        customRenderItem={customRenderItem}
        customItemStyles={customItemStyles}
        labelledBy={labelledBy}
      />
    );
  }
}

function DisplayList<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
  customItemStyles,
  labelledBy,
}: ListProps<T>) {
  const omitDefaultStyles = customRenderItem && customItemStyles;
  const itemClassNames = classnames(!omitDefaultStyles && styles.item);

  return (
    <ul className={styles.list} aria-labelledby={labelledBy}>
      {items.map(item => (
        <li key={item.id} className={itemClassNames}>
          <ListItem
            {...item}
            customRenderItem={customRenderItem}
            customItemStyles={customItemStyles}
          />
        </li>
      ))}
    </ul>
  );
}

function SectionedList<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
  customItemStyles,
  customRenderSection,
  customSectionStyles,
  defaultSectionHeader,
  labelledBy,
}: ListProps<T>) {
  const sectionedItems = groupBy(items, item =>
    get(item, "section", defaultSectionHeader),
  );

  const omitDefaultStyles = customRenderItem && customItemStyles;
  const omitDefaultSectionStyles = customRenderSection && customSectionStyles;
  const itemClassNames = classnames(!omitDefaultStyles && styles.item);
  const sectionHeaderClassNames = classnames(
    !omitDefaultSectionStyles && sectionStyles.sectionHeader,
  );

  return (
    <ul className={styles.list} aria-labelledby={labelledBy}>
      {Object.keys(sectionedItems).map(sectionName => {
        return (
          <li
            key={sectionName}
            className={classnames(!omitDefaultSectionStyles && styles.section)}
          >
            {getSectionHeader(
              sectionName,
              sectionHeaderClassNames,
              customRenderSection,
            )}
            <ul className={styles.list}>
              {sectionedItems[sectionName].map(item => (
                <li key={item.id} className={itemClassNames}>
                  <ListItem
                    {...item}
                    customRenderItem={customRenderItem}
                    customItemStyles={customItemStyles}
                  />
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

function getSectionHeader(
  sectionName: string,
  sectionHeaderClassNames: string,
  customRenderSection?: (sectionName: string) => React.ReactNode,
) {
  const sectionHeader = customRenderSection ? (
    customRenderSection(sectionName)
  ) : (
    <Typography element="h4" fontWeight="bold" size="large">
      {sectionName}
    </Typography>
  );

  return <div className={sectionHeaderClassNames}>{sectionHeader}</div>;
}
import React from "react";
import classnames from "classnames";
import type { IconColorNames, IconNames } from "@jobber/design";
import styles from "./ListItem.module.css";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Heading } from "../Heading";
import { Typography } from "../Typography";
import { Markdown } from "../Markdown";
import { Emphasis } from "../Emphasis";

export interface BaseListItemProps {
  /**
   * The ID of the list item. This is important for React to handle efficient
   * re-rendering of list items.
   */
  readonly id: number | string;
}

export interface ListItemProps extends BaseListItemProps {
  /**
   * Subdued text under the `content` prop.
   */
  readonly caption?: string;

  /**
   * List item content. This accepts a string for a simple content and an array
   * for a multi line content.
   * This supports basic markdown node types such as `_italic_` and `**bold**`.
   */
  readonly content?: string | string[];

  /**
   * Shows an icon on the left side of the contents.
   */
  readonly icon?: IconNames;

  /**
   * Changes the color of the icons.
   */
  readonly iconColor?: IconColorNames;

  /**
   * Highlights the list item with the lightest green icon. This communicates
   * that the line item needs attention.
   */
  readonly isActive?: boolean;

  /**
   * This determines how and when to group the list items
   */
  readonly section?: string;

  /**
   * Adds a heading.
   */
  readonly title?: string;

  /**
   * This turns the list item into a clickable link.
   */
  readonly url?: string;

  /**
   * A numeric value of a row. This always shows up in the right side of the row
   * with a text aligned to the right.
   */
  readonly value?: string;

  /**
   * Callback when a list item gets clicked.
   */
  onClick?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
}

export function ListItem<T extends BaseListItemProps = ListItemProps>(
  props: T &
    ListItemProps & {
      readonly customRenderItem?: (item: T) => React.ReactNode;
      readonly customItemStyles?: boolean;
    },
) {
  const actionClasses = classnames(
    styles.action,
    props.isActive && styles.isActive,
    (props.onClick || props.url) && styles.hoverable,
    props.customRenderItem && !props.customItemStyles && styles.customItem,
  );
  const Wrapper = props.url ? "a" : "button";

  const buttonProps = {
    ...(Wrapper === "button" && { role: "button", type: "button" as const }),
  };

  return (
    <Wrapper
      id={props.id.toString()}
      className={actionClasses}
      href={props.url}
      onClick={props.onClick}
      {...buttonProps}
    >
      {props.customRenderItem ? (
        props.customRenderItem(props)
      ) : (
        <DefaultRenderItem {...props} />
      )}
    </Wrapper>
  );
}

function DefaultRenderItem(props: ListItemProps) {
  return (
    <div className={styles.defaultContent}>
      {props.icon && (
        <div className={styles.icon}>
          <Icon name={props.icon} color={props.iconColor} />
        </div>
      )}

      <div className={styles.info}>
        {props.title && <Heading level={5}>{props.title}</Heading>}
        {props.content && <Description content={props.content} />}

        {props.caption && (
          <Text variation="subdued">
            <Typography element="span" size="small" emphasisType="italic">
              {props.caption}
            </Typography>
          </Text>
        )}
      </div>

      {props.value && (
        <div className={styles.amount}>
          <Text>
            <Emphasis variation="bold">{props.value}</Emphasis>
          </Text>
        </div>
      )}
    </div>
  );
}

function Description({ content }: Pick<Required<ListItemProps>, "content">) {
  if (content instanceof Array) {
    return (
      <>
        {content.map((item, i) => (
          <Text key={i}>
            <span className={styles.truncate}>
              <Markdown content={item} basicUsage={true} />
            </span>
          </Text>
        ))}
      </>
    );
  } else {
    return (
      <Text>
        <span className={styles.truncate}>
          <Markdown content={content} basicUsage={true} />
        </span>
      </Text>
    );
  }
}

```

## Props

### Web Props

| Prop               | Type                           | Required | Default  | Description                                                         |
| ------------------ | ------------------------------ | -------- | -------- | ------------------------------------------------------------------- |
| `items`            | `T[]`                          | ✅       | `_none_` | Array of the list items.                                            |
| `customRenderItem` | `(item: T) => React.ReactNode` | ❌       | `_none_` | A function that will be called for each item instead of the default |

rendering @argument item - The item to render | | `customItemStyles` | `boolean`
| ❌ | `_none_` | Set to true for more control over the item styles. Only
modifies styles when used with customRenderItem. | | `customRenderSection` |
`(sectionName: string) => React.ReactNode` | ❌ | `_none_` | A function that
will be called for each section heading instead of the default rendering
@argument sectionName - The name of the section to render | |
`customSectionStyles` | `boolean` | ❌ | `_none_` | Set to true for more control
over the section heading styles. Only modifies styles when used with
customRenderItem. | | `labelledBy` | `string` | ❌ | `_none_` | An ID of an
element that provides the labelling for this list. | | `defaultSectionHeader` |
`string` | ❌ | `Other` | A default section header value for items that do not
have a section. |

## Categories

- Lists & Tables

## Web Test Code

```typescript
List  Web React Test Testing Jest import React from "react";
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

```

## Component Path

`/components/List`

---

_Generated on 2025-08-21T17:35:16.369Z_
