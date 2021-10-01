// DELETE ME: For testing purposes, delete before putting up for review

import React, { useState } from "react";
import { Chip, Chips } from ".";
import { Avatar } from "../Avatar";

export function TestChip() {
  const [selected, setSelected] = useState(["1"]);
  const [options, setOptions] = useState([
    "Darryl Tec",
    "Chris Murray",
    "Rebecca Li",
    "Katie-Lynn Kimble",
  ]);

  return (
    <Chips
      type="dismissible"
      selected={selected}
      onChange={setSelected}
      onClick={(_, v) => {
        alert(v);
      }}
      onCustomAdd={handleCustomAdd}
    >
      {options.map((name, i) => {
        return (
          <Chip
            key={name}
            prefix={<Avatar initials={getInitials(name)} />}
            label={name}
            value={(i + 1).toString()}
          />
        );
      })}
    </Chips>
  );

  function getInitials(name: string) {
    return name
      .split(" ")
      .map(initial => initial[0])
      .join("");
  }

  function handleCustomAdd(value: string) {
    setOptions([...options, value]);
    setSelected([...selected, (options.length + 1).toString()]);
  }
}
