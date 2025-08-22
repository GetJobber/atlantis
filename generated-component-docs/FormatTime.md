# FormatTime

# FormatTime

In Jobber a FormatTime is used to ensure that time is displayed in the expected
format. No text styling is applied, this simply formats the text.

## Specify format

You can select a specific format to use in FormatTime.

In the following example, we create a new `Date` object and set its time to
22:35:00 (10:35 PM) using the `setHours` method. The `setHours` method sets the
hours, minutes, seconds, and milliseconds for a specified date.

```tsx
const newDate = new Date();
newDate.setHours(22, 35, 0, 0);

<FormatTime time={newDate} use24HourClock={true} /> // prints 22:35

<FormatTime time={newDate} use24HourClock={false} /> // prints 10:35 PM

```

## Web Component Code

```tsx
FormatTime  Web React import React from "react";

interface FormatTimeProps {
  /**
   * Time (as JS Date) to be displayed.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly time: Date | string;

  /**
   * Optionally specify clock format. If `undefined` system format will be respected.
   */
  readonly use24HourClock?: boolean;
}

export function FormatTime({
  time: inputTime,
  use24HourClock,
}: FormatTimeProps) {
  let dateObject: Date;

  if (inputTime instanceof Date) {
    dateObject = inputTime;
  } else {
    dateObject = new Date(inputTime);
  }

  return <>{dateToLocaleTimeString(dateObject, use24HourClock)}</>;
}

function dateToLocaleTimeString(date: Date, use24HourClock?: boolean) {
  const language = globalThis?.navigator ? navigator.language : "en";

  return date.toLocaleTimeString(language, {
    hourCycle: use24HourClock ? "h23" : "h12",
    minute: "2-digit",
    hour: "numeric",
  });
}

```

## Props

### Web Props

| Prop   | Type    | Required | Default | Description |
| ------ | ------- | -------- | ------- | ----------- | ---------------------------------- |
| `time` | `string | Date`    | ✅      | `_none_`    | Time (as JS Date) to be displayed. |

A `string` should be an ISO 8601 format date string. | | `use24HourClock` |
`boolean` | ❌ | `_none_` | Optionally specify clock format. If `undefined`
system format will be respected. |

## Categories

- Utilities

## Web Test Code

```typescript
FormatTime  Web React Test Testing Jest import React from "react";
import { render } from "@testing-library/react";
import { FormatTime } from "./FormatTime";

describe("FormatTime", () => {
  describe.each(
    Object.entries({
      ISO8601DateString: "2019-03-30T14:30",
      Date: new Date("2019-03-30T14:30"),
    }),
  )("%s", (name, date) => {
    it("renders a FormatTime", () => {
      const { container } = render(<FormatTime time={date} />);
      expect(container.textContent).toBe("2:30 PM");
    });

    it("renders a FormatTime using 24 hour clock", () => {
      const { container } = render(
        <FormatTime time={date} use24HourClock={true} />,
      );
      expect(container.textContent).toBe("14:30");
    });

    it("renders a FormatTime using 12 hour clock", () => {
      const { container } = render(
        <FormatTime time={date} use24HourClock={false} />,
      );
      expect(container.textContent).toBe("2:30 PM");
    });
  });

  it("should render 12:30AM as 00:30 using the 24 hour clock", () => {
    const { container } = render(
      <FormatTime time="2019-03-30T00:30" use24HourClock={true} />,
    );
    expect(container.textContent).toBe("00:30");
  });
});

```

## Component Path

`/components/FormatTime`

---

_Generated on 2025-08-21T17:35:16.361Z_
