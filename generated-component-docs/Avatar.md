# Avatar

# Avatar

An Avatar is used to display a visual identifier for an individual user.

## Design & usage guidelines

Avatars are available in 3 sizes:

- `base`: Used by default
- `large`: Use when the Avatar is the focal point
- `small`: Use on higher-density/compact pages or components

### Color

Use `color` to indicate the background and the border color of an Avatar
component.

When using `color`, make sure that the color is consistent for a user throughout
the application. The color that is represented for an Avatar should be the same
color that represents a user in other parts of the application, such as the
calendar.

### With Tooltip

If an Avatar is displayed without a full name label, display a tooltip.

## Accessibility

Initials and background color should have sufficient color contrast to meet AA
conformance.

## Web Component Code

```tsx
Avatar User Facepile Profile Web React import type { CSSProperties } from "react";
import React from "react";
import classnames from "classnames";
import type { XOR } from "ts-xor";
import styles from "./Avatar.module.css";
import { isDark } from "./utilities";
import type { IconProps } from "../Icon";
import { Icon } from "../Icon";

type AvatarSize = "base" | "large" | "small";
interface AvatarFoundationProps {
  /**
   * A url for the image that will be displayed
   */
  readonly imageUrl?: string;
  /**
   * A users name to be used for assistive technology
   */
  readonly name?: string;
  /**
   * The initials that will be displayed if no image is set.\
   */
  readonly initials?: string;
  /**
   * The background and border color that represents the user. This should be
   * represented as a value that can be read by CSS
   */
  readonly color?: string;
  /**
   * Change the size of the avatar
   * @property "large" - Make avatar to be the focal point
   * @property "small" - For higher-density/compact places or components
   * @default "base"
   */
  readonly size?: AvatarSize;

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
  } & InitialsUnsafeClassNameProps;

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: CSSProperties;
  } & InitialsUnsafeStyleProps;
}

interface AvatarWithImageProps extends AvatarFoundationProps {
  readonly imageUrl: string;
}

interface AvatarWithInitialsProps extends AvatarFoundationProps {
  readonly initials: string;
}

export type AvatarProps = XOR<AvatarWithImageProps, AvatarWithInitialsProps>;

export function Avatar({
  imageUrl,
  name,
  initials,
  size = "base",
  color,
  UNSAFE_className = {},
  UNSAFE_style = {},
}: AvatarProps) {
  const style: CSSProperties = {
    backgroundColor: color,
    borderColor: color,
    ...UNSAFE_style.container,
  };

  if (imageUrl) {
    style.backgroundImage = `url(${imageUrl})`;
  }

  const shouldBeDark = color == undefined || isDark(color);
  const className = classnames(styles.avatar, size !== "base" && styles[size], {
    [styles.hasBorder]: imageUrl && color,
    [styles.isDark]: shouldBeDark,
  });

  const containerClassNames = classnames(
    className,
    UNSAFE_className?.container,
  );

  return (
    <div
      className={containerClassNames}
      style={style}
      role={imageUrl && "img"}
      aria-label={name}
    >
      {!imageUrl && (
        <Initials
          initials={initials}
          dark={shouldBeDark}
          iconSize={size}
          UNSAFE_className={{
            initials: UNSAFE_className.initials,
            fallbackIcon: UNSAFE_className.fallbackIcon,
          }}
          UNSAFE_style={{
            initials: UNSAFE_style.initials,
            fallbackIcon: UNSAFE_style.fallbackIcon,
          }}
        />
      )}
    </div>
  );
}

interface InitialsUnsafeClassNameProps {
  initials?: string;
  fallbackIcon?: IconProps["UNSAFE_className"];
}

interface InitialsUnsafeStyleProps {
  initials?: CSSProperties;
  fallbackIcon?: IconProps["UNSAFE_style"];
}

interface InitialsProps {
  readonly dark?: boolean;
  readonly iconSize?: AvatarSize;
  readonly initials?: string;

  readonly UNSAFE_className?: InitialsUnsafeClassNameProps;

  readonly UNSAFE_style?: InitialsUnsafeStyleProps;
}

function Initials({
  initials,
  dark = false,
  iconSize = "base",
  UNSAFE_className,
  UNSAFE_style,
}: InitialsProps) {
  if (!initials) {
    return (
      <Icon
        name="person"
        color={dark ? "white" : "blue"}
        size={iconSize}
        UNSAFE_className={UNSAFE_className?.fallbackIcon}
        UNSAFE_style={UNSAFE_style?.fallbackIcon}
      />
    );
  }

  const className = classnames(styles.initials, UNSAFE_className?.initials, {
    [styles.smallInitials]: initials.length > 2,
  });

  return (
    <span className={className} style={UNSAFE_style?.initials}>
      {initials.substr(0, 3)}
    </span>
  );
}

```

## Props

### Web Props

| Prop                                           | Type         | Required | Default  | Description                                                              |
| ---------------------------------------------- | ------------ | -------- | -------- | ------------------------------------------------------------------------ |
| `initials`                                     | `string`     | ❌       | `_none_` | The initials that will be displayed if no image is set.\                 |
| `imageUrl`                                     | `string`     | ❌       | `_none_` | A url for the image that will be displayed                               |
| `name`                                         | `string`     | ❌       | `_none_` | A users name to be used for assistive technology                         |
| `color`                                        | `string`     | ❌       | `_none_` | The background and border color that represents the user. This should be |
| represented as a value that can be read by CSS |
| `size`                                         | `AvatarSize` | ❌       | `base`   | Change the size of the avatar                                            |

@property "large" - Make avatar to be the focal point @property "small" - For
higher-density/compact places or components | | `UNSAFE_className` |
`{ container?: string; } & InitialsUnsafeClassNameProps` | ❌ | `{}` | **Use at
your own risk:** Custom class names for specific elements. This should only be
used as a **last resort**. Using this may result in unexpected side effects.
More information in the
[Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
| | `UNSAFE_style` | `{ container?: CSSProperties; } & InitialsUnsafeStyleProps`
| ❌ | `{}` | **Use at your own risk:** Custom style for specific elements. This
should only be used as a **last resort**. Using this may result in unexpected
side effects. More information in the
[Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
|

## Categories

- Images & Icons

## Web Test Code

```typescript
Avatar User Facepile Profile Web React Test Testing Jest import React from "react";
import { render, screen } from "@testing-library/react";
import { Avatar } from ".";

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

it("displays an icon if no image and no initials are set", () => {
  // Disabling typecheck here to test a fallback. This version of avatar
  // should never be used, but is created as an extra safety.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { container } = render(<Avatar />);
  expect(container).toMatchSnapshot();
});

it("Renders light text color if `color` is dark", () => {
  const { container } = render(<Avatar initials="JB" color="black" />);
  expect(container.firstChild).toHaveClass("isDark");
});

describe("UNSAFE props", () => {
  describe("UNSAFE_className", () => {
    it("applies to Avatar container", () => {
      render(
        <Avatar
          name="Custom Container Class Name"
          imageUrl="https://api.adorable.io/avatars/150/jobbler"
          UNSAFE_className={{ container: "customContainerClassName" }}
        />,
      );
      expect(screen.getByLabelText("Custom Container Class Name")).toHaveClass(
        "customContainerClassName",
      );
    });

    it("applies to Avatar initials", () => {
      render(
        <Avatar
          initials="JB"
          UNSAFE_className={{ initials: "customInitialsClassName" }}
        />,
      );
      expect(screen.getByText("JB")).toHaveClass("customInitialsClassName");
    });

    it("applies to Avatar fallback icon", () => {
      render(
        <Avatar
          initials=""
          UNSAFE_className={{
            fallbackIcon: {
              svg: "customFallbackIconSvgClassName",
              path: "customFallbackIconPathClassName",
            },
          }}
        />,
      );
      expect(screen.getByTestId("person")).toHaveClass(
        "customFallbackIconSvgClassName",
      );
      expect(screen.getByTestId("person").querySelector("path")).toHaveClass(
        "customFallbackIconPathClassName",
      );
    });
  });

  describe("UNSAFE_style", () => {
    it("applies to Avatar container", () => {
      render(
        <Avatar
          name="Custom Container Style"
          imageUrl="https://api.adorable.io/avatars/150/jobbler"
          UNSAFE_style={{
            container: {
              borderColor: "var(--color-green)",
            },
          }}
        />,
      );

      expect(screen.getByLabelText("Custom Container Style")).toHaveStyle({
        borderColor: "var(--color-green)",
      });
    });

    it("applies to Avatar initials", () => {
      render(
        <Avatar
          initials="JB"
          UNSAFE_style={{
            initials: {
              color: "var(--color-blue)",
            },
          }}
        />,
      );

      expect(screen.getByText("JB")).toHaveStyle({
        color: "var(--color-blue)",
      });
    });

    it("applies to Avatar fallback icon", () => {
      render(
        <Avatar
          initials=""
          UNSAFE_style={{
            fallbackIcon: {
              svg: {
                width: "59px",
                height: "59px",
              },
              path: {
                fill: "var(--color-blue)",
              },
            },
          }}
        />,
      );

      expect(screen.getByTestId("person")).toHaveStyle({
        width: "59px",
        height: "59px",
      });
      expect(screen.getByTestId("person").querySelector("path")).toHaveStyle({
        fill: "var(--color-blue)",
      });
    });
  });
});

```

## Component Path

`/components/Avatar`

---

_Generated on 2025-08-21T17:35:16.353Z_
