import React, { CSSProperties } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Avatar.module.css";
import { isDark } from "./utilities";
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
   * **Note:** If you are applying fill override to buttonIcon.path, you will need to add !important due
   * to Button's children element css inheritance.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
    initials?: string;
    fallbackIcon?: {
      svg?: string;
      path?: string;
    };
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: CSSProperties;
    initials?: CSSProperties;
    fallbackIcon?: {
      svg?: CSSProperties;
      path?: CSSProperties;
    };
  };
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
        <Initials initials={initials} dark={shouldBeDark} iconSize={size} />
      )}
    </div>
  );
}

interface InitialsProps {
  readonly dark?: boolean;
  readonly iconSize?: AvatarSize;
  readonly initials?: string;
}

function Initials({
  initials,
  dark = false,
  iconSize = "base",
}: InitialsProps) {
  if (!initials) {
    return (
      <Icon name="person" color={dark ? "white" : "blue"} size={iconSize} />
    );
  }

  const className = classnames(styles.initials, {
    [styles.smallInitials]: initials.length > 2,
  });

  return <span className={className}>{initials.substr(0, 3)}</span>;
}
