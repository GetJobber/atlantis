import React, { ReactElement } from "react";
import { ChipButtonProps, InternalChipButton } from "./InternalChipButton";
import styles from "./InternalChip.css";
import { InternalChipProps } from "./ChipTypes";
import { useAssert } from "./useAssert";
import { Avatar, AvatarProps } from "../Avatar";
import { Icon, IconColorNames, IconProps } from "../Icon";

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
  const component = computed();
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
    let color: IconColorNames | undefined;
    active && (color = "white");
    invalid && !disabled && (color = "criticalOnSurface");
    disabled && !active && (color = "disabled");

    return (
      <div className={styles.icon}>
        {React.cloneElement(icon, {
          size: "base",
          ...(color && { color: color }),
        })}
      </div>
    );
  }

  function computed() {
    return {
      isAvatar: affix?.type === Avatar || false,
      isIcon: affix?.type === Icon || false,
      isChipButton: affix?.type === InternalChipButton || false,
    };
  }

  function assertProps() {
    useAssert(
      !!affix &&
        !(component.isAvatar || component.isIcon || component.isChipButton),
      `Prefix prop only accepts "<Avatar />" or "<Icon />" component. You have "${affix?.type}".`,
    );
  }
}
