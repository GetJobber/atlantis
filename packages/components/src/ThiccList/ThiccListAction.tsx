import { IconNames } from "@jobber/design";
import React from "react";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";

interface ThiccListActionProps {
  readonly icon: IconNames;
  readonly label: string;
}

export function ThiccListAction({ icon, label }: ThiccListActionProps) {
  return (
    <Tooltip message={label}>
      <Button
        icon={icon}
        ariaLabel={label}
        variation="subtle"
        type="secondary"
      />
    </Tooltip>
  );
}
