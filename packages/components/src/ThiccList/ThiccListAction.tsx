import React, { MouseEvent } from "react";
import { IconNames } from "@jobber/design";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";

interface ThiccListActionProps {
  readonly icon: IconNames;
  readonly label: string;
  readonly onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function ThiccListAction({
  icon,
  label,
  onClick,
}: ThiccListActionProps) {
  return (
    <Tooltip message={label}>
      <Button
        icon={icon}
        ariaLabel={label}
        variation="subtle"
        type="secondary"
        onClick={onClick}
      />
    </Tooltip>
  );
}
