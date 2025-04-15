import React, { CSSProperties } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Avatar.module.css";
import { isDark } from "./utilities";
import { Icon, IconProps } from "../Icon";

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
