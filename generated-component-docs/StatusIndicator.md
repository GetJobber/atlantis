# StatusIndicator

# Status Indicator

The StatusIndicator component is a purely visual component that indicates a
status (e.g., "Active", "Overdue").

## Design & usage guidelines

StatusIndicator offers only 5 possible status representations:

### Success

Convey that an item is in a successful state, such as approved or paid.

### Critical

Alert the user to a critically important issue such as a late appointment or an
overdue payment.

### Warning

Warn the user of a potential forthcoming issue like an upcoming deadline or an
item awaiting response.

### Informative

Inform the user about something that may not require action, such as a quote
that has already been converted into a job.

### Inactive

Signify that an item has been archived, closed, or otherwise removed from an
active workflow.

## Status Indicators

| StatusIndicator                          | `status`      |
| :--------------------------------------- | :------------ |
| <StatusIndicator status="success" />     | `success`     |
| <StatusIndicator status="critical" />    | `critical`    |
| <StatusIndicator status="informative" /> | `informative` |
| <StatusIndicator status="warning" />     | `warning`     |
| <StatusIndicator status="inactive" />    | `inactive`    |

## Related components

If you are looking to use a StatusIndicator with a label, you should use
[StatusLabel](/components/StatusLabel).

## Web Component Code

```tsx
StatusIndicator Badge Tag Web React import React from "react";
import styles from "./StatusIndicator.module.css";
import type { StatusIndicatorType } from "./StatusIndicator.type";

interface StatusIndicatorProps {
  readonly status: StatusIndicatorType;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <span
      style={{ backgroundColor: `var(--color-${status})` }}
      className={styles.statusIndicator}
      data-testid={`ATL-Status-Indicator-${status}`}
    />
  );
}

```

## Props

### Web Props

| Prop     | Type                  | Required | Default  | Description      |
| -------- | --------------------- | -------- | -------- | ---------------- |
| `status` | `StatusIndicatorType` | ✅       | `_none_` | _No description_ |

## Categories

- Status & Feedback

## Web Test Code

```typescript
StatusIndicator Badge Tag Web React Test Testing Jest import { render, screen } from "@testing-library/react";
import React from "react";
import { StatusIndicator } from "./StatusIndicator";
import type { StatusIndicatorType } from "./StatusIndicator.type";

const statuses: StatusIndicatorType[] = [
  "success",
  "warning",
  "critical",
  "inactive",
  "informative",
];

it.each(statuses)(
  `renders a %s status indicator`,
  (status: StatusIndicatorType) => {
    render(<StatusIndicator status={status} />);

    expect(
      screen.getByTestId(`ATL-Status-Indicator-${status}`),
    ).toBeInTheDocument();
  },
);

```

## Component Path

`/components/StatusIndicator`

---

_Generated on 2025-08-21T17:35:16.372Z_
