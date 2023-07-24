import React from "react";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";

interface ThiccListActionsProps {
  readonly withExport?: boolean;
}

export function ThiccListActions({ withExport = true }: ThiccListActionsProps) {
  return (
    <>
      <Tooltip message="Compose Email">
        <Button
          icon="email"
          ariaLabel="Email"
          variation="subtle"
          type="secondary"
        />
      </Tooltip>
      <Tooltip message="Create Note">
        <Button
          icon="addNote"
          ariaLabel="Note"
          variation="subtle"
          type="secondary"
        />
      </Tooltip>
      {withExport && (
        <Tooltip message="Export">
          <Button
            icon="export"
            ariaLabel="Export"
            variation="subtle"
            type="secondary"
          />
        </Tooltip>
      )}
      <Tooltip message="More actions">
        <Button
          icon="more"
          ariaLabel="More"
          variation="subtle"
          type="secondary"
        />
      </Tooltip>
    </>
  );
}
