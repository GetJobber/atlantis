import React, { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./InternalChipDismissible.css";
import { ChipDismissible } from "..";
import { ChipDismissibleProps } from "../ChipsTypes";
import { Menu } from "../../Menu";

export function InternalChipDismissible({
  children,
  selected,
  onChange,
  onClick,
  onCustomAdd,
}: ChipDismissibleProps) {
  const [searchValue, setSearchValue] = useState("");
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
        activator={
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        }
        items={availableOptions()}
      />
    </div>
  );

  function availableOptions() {
    const selectableOptions = children
      .map(chip => chip.props)
      .filter(chip => {
        return (
          !selected.includes(chip.value) &&
          chip.label.toLowerCase().match(searchValue.toLowerCase())
        );
      });
    const options = selectableOptions.map(chip => ({
      label: chip.label,
      onClick: () => handleChipAdd(chip.value),
    }));

    searchValue &&
      options.push({
        label: searchValue,
        onClick: () => handleCustomAdd(searchValue),
      });
    return [{ actions: options }];
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab" || event.key === "Enter") {
      event.preventDefault();
      handleCustomAdd(searchValue);
    }
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.currentTarget.value);
  }

  function handleChipRemove(value: string) {
    return () => onChange(selected.filter(val => val !== value));
  }

  function handleChipAdd(value: string) {
    setSearchValue("");
    onChange([...selected, value]);
  }

  function handleCustomAdd(value: string) {
    setSearchValue("");
    onCustomAdd(value);
  }

  function handleChipClick(value: string) {
    if (onClick === undefined) return;
    return (event: MouseEvent<HTMLButtonElement>) => onClick(event, value);
  }
}
