# FormatDate

# FormatDate

In Jobber a FormatDate is used to ensure that the date is displayed in the
expected format. No text styling is applied, this simply formats the date.

## Design & usage guidelines

### Getting a string version

Use `strFormatDate` if you need your formatted date as a string so it can be
passed as an attribute that doesn't allow for a component.

```ts

```

<Canvas>
  <Text>{strFormatDate(new Date())}</Text>
</Canvas>

## Design & usage guidelines

Use FormatDate to ensure that a date is represented as expected.

If there are additional text styling concerns, wrap FormatDate in a
[Text](/components/Text) component.

If the formatted date is intended to be part of a heading, wrap FormatDate in a
[Heading](/components/Heading) component.

If you require a string instead of a component use strFormatDate.

## Web Component Code

```tsx
FormatDate  Web React import React from "react";

interface FormatDateProps {
  /**
   * Date to be formatted.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly date: Date | string;

  /**
   * Boolean to show year or not.
   */
  readonly showYear?: boolean;
}

export function FormatDate({
  date: inputDate,
  showYear = true,
}: FormatDateProps) {
  let dateObject: Date;

  if (inputDate instanceof Date) {
    dateObject = inputDate;
  } else {
    dateObject = new Date(inputDate);
  }

  return <>{strFormatDate(dateObject, showYear)}</>;
}

export function strFormatDate(date: Date, showYear = true) {
  let formatOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  if (showYear) {
    formatOptions = {
      ...formatOptions,
      year: "numeric",
    };
  }

  return date.toLocaleDateString(undefined, formatOptions);
}

```

## Props

### Web Props

| Prop   | Type    | Required | Default | Description |
| ------ | ------- | -------- | ------- | ----------- | --------------------- |
| `date` | `string | Date`    | ✅      | `_none_`    | Date to be formatted. |

A `string` should be an ISO 8601 format date string. | | `showYear` | `boolean`
| ❌ | `true` | Boolean to show year or not. |

## Categories

- Utilities

## Web Test Code

```typescript
FormatDate  Web React Test Testing Jest import React from "react";
import { render } from "@testing-library/react";
import { FormatDate, strFormatDate } from "./FormatDate";

describe("Different date values", () => {
  const dates = {
    ISO8601DateString: "2019-03-30T00:45",
    Date: new Date("2020-03-30T00:45"),
  };

  const mockDateResult = [`Mar 30, 2019`, `Mar 30, 2020`];

  Object.entries(dates).forEach(([inputType, value], index) => {
    it(`renders a formatted date from ${inputType}`, async () => {
      const { findByText } = render(<FormatDate date={value} />);
      expect(
        await findByText(strFormatDate(new Date(mockDateResult[index]))),
      ).toBeDefined();
    });
  });
});

describe("strFormatDate", () => {
  const expectedDateString = "Jan 4, 1992";
  const expectedDate = new Date(expectedDateString);
  const mockLocale = undefined;
  const mockLocaleDateFormat: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  const mockLocaleDateFormatWithYear: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  it("should return the right locale date format", () => {
    const mockDateSpy = jest.spyOn(Date.prototype, "toLocaleDateString");
    strFormatDate(expectedDate);
    expect(mockDateSpy).toHaveBeenCalledWith(
      mockLocale,
      mockLocaleDateFormatWithYear,
    );
  });

  it("should return the proper date format", () => {
    expect(strFormatDate(expectedDate)).toBe(
      new Date(expectedDateString).toLocaleDateString(
        mockLocale,
        mockLocaleDateFormatWithYear,
      ),
    );
  });

  it("should return the proper date format with year is hidden", () => {
    expect(strFormatDate(expectedDate, false)).toBe(
      new Date(expectedDateString).toLocaleDateString(
        mockLocale,
        mockLocaleDateFormat,
      ),
    );
  });
});

```

## Component Path

`/components/FormatDate`

---

_Generated on 2025-08-21T17:35:16.361Z_
