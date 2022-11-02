import React, { ReactElement } from "react";
import { useAssert } from "@jobber/hooks";
import { ChipButtonProps, InternalChipButton } from "./InternalChipButton";
import styles from "./InternalChip.css";
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
  assertProps();
  if (affix?.type === Avatar) {
    return <Avatar {...(affix.props as AvatarProps)} size="small" />;
  }

  if (affix?.type === Icon) {
    return renderChipIcon(affix as ReactElement<IconProps>);
  }

  if (affix?.type === InternalChipButton) {
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
    if (active) return "textReverse";
    return;
  }

  function assertProps() {
    const isAvatar = affix?.type === Avatar || false;
    const isIcon = affix?.type === Icon || false;
    const isChipButton = affix?.type === InternalChipButton || false;

    useAssert(
      !!affix && !(isAvatar || isIcon || isChipButton),
      `Prefix prop only accepts "<Avatar />" or "<Icon />" component. You have "${affix?.type}".`,
    );
  }
}
