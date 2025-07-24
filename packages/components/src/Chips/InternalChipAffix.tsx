import React, { ReactElement } from "react";
import { ChipButtonProps, InternalChipButton } from "./InternalChipButton";
import styles from "./InternalChip.module.css";
import { InternalChipProps } from "./ChipTypes";
import { Avatar, AvatarProps } from "../Avatar";
import { Icon, IconProps } from "../Icon";

interface InternalChipAffixProps
  extends Pick<InternalChipProps, "active" | "invalid" | "disabled"> {
  readonly affix?: ReactElement<AvatarProps | IconProps | ChipButtonProps>;
}

export function InternalChipAffix({
  affix,
  active,
  invalid,
  disabled,
}: InternalChipAffixProps) {
  if (affix?.type === Avatar) {
    return <Avatar {...(affix.props as AvatarProps)} size="small" />;
  }

  if (affix?.type === Icon) {
    return renderChipIcon(affix as ReactElement<IconProps>);
  }

  if (affix?.type === InternalChipButton) {
    return <InternalChipButton {...(affix.props as ChipButtonProps)} />;
  }

  //eslint-disable-next-line react/jsx-no-useless-fragment
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
