# Card

# Card

A card is used to group related information and tasks so our users can scan and
prioritize information more easily.

## Design & usage guidelines

A card is useful for grouping content because of its distinct visual boundaries.
However, similar to the idea that "making everything stand out means that
nothing stands out", you should be mindful in your application of cards.

A card should be the smallest-possible self-contained section of content. If you
find yourself putting a card inside of another card, the outer card should be
removed, and it may be worth re-assessing the hierarchy of your interface.

### Clickable

If clicking on the entire Card will navigate the user to a new view or perform
an action, the Card will have interactive hover and focus states.

It is important to signify to the user that the Card is clickable. This can be
done by using elevation or by using the `arrowRight` chevron icon in the Card.
Common examples of this pattern can be found in the
[Card Figma.](https://www.figma.com/design/rIIhulZvcp9M82lNOCGv16/Product%2FOnline?m=auto&node-id=22677-10476&t=YbmsOsxL9J6ggqVA-1)

### Elevation

By default, it should be assumed that a Card is on the same "plane" as the
surface it sits on and has no elevation.

If the Card benefits from having elevation indicated, such as when it sits
overtop another Card or is used in a Carousel fashion, the appropriate elevation
level can be set. See
[Mobile/Elevation](../?path=/story/components-layouts-and-structure-card-mobile--elevation)
for an example.

## Related components

[Content](/components/Content) and [Flex](/components/Flex) are the most common
layout tools for managing the Card's children. Generally, Card is un-opinionated
about what goes inside of it.

If you require more customization over the appearance of your container,
[Box](/components/Box) is the preferred way to achieve this without writing CSS.

## Content guidelines

Card headers should be sentence-cased.

| ✅ Do                   | ❌ Don't                |
| ----------------------- | ----------------------- |
| Client property details | Client Property Details |
| Assigned team           | ASSIGNED TEAM           |
| Required deposit        | Required Deposit        |

As previously mentioned, a Card should be "self-contained" and nesting Cards
inside of other Cards should be avoided.

## Accessibility

The Card itself is already accessible and does not require any additional setup.

With that said, it should not be wrapped in an element with an `aria-label` or
`accessibilityLabel` describing it as a card. This is redundant and will cause
unexpected behaviour for screen readers. For example, wrapping a Card with an
`accessibilityLabel` on mobile hides the entire Card from screen readers.

## Web Component Code

````tsx
Card Tile Web React import type { ReactElement } from "react";
import React from "react";
import classnames from "classnames";
import styles from "./Card.module.css";
import colors from "./cardcolors.module.css";
import elevations from "./CardElevations.module.css";
import { CardClickable } from "./CardClickable";
import { CardHeader } from "./CardHeader";
import type {
  CardBodyProps,
  CardHeaderProps,
  CardProps,
  HeaderActionProps,
} from "./types";

/**
 * Props for a card that acts as a link.
 * When url is provided, the card becomes clickable and navigates to the specified URL.
 */
type LinkCardProps = CardProps & {
  /**
   * URL that the card would navigate to once clicked.
   */
  url: string;

  /**
   * Makes the URL open in new tab on click.
   */
  external?: boolean;
  onClick?: never;
};

/**
 * Props for a card that has a click handler.
 * When onClick is provided, the card becomes clickable and triggers the handler on click.
 */
type ClickableCardProps = CardProps & {
  /**
   * Event handler that gets called when the card is clicked.
   */
  onClick(event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>): void;
  url?: never;
  readonly external?: never;
};

/**
 * Props for a regular card without any click behavior.
 */
type RegularCardProps = CardProps & {
  url?: never;
  onClick?: never;
  readonly external?: never;
};

type CardPropOptions = LinkCardProps | ClickableCardProps | RegularCardProps;

/**
 * Header component for the Card.
 * Used in the compound component pattern to provide a consistent header layout.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Text>Header Content</Text>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Card content</p>
 *   </Card.Body>
 * </Card>
 * ```
 */
function CardHeaderCompoundComponent({ children }: CardHeaderProps) {
  return <>{children}</>;
}

/**
 * Body component for the Card.
 * Used in the compound component pattern to provide a consistent content layout.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Text>Header Content</Text>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Card content</p>
 *   </Card.Body>
 * </Card>
 * ```
 */
function CardBodyCompoundComponent({ children }: CardBodyProps) {
  return <>{children}</>;
}

function renderCardContent(
  children: React.ReactNode,
  title?: string,
  header?: string | HeaderActionProps | ReactElement,
) {
  return (
    <>
      <CardHeader title={title} header={header} />
      {children}
    </>
  );
}

function renderCardWrapper(
  className: string,
  content: React.ReactNode,
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
  ) => void,
  url?: string,
  external?: boolean,
) {
  if (onClick) {
    return (
      <CardClickable className={className} onClick={onClick}>
        {content}
      </CardClickable>
    );
  }

  if (url) {
    return (
      <a
        className={className}
        href={url}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export function Card(props: CardPropOptions) {
  const {
    accent,
    header,
    children,
    title,
    elevation = "none",
    onClick,
    url,
    external,
  } = props;

  const className = classnames(
    styles.card,
    accent && styles.accent,
    (url || onClick) && styles.clickable,
    accent && colors[accent],
    elevation !== "none" && elevations[`${elevation}Elevation`],
  );

  const isUsingCompoundPattern = React.Children.toArray(children).some(
    child =>
      React.isValidElement(child) &&
      (child.type === CardHeaderCompoundComponent ||
        child.type === CardBodyCompoundComponent),
  );

  const content = isUsingCompoundPattern
    ? children
    : renderCardContent(children, title, header);

  return renderCardWrapper(className, content, onClick, url, external);
}

Card.Header = CardHeaderCompoundComponent;
Card.Body = CardBodyCompoundComponent;
import type { ReactNode } from "react";
import React, { useRef } from "react";

interface ClickableCardProps {
  onClick(event: React.MouseEvent<HTMLElement>): void;
  readonly className: string;
  readonly children: ReactNode | ReactNode[];
}

const ENTER_KEY = "Enter";
const SPACEBAR_KEY = " ";

/**
 * This is only intended to be used in the Card component.
 * Please use `<Card onClick={onClick} />` component instead.
 */
export function CardClickable({
  className,
  onClick,
  children,
}: ClickableCardProps) {
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  return (
    <div
      ref={cardRef}
      data-testid="clickable-card"
      className={className}
      onClick={onClick}
      onKeyUp={handleKeyup}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );

  function isCardFocused() {
    return document.activeElement === cardRef.current;
  }

  function handleKeyup(event: React.KeyboardEvent<HTMLDivElement>) {
    const shouldClick = event.key === ENTER_KEY || event.key === SPACEBAR_KEY;

    if (shouldClick && isCardFocused()) {
      cardRef.current?.click();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    // Prevent page scroll when hitting spacebar while focused on a card
    if (event.key === SPACEBAR_KEY && isCardFocused()) {
      event.preventDefault();
    }
  }
}
import React from "react";
import type { ActionProps, CardProps, HeaderActionProps } from "./types";
import styles from "./Card.module.css";
import { Heading } from "../Heading";
import { Button, type ButtonProps } from "../Button";
import { Menu, type MenuProps } from "../Menu";

/**
 * Intended to be used in the Card component.
 * Use `<Card header={header} />` component instead.
 */
export function CardHeader({
  title,
  header,
}: Pick<CardProps, "title" | "header">) {
  const heading = title || header;

  if (React.isValidElement(heading)) return <>{heading}</>;

  if (heading) {
    const titleString =
      typeof heading === "string"
        ? heading
        : (heading as HeaderActionProps).title;

    return (
      <div className={styles.header}>
        {titleString && <Heading level={2}>{titleString}</Heading>}
        {typeof heading === "object" &&
          renderHeaderAction((heading as HeaderActionProps)?.action)}
      </div>
    );
  }

  return <></>;
}

function renderHeaderAction(action?: ActionProps) {
  if (action?.type === Button) {
    const props: ButtonProps = {
      type: "tertiary",
      ...action.props,
      size: "small",
    } as ButtonProps;

    return action && <Button {...props} />;
  }

  if (action?.type === Menu) {
    return action && <Menu {...(action.props as MenuProps)} />;
  }

  return <></>;
}

````

## Props

### Web Props

| Prop        | Type                                        | Required                  | Default                  | Description                                       |
| ----------- | ------------------------------------------- | ------------------------- | ------------------------ | ------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------- |
| `accent`    | `string                                     | number                    | symbol`                  | ❌                                                | `_none_`                                                 | The `accent`, if provided, will effect the color accent at the top of |
| the card.   |
| `title`     | `string`                                    | ❌                        | `_none_`                 | @deprecated Use header instead.                   |
| `header`    | `string                                     | HeaderActionProps         | ReactElement<any, string | JSXElementConstructor<any>>`                      | ❌                                                       | `_none_`                                                              | The header props of the card. |
| `elevation` | `elevationProp`                             | ❌                        | `_none_`                 | _No description_                                  |
| `url`       | `string`                                    | ❌                        | `_none_`                 | URL that the card would navigate to once clicked. |
| `external`  | `boolean`                                   | ❌                        | `_none_`                 | Makes the URL open in new tab on click.           |
| `onClick`   | `(event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void` | ❌                       | `_none_`                                          | Event handler that gets called when the card is clicked. |

### Mobile Props

| Prop               | Type                       | Required | Default  | Description                                                                  |
| ------------------ | -------------------------- | -------- | -------- | ---------------------------------------------------------------------------- |
| `header`           | `HeaderProps`              | ❌       | `_none_` | @deprecated Use <ActionItem /> with the title and onPress properties instead |
| `footer`           | `FooterProps`              | ❌       | `_none_` | _No description_                                                             |
| `reportCardHeight` | `(height: number) => void` | ❌       | `_none_` | _No description_                                                             |
| `testID`           | `string`                   | ❌       | `card`   | _No description_                                                             |
| `error`            | `string`                   | ❌       | `_none_` | _No description_                                                             |
| `elevation`        | `elevationProp`            | ❌       | `none`   | _No description_                                                             |

## Categories

- Layouts & Structure

## Component Path

`/components/Card`

---

_Generated on 2025-08-21T17:35:16.355Z_
