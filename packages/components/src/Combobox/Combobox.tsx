import React from "react";
import { Content } from "./components/Content";
import { Action } from "./components/Action";
import { TriggerButton, TriggerChip } from "./components/Trigger";

interface ComboboxProps {
  readonly children: React.ReactNode;
}

export const Combobox = (props: ComboboxProps) => {
  return (
    <>
      <Content options={[]} onSelection={() => console.log("hi")}>
        <></>
      </Content>
      <Action label="Add teammate" onClick={() => console.log("hi")} />
      {props.children}
    </>
  );
};

Combobox.TriggerButton = TriggerButton;
Combobox.TriggerChip = TriggerChip;
Combobox.Content = Content;
Combobox.Action = Action;
