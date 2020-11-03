import React from "react";
import { Card } from "../Card";
import { Content } from "../Content";
import { Emphasis } from "../Emphasis";

interface DataDebuggerProps {
  /**
   * Label for the DataDump
   *
   * @default "Raw Data"
   */
  readonly label?: string;

  /**
   * Should the `DataDump` default to open?
   *
   * @default false
   */
  readonly defaultOpen?: boolean;

  /**
   * Data to display.
   */
  readonly data: unknown;
}

export function DataDump({
  label = "Raw Data",
  defaultOpen = false,
  data,
}: DataDebuggerProps) {
  return (
    <Card accent="yellow">
      <Content>
        <details open={defaultOpen}>
          <summary>
            <Emphasis variation="bold">{label}</Emphasis>
          </summary>
          <pre>{JSON.stringify(data, undefined, 2)}</pre>
        </details>
      </Content>
    </Card>
  );
}
