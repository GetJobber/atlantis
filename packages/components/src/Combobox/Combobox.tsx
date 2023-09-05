import React, { ReactElement, ReactNode } from "react";
import { useAssert } from "@jobber/hooks/useAssert";
import { ComboboxContent } from "./components/ComboboxContent";
import { Action } from "./components/Action";
import { TriggerButton, TriggerChip } from "./components/Trigger";
import { ComboboxContextProvider } from "./ComboboxProvider";

export interface ComboboxProps {
  readonly children: ReactElement | ReactElement[];
}

export const Combobox = (props: ComboboxProps): JSX.Element => {
  const { contentElement, triggerElement } = useComboboxValidation(
    props.children,
  );
  return (
    <ComboboxContextProvider>
      {triggerElement}
      {contentElement}
    </ComboboxContextProvider>
  );
};

function useComboboxValidation(children: ReactNode): {
  triggerElement: ReactNode;
  contentElement: ReactNode;
} {
  const childrenArray = React.Children.toArray(children);
  let triggerElement: ReactNode,
    contentElement: ReactNode,
    multipleTriggersFound = false;

  childrenArray.forEach(child => {
    if (isTriggerElement(child)) {
      if (triggerElement) {
        multipleTriggersFound = true;
      }
      triggerElement = child;
    }
    if (isContentElement(child)) {
      contentElement = child;
    }
  });

  useAssert(
    multipleTriggersFound,
    "Combobox can only have one Trigger element",
  );

  useAssert(
    !triggerElement || !contentElement,
    "Combobox must have a Trigger and Combobox.Content element",
  );

  return {
    contentElement,
    triggerElement,
  };
}

function isTriggerElement(child: ReactNode): boolean {
  return (
    React.isValidElement(child) &&
    typeof child !== "string" &&
    typeof child.type !== "string" &&
    (child.type === TriggerButton || child.type === TriggerChip)
  );
}

function isContentElement(child: ReactNode): boolean {
  return (
    React.isValidElement(child) &&
    typeof child !== "string" &&
    typeof child.type !== "string" &&
    child.type === ComboboxContent
  );
}

Combobox.TriggerButton = TriggerButton;
Combobox.TriggerChip = TriggerChip;
Combobox.Content = ComboboxContent;
Combobox.Action = Action;
