# InputDate

# Input Date

InputDate provides a multi-modal way for the user to select a date, using
either:

- Form Field
- Visual calendar selector and comes complete with the ability to re-format user
  input into an expected date format.

## Design & usage guidelines

The InputDate should be used in most cases where the user needs to select a
date.

### States

#### Disabled

<Canvas>
  <InputDate placeholder="Start Date" disabled={true} onChange={undefined} />
</Canvas>

#### Invalid

<Canvas>
  <InputDate
    placeholder="Start date"
    invalid="Start Date is required"
    onChange={undefined}
  />
</Canvas>

## Content guidelines

The InputDate should only be used to display and submit date values. For other
input usage, see [Related Components](#related-components).

## Responsiveness

When the InputDate is near the top or bottom of the viewport, the Datepicker
will adjust its position to remain in view.

The FormField for InputDate will take up the full available width of its parent.
If used in an [InputGroup](/components/InputGroup), it will take up the
available amount of space left by any other inputs in the group.

## Related components

- On web if you do not need an accompanying form field, you can use the
  [Datepicker](/components/Datepicker) on its own
- If you need to allow the user to enter time, use
  [InputTime](/components/InputTime)
- If you just need a text input, use [InputText](/components/InputText)

## Accessibility

Accessibility concerns for the InputDate are captured by:

### FormField

Provides a label, announces input type, can be focused, and handles error
validation and messaging.

### Datepicker

[Datepicker](../?path=/docs/components-selections-datepicker--docs#accessibility)
is keyboard-operable and announces the currently-focused date available for
selection to the user via assistive technology.

## Web Component Code

```tsx
InputDate Datepicker Datetime Picker Calendar Web React import React, { forwardRef } from "react";
import { useInputDateActivatorActions } from "./useInputDateActivatorActions";
import type { InputDateRebuiltProps } from "./InputDate.types";
import type { Suffix } from "../FormField";
import { DatePicker } from "../DatePicker";
import type { DatePickerActivatorProps } from "../DatePicker/DatePickerActivator";
import { InputText } from "../InputText";

export const InputDateRebuilt = forwardRef<
  HTMLInputElement,
  InputDateRebuiltProps
>((props, forwardedRef) => {
  const { onChange } = props;

  return (
    <DatePicker
      selected={props.value}
      onChange={newValue => {
        onChange(newValue);
      }}
      disabled={props.disabled}
      readonly={props.readOnly}
      fullWidth={!props.inline}
      minDate={props.minDate}
      maxDate={props.maxDate}
      smartAutofocus={false}
      activator={InputDateActivator}
    />
  );

  function InputDateActivator(activatorProps: DatePickerActivatorProps) {
    const { onClick, value } = activatorProps;

    const { handleChange, handleFocus, handleBlur, isFocused } =
      useInputDateActivatorActions({
        onChange: activatorProps.onChange,
        onFocus: event => {
          props.onFocus?.(event);
          activatorProps.onFocus?.();
        },
        onBlur: event => {
          props.onBlur?.(event);
          activatorProps.onBlur?.();
        },
      });

    const suffix =
      props.showIcon !== false
        ? ({
            icon: "calendar",
            ariaLabel: "Show calendar",
            onClick: !props.disabled && onClick && onClick,
          } as Suffix)
        : undefined;

    const showEmptyValueLabel = !value && !isFocused;

    return (
      // We prevent the picker from opening on focus for keyboard navigation, so to maintain a good UX for mouse users we want to open the picker on click
      <div onClick={onClick}>
        <InputText
          aria-describedby={activatorProps.ariaDescribedBy}
          aria-invalid={activatorProps.ariaInvalid === "true" ? true : false}
          aria-labelledby={activatorProps.ariaLabelledBy}
          aria-required={activatorProps.ariaRequired === "true" ? true : false}
          id={activatorProps.id}
          disabled={props.disabled}
          error={props.error}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          size={props.size}
          inline={props.inline}
          align={props.align}
          description={props.description}
          invalid={props.invalid}
          name={props.name}
          version={2}
          value={
            showEmptyValueLabel ? props.emptyValueLabel || "" : value || ""
          }
          ref={forwardedRef}
          suffix={suffix}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={event => {
            if (props.showIcon === false && event.key === "ArrowDown") {
              activatorProps.onClick?.();
            }
            props.onKeyDown?.(event);
          }}
          onChange={handleChange}
        />
      </div>
    );
  }
});

InputDateRebuilt.displayName = "InputDateRebuilt";
import omit from "lodash/omit";
import React, { useEffect, useRef, useState } from "react";
import isValid from "date-fns/isValid";
import type { InputDateProps } from "./InputDate.types";
import type { FieldActionsRef, Suffix } from "../FormField";
import { FormField } from "../FormField";
import { DatePicker } from "../DatePicker";

export function InputDate(inputProps: InputDateProps) {
  const formFieldActionsRef = useRef<FieldActionsRef>(null);

  return (
    <DatePicker
      selected={inputProps.value}
      onChange={inputProps.onChange}
      disabled={inputProps.disabled}
      readonly={inputProps.readonly}
      fullWidth={!inputProps.inline}
      minDate={inputProps.minDate}
      maxDate={inputProps.maxDate}
      smartAutofocus={false}
      activator={activatorProps => {
        const { onChange, onClick, value, pickerRef } = activatorProps;
        const newActivatorProps = omit(activatorProps, ["activator"]);
        const [isFocused, setIsFocused] = useState(false);
        const suffix =
          inputProps.showIcon !== false
            ? ({
                icon: "calendar",
                ariaLabel: "Show calendar",
                onClick: !inputProps.disabled && onClick && onClick,
              } as Suffix)
            : undefined;

        // Set form field to formatted date string immediately, to avoid validations
        //  triggering incorrectly when it blurs (to handle the datepicker UI click)
        useEffect(() => {
          value && formFieldActionsRef.current?.setValue(value);
        }, [value]);
        const showEmptyValueLabel = !value && !isFocused;

        return (
          // We prevent the picker from opening on focus for keyboard navigation, so to maintain a good UX for mouse users we want to open the picker on click
          <div onClick={onClick}>
            <FormField
              {...newActivatorProps}
              {...inputProps}
              value={
                showEmptyValueLabel ? inputProps.emptyValueLabel || "" : value
              }
              placeholder={inputProps.placeholder}
              onChange={(_, event) => {
                onChange && onChange(event);
              }}
              onBlur={() => {
                inputProps.onBlur && inputProps.onBlur();
                activatorProps.onBlur && activatorProps.onBlur();
                setIsFocused(false);

                /**
                 * This is an experimental workaround to solve a specific UX problem we have under certain conditions.
                 * When you click to focus InputDate, ReactDatePicker becomes visible. If you delete the current date and blur
                 * the input field by clicking away, ReactDatePicker will automatically set the date to whatever date was
                 * currently selected.
                 *
                 * The above works great and is the expected user experience. ReactDatePicker fills in the empty value for us.
                 *
                 * However, there's a specific scenario where ReactDatePicker isn't visible: when you tab into the input date.
                 * When you tab into it, clear the value, and tab away to blur, ReactDatePicker doesn't automatically fill in
                 * the empty value because it wasn't visible/active.
                 *
                 * To solve this, we need to handle the blur event here and check if the value is empty or invalid. If it is,
                 * we have to call onChange with the original input value which informs ReactDatePicker that is the current value.
                 */
                if (inputProps.restoreLastValueOnBlur) {
                  if ((!value || !isValid(value)) && inputProps.value) {
                    // @ts-expect-error -- ReactDatePicker types don't include setSelected
                    pickerRef.current?.setSelected(inputProps.value);
                  }
                }
              }}
              onFocus={() => {
                inputProps.onFocus && inputProps.onFocus();
                activatorProps.onFocus && activatorProps.onFocus();
                setIsFocused(true);
              }}
              onKeyUp={event => {
                if (
                  inputProps.showIcon === false &&
                  event.key === "ArrowDown"
                ) {
                  activatorProps.onClick?.();
                }
              }}
              actionsRef={formFieldActionsRef}
              suffix={suffix}
            />
          </div>
        );
      }}
    />
  );
}
import type { ForwardedRef } from "react";
import React, { forwardRef } from "react";
import { InputDate as InputDateLegacy } from "./InputDate";
import { InputDateRebuilt } from "./InputDate.rebuilt";
import type {
  InputDateProps as InputDateLegacyProps,
  InputDateRebuiltProps,
} from "./InputDate.types";

export type InputDateProps = InputDateLegacyProps | InputDateRebuiltProps;

function isNewInputDateProps(
  props: InputDateProps,
): props is InputDateRebuiltProps {
  return props.version === 2;
}

export const InputDate = forwardRef(function InputDateShim(
  props: InputDateProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  if (isNewInputDateProps(props)) {
    return <InputDateRebuilt {...props} ref={ref} />;
  } else {
    return <InputDateLegacy {...props} />;
  }
});

```

## Props

### Web Props

| Prop                             | Type                       | Required | Default  | Description                                             |
| -------------------------------- | -------------------------- | -------- | -------- | ------------------------------------------------------- |
| `value`                          | `Date`                     | ❌       | `_none_` | A Date object value                                     |
| (e.g., `new Date("11/11/2011")`) |
| `onChange`                       | `(newValue: Date) => void` | ✅       | `_none_` | onChange handler that provides the new value (or event) |
| `maxDate`                        | `Date`                     | ❌       | `_none_` | The maximum selectable date.                            |
| `minDate`                        | `Date`                     | ❌       | `_none_` | The minimum selectable date.                            |
| `showIcon`                       | `boolean`                  | ❌       | `true`   | Whether to show the calendar icon                       |
| `emptyValueLabel`                | `string`                   | ❌       | `_none_` | Text to display instead of a date value                 |
| `restoreLastValueOnBlur`         | `boolean`                  | ❌       | `false`  | Experimental:                                           |

Whether to replace empty/invalid values with the original value on blur.

This solves an immediate UX problem and is likely to change in the future. It
prevents the input from retaining empty/invalid values when the user tabs into
it, clears the value, and tabs away. In this scenario, the original value will
be restored. | | `id` | `string` | ❌ | `_none_` | A unique identifier for the
input. | | `align` | `"center" | "right"` | ❌ | `_none_` | Determines the
alignment of the text inside the input. | | `description` | `ReactNode` | ❌ |
`_none_` | Further description of the input, can be used for a hint. | |
`disabled` | `boolean` | ❌ | `_none_` | Disable the input | | `showMiniLabel` |
`boolean` | ❌ | `true` | Controls the visibility of the mini label that appears
inside the input when a value is entered. By default, the placeholder text moves
up to become a mini label. Set to false to disable this behavior. | | `invalid`
| `boolean` | ❌ | `_none_` | Highlights the field red to indicate an error. | |
`inline` | `boolean` | ❌ | `_none_` | Adjusts the form field to go inline with
a content. This also silences the given `validations` prop. You'd have to used
the `onValidate` prop to capture the message and render it somewhere else using
the `InputValidation` component. | | `loading` | `boolean` | ❌ | `_none_` |
Show a spinner to indicate loading | | `name` | `string` | ❌ | `_none_` | Name
of the input. | | `onValidation` | `(message: string) => void` | ❌ | `_none_` |
Callback to get the the status and message when validating a field @param
message | | `placeholder` | `string` | ❌ | `_none_` | Text that appears inside
the input when empty and floats above the value as a mini label once the user
enters a value. When showMiniLabel is false, this text only serves as a standard
placeholder and disappears when the user types. | | `size` | `"small" | "large"`
| ❌ | `_none_` | Adjusts the interface to either have small or large spacing. |
| `version` | `1` | ❌ | `_none_` | Experimental: Determine which version of the
FormField to use. Right now this isn't used but it will be used in the future to
allow us to release new versions of our form inputs without breaking existing
functionality. | | `readonly` | `boolean` | ❌ | `_none_` | Prevents users from
editing the value. | | `onEnter` | `(event: React.KeyboardEvent) => void` | ❌ |
`_none_` | A callback to handle "Enter" keypress. This will only run if Enter is
the only key. Will not run if Shift or Control are being held. | | `onFocus` |
`(event?: React.FocusEvent) => void` | ❌ | `_none_` | Focus callback. | |
`inputRef` |
`RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>` | ❌ |
`_none_` | _No description_ | | `validations` | `RegisterOptions` | ❌ |
`_none_` | Show an error message above the field. This also highlights the the
field red if an error message shows up. | | `onBlur` |
`(event?: React.FocusEvent) => void` | ❌ | `_none_` | Blur callback. |

### Mobile Props

| Prop   | Type     | Required | Default  | Description                                                             |
| ------ | -------- | -------- | -------- | ----------------------------------------------------------------------- |
| `name` | `string` | ❌       | `_none_` | Adding a `name` would make this component "Form controlled" and must be |

nested within a `<Form />` component.

Cannot be declared if `value` prop is used. | | `validations` |
`Omit<Partial<{ required: string | ValidationRule<boolean>; min: ValidationRule<string | number>; max: ValidationRule<string | number>; ... 12 more ...; deps: string | string[]; }>, "disabled" | ... 2 more ... | "setValueAs">`
| ❌ | `_none_` | Shows an error message below the field and highlights it red
when the value is invalid. Only applies when nested within a `<Form />`
component.

You can see **most** of the rules you can pass in
[React-hook-form Documentation](https://react-hook-form.com/api/useform/register#options).
| | `defaultValue` | `Date` | ❌ | `_none_` | The initial value for the input. |
| `value` | `string | Date` | ❌ | `_none_` | The value shown on the field. This
gets automatically formatted to the account's date format.

Cannot be declared if `name` prop is used. | | `onChange` |
`((value?: Date) => void) | ((value?: Date) => void)` | ❌ | `_none_` | The
callback that fires whenever a date gets selected. | | `clearable` |
`"never" | "always"` | ❌ | `_none_` | Defaulted to "always" so user can clear
the dates whenever there's a value. | | `emptyValueLabel` | `string` | ❌ |
`_none_` | This label is shown to the user when there's no selected date. | |
`maxDate` | `Date` | ❌ | `_none_` | Maximum date the user can set. | |
`minDate` | `Date` | ❌ | `_none_` | Minimum date the user can set | |
`accessibilityLabel` | `string` | ❌ | `_none_` | VoiceOver will read this
string when a user selects the element | | `accessibilityHint` | `string` | ❌ |
`_none_` | Helps users understand what will happen when they perform an action |
| `invalid` | `string | boolean` | ❌ | `_none_` | Highlights the field red and
shows message below (if string) to indicate an error | | `disabled` | `boolean`
| ❌ | `_none_` | Disable the input | | `placeholder` | `string` | ❌ | `_none_`
| Hint text that goes above the value once the field is filled out |

## Categories

- Forms & Inputs

## Web Test Code

```typescript
InputDate Datepicker Datetime Picker Calendar Web React Test Testing Jest /* eslint-disable max-statements */
import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { InputDate } from ".";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { Text } from "../Text";
import * as atlantisContext from "../AtlantisContext/AtlantisContext";

describe("InputDate V2", () => {
  it("renders a blank form by default", () => {
    render(<InputDate version={2} onChange={jest.fn()} />);
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
    expect(screen.queryByText("15")).not.toBeInTheDocument();
  });

  it("fires onChange with the new value when you click a date", () => {
    const date = "11/11/2011";
    const newDate = "11/15/2011";
    const changeHandler = jest.fn();
    render(
      <InputDate version={2} value={new Date(date)} onChange={changeHandler} />,
    );
    const calendarButton = screen.getByRole("button");

    fireEvent.click(calendarButton);

    const selectDate = screen.getByText("15");
    fireEvent.click(selectDate);
    expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
  });

  it("shouldn't call onChange with the new value when you click a disabled date", () => {
    const date = "11/11/2011";
    const minDate = "11/9/2011";
    const maxDate = "11/15/2011";
    const changeHandler = jest.fn();
    render(
      <InputDate
        version={2}
        minDate={new Date(minDate)}
        maxDate={new Date(maxDate)}
        value={new Date(date)}
        onChange={changeHandler}
      />,
    );
    const calendarButton = screen.getByRole("button");
    fireEvent.click(calendarButton);

    const selectDate1 = screen.getByText("7");
    fireEvent.click(selectDate1);
    const selectDate2 = screen.getByText("17");
    fireEvent.click(selectDate2);
    expect(changeHandler).not.toHaveBeenCalled();
  });

  it("fires onChange with the new value when you type a different date", () => {
    const date = "11/11/2011";
    const newDate = "11/15/2011";
    const placeholder = "placeholder";
    const changeHandler = jest.fn();
    render(
      <InputDate
        version={2}
        value={new Date(date)}
        onChange={changeHandler}
        placeholder={placeholder}
      />,
    );

    fireEvent.change(screen.getByLabelText(placeholder), {
      target: { value: newDate },
    });
    expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
  });

  it("updates the value of the field when the value prop changes", () => {
    const date = "11/11/2011";
    const newDate = "11/15/2011";
    const changeHandler = jest.fn();
    const { rerender } = render(
      <InputDate
        version={2}
        value={new Date(date)}
        onChange={changeHandler}
        placeholder="Test"
      />,
    );

    expect(screen.getByDisplayValue(date)).toBeInTheDocument();

    rerender(
      <InputDate
        version={2}
        value={new Date(newDate)}
        onChange={changeHandler}
      />,
    );

    expect(screen.queryByDisplayValue(date)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(newDate)).toBeInTheDocument();
  });

  it("returns the correct date object when long formatted date is supplied", () => {
    const date = "11/11/2011";
    const newDate = "November 15, 2011";
    const changeHandler = jest.fn();
    render(
      <InputDate version={2} value={new Date(date)} onChange={changeHandler} />,
    );
    expect(screen.getByDisplayValue(date)).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue(date), {
      target: { value: newDate },
    });

    expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
  });

  it("doesn't fire onChange when the new value is invalid", async () => {
    const date = "11/11/2011";
    const badInput = "bad input";
    const changeHandler = jest.fn();
    const placeholder = "placeholder";
    render(
      <InputDate
        version={2}
        placeholder={placeholder}
        value={new Date(date)}
        onChange={changeHandler}
      />,
    );

    expect(screen.getByDisplayValue(date)).toBeInTheDocument();

    const form = screen.getByDisplayValue(date);
    fireEvent.focus(form);

    fireEvent.change(screen.getByLabelText(placeholder), {
      target: { value: badInput },
    });
    expect(changeHandler).toHaveBeenCalledTimes(0);
  });

  it("doesn't display the calendar when input is focused with keyboard", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(
      <InputDate version={2} value={new Date(date)} onChange={changeHandler} />,
    );
    const input = screen.getByDisplayValue(date);

    fireEvent.focus(input);

    expect(screen.queryByText("15")).not.toBeInTheDocument();
  });

  it("doesn't display the calendar when calendar button is focused with keyboard", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(
      <InputDate version={2} value={new Date(date)} onChange={changeHandler} />,
    );
    const calendarButton = screen.getByRole("button");

    fireEvent.focus(calendarButton);

    expect(screen.queryByText("15")).not.toBeInTheDocument();
  });

  it("displays the calendar when button is pressed", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(
      <InputDate version={2} value={new Date(date)} onChange={changeHandler} />,
    );
    const calendarButton = screen.getByRole("button");

    fireEvent.click(calendarButton);

    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("displays the calendar when input is focused with a click", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(
      <InputDate version={2} value={new Date(date)} onChange={changeHandler} />,
    );
    const input = screen.getByDisplayValue(date);

    fireEvent.click(input);

    expect(screen.getByText("15")).toBeInTheDocument();
  });

  describe("when InputDate is used within a Modal", () => {
    it("should close only the open picker when the escape key is pressed", async () => {
      const date = "11/11/2011";
      render(<NestedTestComponent date={date} />);
      const button = screen.getByRole("button");
      fireEvent.click(button);

      const input = screen.getByDisplayValue(date);
      fireEvent.click(input);

      expect(screen.getByText("15")).toBeInTheDocument();
      fireEvent.keyDown(input, { key: "Escape" });

      expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
      expect(screen.queryByText("15")).not.toBeInTheDocument();
    });
  });

  describe("dateFormat pattern", () => {
    afterEach(() => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockRestore();
    });

    it("should display MM/DD/YYYY when dateFormat is 'P'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "P",
      });
      const expectedDate = "05/24/2023";
      const date = new Date(2023, 4, 24).toISOString();
      const changeHandler = jest.fn();
      render(
        <InputDate
          version={2}
          value={new Date(date)}
          onChange={changeHandler}
        />,
      );
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });

    it("should display mmmm d, yyyy when dateFormat is 'PP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PP",
      });
      const expectedDate = "Feb 20, 2023";
      const date = new Date(2023, 1, 20).toISOString();
      const changeHandler = jest.fn();
      render(
        <InputDate
          version={2}
          value={new Date(date)}
          onChange={changeHandler}
        />,
      );
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });

    it("should display mmmmm d, yyyy when dateFormat is 'PPP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PPP",
      });
      const expectedDate = "July 7th, 2023";
      const date = new Date(2023, 6, 7).toISOString();
      const changeHandler = jest.fn();
      render(
        <InputDate
          version={2}
          value={new Date(date)}
          onChange={changeHandler}
        />,
      );
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });

    it("should display dddd, mmmmm d, yyyy when dateFormat is 'PPPP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PPPP",
      });
      const expectedDate = "Thursday, June 22nd, 2023";
      const date = new Date(2023, 5, 22).toISOString();
      const changeHandler = jest.fn();
      render(
        <InputDate
          version={2}
          value={new Date(date)}
          onChange={changeHandler}
        />,
      );
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });
  });

  describe("showIcon prop", () => {
    it("should display the calendar icon when set to true", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(
        <InputDate
          version={2}
          value={new Date(date)}
          onChange={changeHandler}
          showIcon={true}
        />,
      );
      expect(screen.getByRole("button")).toBeDefined();
    });

    it("should display the calendar icon when set to undefined", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(
        <InputDate
          version={2}
          value={new Date(date)}
          onChange={changeHandler}
        />,
      );
      expect(screen.getByRole("button")).toBeDefined();
    });

    it("should not display the calendar icon when set to false", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(
        <InputDate
          version={2}
          value={new Date(date)}
          onChange={changeHandler}
          showIcon={false}
        />,
      );
      expect(screen.queryByRole("button")).toBeNull();
    });

    it("should show mini calendar when set to false and down arrow is pressed", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(
        <InputDate
          version={2}
          value={new Date(date)}
          onChange={changeHandler}
          showIcon={false}
        />,
      );
      const input = screen.getByDisplayValue(date);
      fireEvent.keyDown(input, { key: "ArrowDown" });

      expect(screen.getByText("15")).toBeInTheDocument();
    });
  });

  it("should display the selected date when emptyValueLabel is undefined", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(
      <InputDate version={2} value={new Date(date)} onChange={changeHandler} />,
    );

    expect(screen.queryByDisplayValue(date)).toBeInTheDocument();
  });

  it("should display emptyValueLabel when set", () => {
    const changeHandler = jest.fn();
    const expectedDisplayValue = "Unscheduled";
    render(
      <InputDate
        version={2}
        onChange={changeHandler}
        emptyValueLabel={expectedDisplayValue}
      />,
    );

    expect(
      screen.queryByDisplayValue(expectedDisplayValue),
    ).toBeInTheDocument();
  });

  function NestedTestComponent(props: { readonly date: string }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const changeHandler = jest.fn();

    return (
      <div>
        <Modal open={isOpen}>
          <Text>Test Modal Content</Text>
          <InputDate
            value={new Date(props.date)}
            version={2}
            onChange={changeHandler}
          />
        </Modal>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          label={isOpen ? "Close" : "Open"}
        />
      </div>
    );
  }
});
/* eslint-disable max-statements */
import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { InputDateProps } from ".";
import { InputDate } from ".";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { Text } from "../Text";
import * as atlantisContext from "../AtlantisContext/AtlantisContext";

describe("InputDate V1", () => {
  it("renders a blank form by default", () => {
    render(<InputDate onChange={jest.fn()} />);
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
    expect(screen.queryByText("15")).not.toBeInTheDocument();
  });

  it("fires onChange with the new value when you click a date", () => {
    const date = "11/11/2011";
    const newDate = "11/15/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    const calendarButton = screen.getByRole("button");

    fireEvent.click(calendarButton);

    const selectDate = screen.getByText("15");
    fireEvent.click(selectDate);
    expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
  });

  it("shouldn't call onChange with the new value when you click a disabled date", () => {
    const date = "11/11/2011";
    const minDate = "11/9/2011";
    const maxDate = "11/15/2011";
    const changeHandler = jest.fn();
    render(
      <InputDate
        minDate={new Date(minDate)}
        maxDate={new Date(maxDate)}
        value={new Date(date)}
        onChange={changeHandler}
      />,
    );
    const calendarButton = screen.getByRole("button");
    fireEvent.click(calendarButton);

    const selectDate1 = screen.getByText("7");
    fireEvent.click(selectDate1);
    const selectDate2 = screen.getByText("17");
    fireEvent.click(selectDate2);
    expect(changeHandler).not.toHaveBeenCalled();
  });

  it("fires onChange with the new value when you type a different date", () => {
    const date = "11/11/2011";
    const newDate = "11/15/2011";
    const placeholder = "placeholder";
    const changeHandler = jest.fn();
    render(
      <InputDate
        value={new Date(date)}
        onChange={changeHandler}
        placeholder={placeholder}
      />,
    );

    fireEvent.change(screen.getByLabelText(placeholder), {
      target: { value: newDate },
    });
    expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
  });

  it("updates the value of the field when the value prop changes", () => {
    const date = "11/11/2011";
    const newDate = "11/15/2011";
    const changeHandler = jest.fn();
    const { rerender } = render(
      <InputDate value={new Date(date)} onChange={changeHandler} />,
    );
    expect(screen.queryByDisplayValue(date)).toBeInTheDocument();

    rerender(<InputDate value={new Date(newDate)} onChange={changeHandler} />);

    expect(screen.queryByDisplayValue(date)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(newDate)).toBeInTheDocument();
  });

  it("returns the correct date object when long formatted date is supplied", () => {
    const date = "11/11/2011";
    const newDate = "November 15, 2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    expect(screen.getByDisplayValue(date)).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue(date), {
      target: { value: newDate },
    });

    expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
  });

  it("doesn't fire onChange when the new value is invalid", async () => {
    const date = "11/11/2011";
    const badInput = "bad input";
    const changeHandler = jest.fn();
    const placeholder = "placeholder";
    render(
      <InputDate
        placeholder={placeholder}
        value={new Date(date)}
        onChange={changeHandler}
      />,
    );

    expect(screen.getByDisplayValue(date)).toBeInTheDocument();

    const form = screen.getByDisplayValue(date);
    fireEvent.focus(form);

    fireEvent.change(screen.getByLabelText(placeholder), {
      target: { value: badInput },
    });
    expect(changeHandler).toHaveBeenCalledTimes(0);
  });

  it("doesn't display the calendar when input is focused with keyboard", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    const input = screen.getByDisplayValue(date);

    fireEvent.focus(input);

    expect(screen.queryByText("15")).not.toBeInTheDocument();
  });

  it("doesn't display the calendar when calendar button is focused with keyboard", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    const calendarButton = screen.getByRole("button");

    fireEvent.focus(calendarButton);

    expect(screen.queryByText("15")).not.toBeInTheDocument();
  });

  it("displays the calendar when button is pressed", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    const calendarButton = screen.getByRole("button");

    fireEvent.click(calendarButton);

    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("displays the calendar when input is focused with a click", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);
    const input = screen.getByDisplayValue(date);

    fireEvent.click(input);

    expect(screen.getByText("15")).toBeInTheDocument();
  });

  describe("when InputDate is used within a Modal", () => {
    it("should close only the open picker when the escape key is pressed", async () => {
      const date = "11/11/2011";
      render(<NestedTestComponent date={date} />);
      const button = screen.getByRole("button");
      fireEvent.click(button);

      const input = screen.getByDisplayValue(date);
      fireEvent.click(input);

      expect(screen.getByText("15")).toBeInTheDocument();
      fireEvent.keyDown(input, { key: "Escape" });

      expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
      expect(screen.queryByText("15")).not.toBeInTheDocument();
    });
  });

  describe("dateFormat pattern", () => {
    afterEach(() => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockRestore();
    });

    it("should display MM/DD/YYYY when dateFormat is 'P'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "P",
      });
      const expectedDate = "05/24/2023";
      const date = new Date(2023, 4, 24).toISOString();
      const changeHandler = jest.fn();
      render(<InputDate value={new Date(date)} onChange={changeHandler} />);
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });

    it("should display mmmm d, yyyy when dateFormat is 'PP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PP",
      });
      const expectedDate = "Feb 20, 2023";
      const date = new Date(2023, 1, 20).toISOString();
      const changeHandler = jest.fn();
      render(<InputDate value={new Date(date)} onChange={changeHandler} />);
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });

    it("should display mmmmm d, yyyy when dateFormat is 'PPP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PPP",
      });
      const expectedDate = "July 7th, 2023";
      const date = new Date(2023, 6, 7).toISOString();
      const changeHandler = jest.fn();
      render(<InputDate value={new Date(date)} onChange={changeHandler} />);
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });

    it("should display dddd, mmmmm d, yyyy when dateFormat is 'PPPP'", () => {
      jest.spyOn(atlantisContext, "useAtlantisContext").mockReturnValue({
        ...atlantisContext.atlantisContextDefaultValues,
        dateFormat: "PPPP",
      });
      const expectedDate = "Thursday, June 22nd, 2023";
      const date = new Date(2023, 5, 22).toISOString();
      const changeHandler = jest.fn();
      render(<InputDate value={new Date(date)} onChange={changeHandler} />);
      expect(screen.queryByDisplayValue(expectedDate)).toBeInTheDocument();
    });
  });

  describe("showIcon prop", () => {
    it("should display the calendar icon when set to true", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(
        <InputDate
          value={new Date(date)}
          onChange={changeHandler}
          showIcon={true}
        />,
      );
      expect(screen.getByRole("button")).toBeDefined();
    });

    it("should display the calendar icon when set to undefined", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(<InputDate value={new Date(date)} onChange={changeHandler} />);
      expect(screen.getByRole("button")).toBeDefined();
    });

    it("should not display the calendar icon when set to false", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(
        <InputDate
          value={new Date(date)}
          onChange={changeHandler}
          showIcon={false}
        />,
      );
      expect(screen.queryByRole("button")).toBeNull();
    });

    it("should show mini calendar when set to false and down arrow is pressed", () => {
      const date = "11/11/2011";
      const changeHandler = jest.fn();
      render(
        <InputDate
          value={new Date(date)}
          onChange={changeHandler}
          showIcon={false}
        />,
      );
      const input = screen.getByDisplayValue(date);

      fireEvent.keyUp(input, { key: "ArrowDown" });

      expect(screen.getByText("15")).toBeInTheDocument();
    });
  });

  it("should display the selected date when emptyValueLabel is undefined", () => {
    const date = "11/11/2011";
    const changeHandler = jest.fn();
    render(<InputDate value={new Date(date)} onChange={changeHandler} />);

    expect(screen.queryByDisplayValue(date)).toBeInTheDocument();
  });

  it("should display emptyValueLabel when set", () => {
    const changeHandler = jest.fn();
    const expectedDisplayValue = "Unscheduled";
    render(
      <InputDate
        onChange={changeHandler}
        emptyValueLabel={expectedDisplayValue}
      />,
    );

    expect(
      screen.queryByDisplayValue(expectedDisplayValue),
    ).toBeInTheDocument();
  });

  function NestedTestComponent(props: { readonly date: string }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const changeHandler = jest.fn();

    return (
      <div>
        <Modal open={isOpen}>
          <Text>Test Modal Content</Text>
          <InputDate value={new Date(props.date)} onChange={changeHandler} />
        </Modal>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          label={isOpen ? "Close" : "Open"}
        />
      </div>
    );
  }

  function InputDateWithStateTest(
    props: {
      readonly initialValue: string;
    } & Partial<InputDateProps>,
  ): JSX.Element {
    const [date, setDate] = useState(new Date(props.initialValue));

    return (
      <InputDate
        {...props}
        value={date}
        onChange={d => {
          // Skips empty date values: this scenario expects the input to always be valid
          if (!d) return;
          setDate(d);
        }}
      />
    );
  }

  describe("when restoreLastValueOnBlur is true", () => {
    it("restores the last value when the input is empty", async () => {
      const originalValue = "11/11/2011";
      const placeholder = "placeholder";
      render(
        <>
          <textarea data-testid="textarea" />
          <InputDateWithStateTest
            restoreLastValueOnBlur
            initialValue={originalValue}
            placeholder={placeholder}
          />
        </>,
      );

      const textarea = screen.getByTestId("textarea");
      const input = screen.getByLabelText(placeholder);

      // Focus an element, tab to the input and clear the value, then blur the input
      await userEvent.click(textarea);
      await userEvent.tab();
      await userEvent.clear(input);
      await userEvent.type(input, "what");
      await userEvent.tab({
        shift: true,
      });

      expect(input).toHaveValue(originalValue);
    });

    it("restores the last value when the input contains an invalid date", async () => {
      const originalValue = "11/11/2011";
      const placeholder = "placeholder";
      render(
        <>
          <textarea data-testid="textarea" />
          <InputDateWithStateTest
            restoreLastValueOnBlur
            initialValue={originalValue}
            placeholder={placeholder}
          />
        </>,
      );

      const textarea = screen.getByTestId("textarea");
      const input = screen.getByLabelText(placeholder);

      // Focus an element, tab to the input and enter an invalid date, then blur the input
      await userEvent.click(textarea);
      await userEvent.tab();
      await userEvent.type(input, "invalidtext");
      await userEvent.tab({
        shift: true,
      });

      expect(input).toHaveValue(originalValue);
    });
  });
});

```

## Component Path

`/components/InputDate`

---

_Generated on 2025-08-21T17:35:16.364Z_
