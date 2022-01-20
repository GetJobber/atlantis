// DELETE ME: For testing purposes, delete before putting up for review
// TODO: Move to MDX playground as an example

import React, { useState } from "react";
import { Chip, Chips } from ".";
import { Avatar } from "../Avatar";

export function TestChip() {
  const [options, setOptions] = useState([
    "Darryl Tec",
    "Chris Murray",
    "Rebecca Li",
    "Katie-Lynn Kimble",
    "Adam Bobadam",
    "Deep Vishwas",
    "Eddy Sims",
    "Selina Wang",
    "Wang Yi",
    "Queena Zhang",
    "Chen Chen",
    "Juan Pablo",
    "Robby Tiu",
    "Michael Paradis",
    "Konstantin Rakitine",
    "Hoss Talebi",
    "Lori-Anne Morgan",
  ]);
  const [selected, setSelected] = useState([options[0]]);

  return (
    <Chips
      type="dismissible"
      selected={selected}
      onChange={setSelected}
      onCustomAdd={handleCustomAdd}
      onClick={(_, v) => alert(v)}
      onSearch={v => console.log(v)}
      onLoadMore={v => console.log(v)}
    >
      {options.map(name => (
        <Chip
          key={name}
          prefix={<Avatar initials={getInitials(name)} />}
          label={name}
          value={name}
        />
      ))}
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
    setSelected([...selected, value]);
  }
}
