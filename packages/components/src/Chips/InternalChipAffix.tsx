import React, { ReactElement } from "react";
import { useAssert } from "@jobber/hooks/useAssert";
import { ChipButtonProps, InternalChipButton } from "./InternalChipButton";
import styles from "./InternalChip.css";
import { InternalChipProps } from "./ChipTypes";
import { Avatar, AvatarProps } from "../Avatar";
import { Icon, IconProps } from "../Icon";
import { isComponentType } from "../utils/isComponentType";

interface InternalChipAffixProps
  extends Pick<InternalChipProps, "active" | "invalid" | "disabled"> {
  readonly affix?: ReactElement<AvatarProps | IconProps | ChipButtonProps>;
}

// eslint-disable-next-line max-statements
export function InternalChipAffix({
  affix,
  active,
  invalid,
  disabled,
}: InternalChipAffixProps) {
  const isAvatar = isComponentType(affix, Avatar);
  const isIcon = isComponentType(affix, Icon);
  const isChipButton = isComponentType(affix, InternalChipButton);

  useAssert(
    !!affix && !(isAvatar || isIcon || isChipButton),
    `Prefix prop only accepts "<Avatar />" or "<Icon />" component. You have "${affix?.type}".`,
  );

  if (isAvatar) {
    return <Avatar {...(affix.props as AvatarProps)} size="small" />;
  }

  if (isIcon) {
    return renderChipIcon(affix as ReactElement<IconProps>);
  }

  if (isChipButton) {
    return <InternalChipButton {...(affix.props as ChipButtonProps)} />;
  }

  return <></>;

  function renderChipIcon(icon: ReactElement<IconProps>) {
    const color = getIconColor();

    return (
      <div className={styles.icon}>
        {React.cloneElement(icon, {
          size: "base",
          ...(color && { color: color }),
        })}
      </div>
    );
  }

  function getIconColor() {
    if (disabled && !active) return "disabled";
    if (invalid && !disabled) return "critical";
    if (active) return "white";

    return;
  }
}
