import React, { ReactElement, ReactNode } from "react";
import { useAssert } from "@jobber/hooks/useAssert";
import { ComboboxContent } from "./components/Content";
import { Action } from "./components/Action";
import { TriggerButton, TriggerChip } from "./components/Trigger";
import { ComboboxContextProvider } from "./ComboboxProvider";

export interface ComboboxProps {
  readonly children: ReactElement | ReactElement[];
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
        useAssert(true, "Combobox can only have one Trigger element");
      }
      renderTrigger = child;
    }
    if (isContentElement(child)) {
      renderContent = child;
    }
  });

  if (!renderTrigger || !renderContent) {
    useAssert(true, "Combobox must have a Trigger and Content element");
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
