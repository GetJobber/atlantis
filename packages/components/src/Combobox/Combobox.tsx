import React, { ReactNode } from "react";
import { Content } from "./components/Content";
import { Action } from "./components/Action";
import { TriggerButton, TriggerChip } from "./components/Trigger";
import { ComboboxContextProvider } from "./ComboboxProvider";

export interface ComboboxProps {
  readonly children: React.ReactNode;
}

export const Combobox = (props: ComboboxProps): JSX.Element => {
  const { renderContent, renderTrigger } = useComboboxValidation(
    props.children,
  );
  return (
    <ComboboxContextProvider>
      {renderTrigger}
      {renderContent}
    </ComboboxContextProvider>
  );
};

function useComboboxValidation(children: ReactNode): {
  renderTrigger: ReactNode;
  renderContent: ReactNode;
} {
  const childrenArray = React.Children.toArray(children);
  let renderTrigger: ReactNode, renderContent: ReactNode;

  childrenArray.forEach(child => {
    if (isTriggerElement(child)) {
      if (renderTrigger) {
        throw new Error("Combobox can only have one Trigger element");
      }
      renderTrigger = child;
    }
    if (isContentElement(child)) {
      renderContent = child;
    }
  });

  if (!renderTrigger || !renderContent) {
    throw new Error("Combobox must have a Trigger and Content element");
  }

  return {
    renderContent,
    renderTrigger,
  };
}

function isTriggerElement(child: ReactNode): boolean {
  return (
    React.isValidElement(child) &&
    typeof child !== "string" &&
    typeof child.type !== "string" &&
    (child.type.name == "TriggerButton" || child.type.name == "TriggerChip")
  );
}
function isContentElement(child: ReactNode): boolean {
  return (
    React.isValidElement(child) &&
    typeof child !== "string" &&
    typeof child.type !== "string" &&
    child.type.name == "Content"
  );
}

Combobox.TriggerButton = TriggerButton;
Combobox.TriggerChip = TriggerChip;
Combobox.Content = Content;
Combobox.Action = Action;
