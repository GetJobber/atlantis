# SegmentedControl

<Meta
  title="Components/Selections/SegmentedControl"
  component={SegmentedControl}
/>

# SegmentedControl

SegmentedControl is a horizontal control made up of multiple segments or
options, which adjusts the presentation of a single view. A common use case is
for swapping between Day/Week/Month views in a calendar. The same content is
displayed, however the presentation changes based on the selected segment.

## Design & usage guidelines

SegmentedControl should only use up to five options with succinct labels. The
component will also grow quite wide with more options and can become unusable on
smaller screens. In that case, it is advised to put the SegmentedControl in a
parent container with a fixed width. Be sure to avoid truncating the labels.

## Content guidelines

Concise [Text](/components/Text) should be used as the primary format for option
labels.

<Canvas>
  <SegmentedControl defaultOption="option1">
    <SegmentedControl.Option value="option1">Option 1</SegmentedControl.Option>
    <SegmentedControl.Option value="option2">Option 2</SegmentedControl.Option>
    <SegmentedControl.Option value="option3">Option 3</SegmentedControl.Option>
    <SegmentedControl.Option value="option4">Option 4</SegmentedControl.Option>
    <SegmentedControl.Option value="option5">Option 5</SegmentedControl.Option>
  </SegmentedControl>
</Canvas>

Using [Icons](/components/Icon) as labels should only be used if the icon has
been tested as understandable in isolation.

<Canvas>
  <SegmentedControl defaultOption="calendar">
    <SegmentedControl.Option value="calendar">
      <Icon name="calendar" />
    </SegmentedControl.Option>
    <SegmentedControl.Option value="phone">
      <Icon name="phone" />
    </SegmentedControl.Option>
    <SegmentedControl.Option value="availability">
      <Icon name="availability" />
    </SegmentedControl.Option>
  </SegmentedControl>
</Canvas>

Mixing content types within a single label, like using an icon with text, should
be avoided. This would be an inefficient use of the SegmentedControl's limited
horizontal space.

Mixing content types across options should also be avoided. This would create an
inconsistent experience for users and lead to a jarring visual rhythm.

If you do not have enough horizontal room to allow for readable labels, consider
using [Menu](/components/Menu) as an alternative single-selection method for
modifying the view. Otherwise, truncation will prevent the user from reading the
label and a label with wrapped text will create layout inconsistencies.

## Related components

Unlike [Tabs](/components/Tabs), the contents of each segment are not contained
by each label. You should use Tabs when you need to navigate between related
subgroups of different content.

Unlike [Switch](/components/Switch), which toggles between a simple On/Off
state, the SegmentedControl offers more than two options.

With SegmentedControl, options are more aggressively grouped than
[Chips](/components/Chips) and also cannot reflow when it runs out of room.

## Accessibility

When using a screen reader, the SegmentedControl will be read as a group of
options. The `ariaLabel` of the currently selected option will be announced and
also declared as selected.

The user can navigate between options using the arrow keys and a counter will
indicate the current option number, out of the total number of options.

### Keyboard interactions

To enter the SegmentedControl, use the Tab key. Use the left and right arrow
keys to navigate between options. Hitting the Tab key again will exit the
SegmentedControl.

## Web Component Code

```tsx
SegmentedControl Toggle Switch ViewControl TabControl Tab Web React import React, { type PropsWithChildren, useId, useRef } from "react";
import { SegmentedControlProvider } from "./SegmentedControlProvider";
import { SegmentedControlOption } from "./SegmentedControlOption";
import { SegmentedControlBase } from "./SegmentedControlBase";

interface SegmentedControlProps<T> extends PropsWithChildren {
  /**
   * The currently selected option. Use this prop with `onSelectValue` for
   * a controlled component.
   */
  readonly selectedValue?: T;

  /**
   * A callback function that is called whenever the selected option changes.
   * Use this prop with `selectedValue` for a controlled component.
   */
  readonly onSelectValue?: (value: T) => void;

  /**
   * The default option to be selected initially.
   * Set this prop when the component is uncontrolled.
   */
  readonly defaultValue?: T;

  /**
   * A unique name for the SegmentedControl, that links the group of
   * options together. Can be a string or, if not set, will default to a generated
   * id.
   *
   * @default useId()
   */
  readonly name?: string;

  /**
   * Adjusts the size of the SegmentedControl. The default size is "base".
   *
   * @default base
   */
  readonly size?: "small" | "base" | "large";
}

export function SegmentedControl<T>({
  selectedValue,
  onSelectValue,
  defaultValue,
  children,
  name = useId(),
  size = "base",
}: SegmentedControlProps<T>) {
  const container = useRef<HTMLDivElement>(null);

  return (
    <SegmentedControlProvider
      selectedValue={selectedValue}
      onSelectValue={onSelectValue}
      defaultValue={defaultValue}
      name={name}
    >
      <SegmentedControlBase ref={container} size={size}>
        {children}
      </SegmentedControlBase>
    </SegmentedControlProvider>
  );
}

SegmentedControl.Option = SegmentedControlOption;
SegmentedControl.Base = SegmentedControlBase;
import classNames from "classnames";
import type { CSSProperties, PropsWithChildren } from "react";
import React, { Children, forwardRef } from "react";
import styles from "./SegmentedControl.module.css";

export interface SegmentedControlBaseProps extends PropsWithChildren {
  readonly size?: "small" | "base" | "large";
}

const SegmentedControlBase = forwardRef<
  HTMLDivElement,
  SegmentedControlBaseProps
>(function SegmentedControlBase({ children, size = "base" }, ref) {
  const optionCount = Children.count(children);

  const containerClassNames = classNames(styles.container, {
    [styles.small]: size === "small",
    [styles.large]: size === "large",
  });

  return (
    <div
      ref={ref}
      className={containerClassNames}
      role="radiogroup"
      style={
        {
          "--segmentedControl--option-count": optionCount,
        } as CSSProperties
      }
    >
      {children}
      <span />
    </div>
  );
});

export { SegmentedControlBase };
import type { PropsWithChildren } from "react";
import React, { useId, useMemo } from "react";
import { useSegmentedControl } from "./SegmentedControlProvider";

interface SegmentedControlOptionProps<TValue extends string | number>
  extends PropsWithChildren {
  /**
   * The unique value associated with this option. This value is used to determine
   * which option is selected and is passed to the onSelectValue callback.
   */
  readonly value: TValue;

  /**
   * An aria-label that describes the option.
   */
  readonly ariaLabel?: string;
}

export function SegmentedControlOption<TValue extends string | number>({
  value,
  children,
  ariaLabel,
}: SegmentedControlOptionProps<TValue>) {
  const { selectedValue, handleChange, segmentedControlName } =
    useSegmentedControl<TValue>();
  const localChecked = useMemo(
    () => selectedValue === value,
    [selectedValue, value],
  );
  const inputId = `${value.toString()}_${useId()}`;

  return (
    <>
      <input
        type="radio"
        id={inputId}
        name={segmentedControlName}
        checked={localChecked}
        value={value as string}
        onChange={handleChange}
        aria-label={ariaLabel}
        tabIndex={localChecked ? 0 : -1}
      />
      <label htmlFor={inputId}>{children}</label>
    </>
  );
}
import type { ChangeEventHandler, PropsWithChildren } from "react";
import React, { createContext, useCallback, useContext, useState } from "react";

interface SegmentedControlProviderContext<T = unknown> {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  selectedValue: T;
  segmentedControlName?: string;
}

export const SegmentedControlContext = createContext<
  SegmentedControlProviderContext<unknown>
>({
  handleChange: () => ({}),
  selectedValue: null,
  segmentedControlName: "",
});

interface SegmentedControlProviderProps<T> extends PropsWithChildren {
  readonly selectedValue?: T;
  readonly onSelectValue?: (value: T) => void;
  readonly defaultValue?: T;
  readonly name?: string;
}

export const useSegmentedControl = <T,>() => {
  return useContext(
    SegmentedControlContext,
  ) as SegmentedControlProviderContext<T>;
};

export function SegmentedControlProvider<T>({
  children,
  selectedValue,
  onSelectValue,
  defaultValue,
  name,
}: SegmentedControlProviderProps<T>) {
  const isControlled =
    selectedValue !== undefined && onSelectValue !== undefined;
  const [internalSelectedValue, setInternalSelectedValue] = useState<
    T | undefined
  >(defaultValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const value = event.target.value as T;

      if (!isControlled) {
        setInternalSelectedValue(value);
      }
      onSelectValue?.(value);
    },
    [onSelectValue, isControlled],
  );

  const currentSelectedOption = isControlled
    ? selectedValue
    : internalSelectedValue;

  return (
    <SegmentedControlContext.Provider
      value={{
        handleChange,
        selectedValue: currentSelectedOption,
        segmentedControlName: name,
      }}
    >
      {children}
    </SegmentedControlContext.Provider>
  );
}

```

## Props

### Web Props

| Prop                                                           | Type                 | Required | Default   | Description                                                              |
| -------------------------------------------------------------- | -------------------- | -------- | --------- | ------------------------------------------------------------------------ |
| `selectedValue`                                                | `T`                  | ❌       | `_none_`  | The currently selected option. Use this prop with `onSelectValue` for    |
| a controlled component.                                        |
| `onSelectValue`                                                | `(value: T) => void` | ❌       | `_none_`  | A callback function that is called whenever the selected option changes. |
| Use this prop with `selectedValue` for a controlled component. |
| `defaultValue`                                                 | `T`                  | ❌       | `_none_`  | The default option to be selected initially.                             |
| Set this prop when the component is uncontrolled.              |
| `name`                                                         | `string`             | ❌       | `useId()` | A unique name for the SegmentedControl, that links the group of          |

options together. Can be a string or, if not set, will default to a generated
id. | | `size` | `"small" | "base" | "large"` | ❌ | `base` | Adjusts the size
of the SegmentedControl. The default size is "base". |

## Categories

- Selections

## Web Test Code

```typescript
SegmentedControl Toggle Switch ViewControl TabControl Tab Web React Test Testing Jest import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SegmentedControl } from "./SegmentedControl";

describe("SegmentedControl", () => {
  const options = [
    { value: "pizza", label: "Pizza" },
    { value: "tacos", label: "Tacos" },
    { value: "sushi", label: "Sushi" },
    { value: "burgers", label: "Burgers" },
  ];

  it("should render options correctly", () => {
    render(
      <SegmentedControl>
        {options.map(option => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );

    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("updates the selected value when an option is clicked", async () => {
    render(
      <SegmentedControl defaultValue="pizza">
        {options.map(option => (
          <SegmentedControl.Option
            key={option.value}
            value={option.value}
            ariaLabel={option.value}
          >
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );

    expect(screen.getByLabelText("Pizza")).toBeChecked();

    userEvent.click(screen.getByLabelText("Tacos"));

    await waitFor(() => {
      expect(screen.getByLabelText("Tacos")).toBeChecked();
      expect(screen.getByLabelText("Pizza")).not.toBeChecked();
    });
  });

  it("updates the selected value when options are navigated via arrow keys", async () => {
    const changeHandler = jest.fn();
    render(
      <SegmentedControl onSelectValue={changeHandler}>
        {options.map(option => (
          <SegmentedControl.Option
            key={option.value}
            value={option.value}
            ariaLabel={option.value}
          >
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );

    const pizzaOption = screen.getByLabelText("Pizza");
    pizzaOption.focus();

    await userEvent.keyboard("{ArrowRight}");
    expect(changeHandler).toHaveBeenCalledWith("tacos");

    await userEvent.keyboard("{ArrowRight}");
    expect(changeHandler).toHaveBeenCalledWith("sushi");

    await userEvent.keyboard("{ArrowLeft}");
    expect(changeHandler).toHaveBeenCalledWith("tacos");
  });

  it("allows tabbing into and out of the component", async () => {
    render(
      <SegmentedControl defaultValue="pizza">
        {options.map(option => (
          <SegmentedControl.Option
            key={option.value}
            value={option.value}
            ariaLabel={option.value}
          >
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );

    await userEvent.tab();
    expect(screen.getByLabelText("Pizza")).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByLabelText("Pizza")).not.toHaveFocus();
    expect(screen.getByLabelText("Tacos")).not.toHaveFocus();
    expect(screen.getByLabelText("Sushi")).not.toHaveFocus();
    expect(screen.getByLabelText("Burgers")).not.toHaveFocus();
  });

  it("assigns each option the same name prop string", () => {
    render(
      <SegmentedControl name="food">
        {options.map(option => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );

    options.forEach(option => {
      expect(screen.getByLabelText(option.label).getAttribute("name")).toBe(
        "food",
      );
    });
  });

  it("defaults the name prop to a unique id if string is not provided", () => {
    render(
      <SegmentedControl>
        {options.map(option => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>,
    );
    const firstOptionName = screen.getByLabelText("Pizza").getAttribute("name");
    expect(firstOptionName).toMatch(":ro:");
  });
});
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  SegmentedControlProvider,
  useSegmentedControl,
} from "./SegmentedControlProvider";

const SegmentedControl = () => {
  const { selectedValue, handleChange } = useSegmentedControl<string>();

  return (
    <div>
      <input
        type="radio"
        value="option1"
        checked={selectedValue === "option1"}
        onChange={handleChange}
        aria-label="Option 1"
      />
      <input
        type="radio"
        value="option2"
        checked={selectedValue === "option2"}
        onChange={handleChange}
        aria-label="Option 2"
      />
    </div>
  );
};

describe("SegmentedControlProvider", () => {
  describe("Uncontrolled", () => {
    it("updates internal state when an option is selected", async () => {
      render(
        <SegmentedControlProvider defaultValue="option1">
          <SegmentedControl />
        </SegmentedControlProvider>,
      );

      expect(screen.getByLabelText("Option 1")).toBeChecked();

      userEvent.click(screen.getByLabelText("Option 2"));

      await waitFor(() => {
        expect(screen.getByLabelText("Option 2")).toBeChecked();
      });
    });

    it("initializes with the correct value", () => {
      render(
        <SegmentedControlProvider defaultValue="option2">
          <SegmentedControl />
        </SegmentedControlProvider>,
      );

      expect(screen.getByLabelText("Option 2")).toBeChecked();
    });
  });

  describe("Controlled", () => {
    it("calls onSelectValue when an option is selected", async () => {
      const handleSelectValue = jest.fn();
      render(
        <SegmentedControlProvider
          selectedValue="option1"
          onSelectValue={handleSelectValue}
        >
          <SegmentedControl />
        </SegmentedControlProvider>,
      );

      expect(screen.getByLabelText("Option 1")).toBeChecked();

      userEvent.click(screen.getByLabelText("Option 2"));

      await waitFor(() => {
        expect(handleSelectValue).toHaveBeenCalledWith("option2");
      });
    });

    it("initializes with the correct value", () => {
      const handleSelectValue = jest.fn();
      render(
        <SegmentedControlProvider
          selectedValue="option2"
          onSelectValue={handleSelectValue}
        >
          <SegmentedControl />
        </SegmentedControlProvider>,
      );

      expect(screen.getByLabelText("Option 2")).toBeChecked();
    });

    it("does not call onSelectValue on mount", () => {
      const handleSelectValue = jest.fn();
      render(
        <SegmentedControlProvider
          selectedValue="option1"
          onSelectValue={handleSelectValue}
        >
          <SegmentedControl />
        </SegmentedControlProvider>,
      );

      // Verify that onSelectValue was never called during mount
      expect(handleSelectValue).not.toHaveBeenCalled();
    });
  });
});

```

## Component Path

`/components/SegmentedControl`

---

_Generated on 2025-08-21T17:35:16.371Z_
