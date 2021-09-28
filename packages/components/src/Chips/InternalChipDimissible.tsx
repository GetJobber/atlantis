import React from "react";
import { ChipDismissible } from ".";
import styles from "./InternalChip.css";
import { ChipMultiSelectProps } from "./ChipsTypes";
import { Menu } from "../Menu";
import { Button } from "../Button";

type InternalChipDimissibleProps = Pick<
  ChipMultiSelectProps,
  "selected" | "onChange" | "children" | "onClickChip"
>;

export function InternalChipDimissible({
  children,
  selected,
  onChange,
  onClickChip,
}: InternalChipDimissibleProps) {
  const visibleChipOptions = children
    .map(chip => chip.props)
    .filter(chip => selected.includes(chip.value));

  return (
    <div className={styles.wrapper} data-testid="multiselect-chips">
      {visibleChipOptions.map(chip => {
        return (
          <ChipDismissible
            key={chip.value}
            {...chip}
            onClick={handleChipClick(chip.value)}
            onRequestRemove={handleChipRemove(chip.value)}
          />
        );
      })}
      <Menu
        activator={<Button icon="add" ariaLabel="Add" />}
        items={getChipOptions()}
      />
    </div>
  );

  function getChipOptions() {
    const availabelChipOptions = children.filter(chip => {
      return !selected.includes(chip.props.value);
    });

    return [
      {
        actions: availabelChipOptions.map(chip => ({
          label: chip.props.label,
          onClick: handleChipAdd(chip.props.value),
        })),
      },
    ];
  }

  function handleChipRemove(value: string | number) {
    return () => onChange(selected.filter(val => val !== value));
  }

  function handleChipAdd(value: string | number) {
    return () => onChange([...selected, value]);
  }

  function handleChipClick(value: string | number) {
    if (onClickChip === undefined) return;
    return (event: React.MouseEvent<HTMLElement>) => onClickChip(event, value);
  }
}
