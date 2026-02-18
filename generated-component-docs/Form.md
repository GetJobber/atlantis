# Form

# Form

The Form component is a wrapper component that handles the submission and
validation of forms.

For more information about `validations` using any of the Input components, see
the
[InputText](../?path=/docs/components-forms-and-inputs-inputtext--docs#validation-message)
documentation.

## Design & usages guidelines

The Form component has a lot of built-in features which rely on its internal
state. To take advantage of these features, do not bypass the Form's internal
state — the fields or inputs within the Form must have a `name` prop and **NOT**
have a `value` and `onChange` prop.

## Content guidelines

### Inputs

Form can accept various inputs and selection elements such as (but not limited
to) [InputText](/components/InputText), [Select](/components/Select),
[Switch](/components/Switch), [Checkbox](/components/Checkbox), and
[Chips](/components/Chips). They should be placed [Cards](/components/Card) to
indicate grouping when relevant, and groups of Cards can be spaced appropriately
using ContentSection.

### Save Button label

The `saveButtonLabel` property defaults to "Save", but should be made more
verbose to add context for the user. Use the format "Save \{object\}", such as
"Save Job". This helps clarify to the user that tapping the Save Button is not
saving the single input they are editing, but the entire object.

### Form errors

All error messaging should follow our
[Product Vocabulary.](/content/product-vocabulary)

## Accessibility (mobile)

The individual inputs are responsible for accessibility concerns such as the
labels, types, values, and error messages of each input.

## Web Component Code

```tsx
Form  Web React import type { ReactNode, Ref } from "react";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface FormRef {
  submit(): void;
}

export interface FormProps {
  readonly children: ReactNode;
  /**
   * Callback for when the form has been sucessfully
   * submitted.
   */
  onSubmit?(): void;

  onStateChange?(formState: { isDirty: boolean; isValid: boolean }): void;
}

export const Form = forwardRef(function InternalForm(
  { onSubmit, children, onStateChange }: FormProps,
  ref: Ref<FormRef>,
) {
  const methods = useForm({
    mode: "onTouched",
  });

  const {
    trigger,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  useEffect(
    () => onStateChange && onStateChange({ isDirty, isValid }),
    [isDirty, isValid],
  );

  useImperativeHandle(ref, () => ({
    /**
     * The `trigger()` method can also accept an array
     * of fields to validate. We may at some point want
     * to consider adding a `validate()` method to the
     * `Form` component.
     */
    submit: async () => {
      const valid = await trigger(undefined, { shouldFocus: true });

      if (valid) {
        submitHandler();
      }
    },
  }));

  /**
   * If an onSubmit is not passed into a form, it will only be used
   * for validation. For that, we do not need to wrap it in a <form>
   * tag. This allows the <Form> component to be used in legacy code.
   */
  const Wrapper = onSubmit ? "form" : "div";

  const formProps = {
    onSubmit: onSubmit && handleSubmit(submitHandler),
  };

  return (
    <FormProvider {...methods}>
      <Wrapper {...formProps} data-testid="atlantis-form">
        {children}
      </Wrapper>
    </FormProvider>
  );

  function submitHandler() {
    onSubmit && onSubmit();
  }
});

```

## Props

### Web Props

| Prop            | Type                                                           | Required | Default  | Description                                     |
| --------------- | -------------------------------------------------------------- | -------- | -------- | ----------------------------------------------- |
| `onSubmit`      | `() => void`                                                   | ❌       | `_none_` | Callback for when the form has been sucessfully |
| submitted.      |
| `onStateChange` | `(formState: { isDirty: boolean; isValid: boolean; }) => void` | ❌       | `_none_` | _No description_                                |
| `ref`           | `LegacyRef<FormRef>`                                           | ❌       | `_none_` | Allows getting a ref to the component instance. |

Once the component unmounts, React will set `ref.current` to `null` (or call the
ref with `null` if you passed a callback ref). @see {@link
https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React
Docs} | | `key` | `Key` | ❌ | `_none_` | _No description_ |

### Mobile Props

| Prop             | Type                                               | Required | Default  | Description                                                                                                             |
| ---------------- | -------------------------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `children`       | `ReactNode`                                        | ✅       | `_none_` | Content to be passed into the form                                                                                      |
| `onBeforeSubmit` | `(data: UnpackNestedValue<T>) => Promise<boolean>` | ❌       | `_none_` | A callback function that is run before invoking onSubmit. Form submission is canceled if the promise resolves to false. |
| `onSubmit`       | `(data: UnpackNestedValue<T>) => Promise<S>`       | ✅       | `_none_` | A callback function that handles the submission of form data.                                                           |

If an error occurs during submission, it should not be caught and handled
silently; the error must be thrown again. If the submission is successful and no
error is thrown, the `onSubmitSuccess` callback will be called. If an error is
thrown, the `onSubmitError` callback will be called. | | `onSubmitError` |
`(error: FormErrors) => void` | ✅ | `_none_` | A callback function that handles
any error that occurs during "onSubmit" | | `onSubmitSuccess` |
`(data: S) => void` | ✅ | `_none_` | A callback function that handles a
successful form submission from "onSubmit" | | `bannerErrors` |
`FormBannerErrors` | ❌ | `_none_` | Network or user errors to be displayed as a
banner at the top of the form | | `bannerMessages` | `FormBannerMessage[]` | ❌
| `_none_` | Status messages to be displayed as a banner at the top of the form
| | `initialLoading` | `boolean` | ❌ | `_none_` | Loading when the initial form
data is being fetched | | `initialValues` |
`(Date & FieldValues) | (FileList & FieldValues) | (File & FieldValues) | { [x: string]: any; } | ((Date | Blob | FileList | File) & FileList & FieldValues) | { ...; } | (object & FieldValues) | ((Date | ... 2 more ... | File) & { ...; }) | { ...; }`
| ❌ | `_none_` | The initial values of the form inputs This should be available
as soon as initialLoading is set to false | | `mode` | `keyof ValidationMode` |
❌ | `_none_` | When the validation should happen. Possible values are "onBlur",
"onChange", "onSubmit", "onTouched", and "all". The default value is "onTouched"
| | `reValidateMode` | `"onBlur" | "onChange" | "onSubmit"` | ❌ | `_none_` |
When the validation after submission should happen. Possible values are
"onBlur", "onChange", and "onSubmit". The default value is "onChange" | |
`formRef` |
`MutableRefObject<UseFormReturn<T> & { scrollViewRef?: RefObject<KeyboardAwareScrollView>; saveButtonHeight?: number; messageBannerHeight?: number; }>`
| ❌ | `_none_` | ref object to access react hook form methods and state | |
`saveButtonLabel` | `string` | ❌ | `_none_` | Label to be displayed for the
save button | | `renderStickySection` |
`(onSubmit: () => void, label: string, isSubmitting: boolean) => Element` | ❌ |
`_none_` | @deprecated use `secondaryAction` instead. Override default save
button in the sticky section of the form with another element. | |
`localCacheKey` | `string` | ❌ | `_none_` | Adding a key will save a local copy
of the form data that will be used to recover values when the app is
backgrounded or has crashed. | | `localCacheExclude` | `string[]` | ❌ |
`_none_` | Forms field names that will not be considered for caching. Useful for
omitting sensitive data. | | `localCacheId` | `string | string[]` | ❌ |
`_none_` | A string or array of strings that can be used to identify the
pre-filled data on the form. This can be used to support local caching for forms
that prefill data without inadvertently applying the cache at the wrong time.

For example this can be used to when an object is based on data from another
object (Quote being converted into a Job). This will allow the user to retrieve
data from the cache when trying to create the same object (same Quote being
converted into a Job) following an app crash.

There is still only one copy of data for each `localCacheKey`. If a user opens
the same form the data will only be loaded if the `localCacheId` matches | |
`secondaryActions` | `SecondaryActionProp[]` | ❌ | `_none_` | Secondary Action
for ButtonGroup | | `saveButtonOffset` | `number` | ❌ | `_none_` | A number
that will pull down the save button when the position is sticky. Useful when
there's a footer or content below the form that is pulling the button up. | |
`showStickySaveButton` | `boolean` | ❌ | `_none_` | Forces to render the sticky
save button instead of the inline. The sticky save button is default for iOS but
not for Android due to limitations. Use this prop with caution on Android. | |
`renderFooter` | `ReactNode` | ❌ | `_none_` | Renders a footer below the save
button. |

## Categories

- Forms & Inputs

## Web Test Code

```typescript
Form  Web React Test Testing Jest import type { MutableRefObject } from "react";
import React, { useRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { useFormState } from "@jobber/hooks/useFormState";
import { userEvent } from "@testing-library/user-event";
import type { FormRef } from ".";
import { Form } from ".";
import { InputText } from "../InputText";
import { Text } from "../Text";

it("calls the submit handler if the form is valid", async () => {
  const submitHandler = jest.fn();
  const { getByText, getByLabelText } = render(
    <MockForm onSubmit={submitHandler} />,
  );

  const input = getByLabelText("test form");
  const inputTwo = getByLabelText("test input");
  await userEvent.type(input, "hello");
  await userEvent.type(inputTwo, "hello");
  await userEvent.click(getByText("submit"));

  await waitFor(() => expect(submitHandler).toHaveBeenCalledTimes(1));
});

it("does not call the submit handler if the form is invalid", async () => {
  const submitHandler = jest.fn();
  const { getByText } = render(<MockForm onSubmit={submitHandler} />);

  await userEvent.click(getByText("submit"));

  await waitFor(() => expect(submitHandler).not.toHaveBeenCalled());
});

it("renders an error message when field is invalid", async () => {
  const submitHandler = jest.fn();
  const { getByText } = render(<MockForm onSubmit={submitHandler} />);

  await userEvent.click(getByText("submit"));

  await waitFor(() =>
    expect(getByText("validation error")).toBeInstanceOf(HTMLParagraphElement),
  );
});

it("fires onStateChange when component renders", async () => {
  const stateChangeHandler = jest.fn();
  render(<MockForm onSubmit={jest.fn()} onStateChange={stateChangeHandler} />);

  await waitFor(() => {
    expect(stateChangeHandler).toHaveBeenCalled();
    expect(stateChangeHandler).toHaveBeenCalledWith({
      isDirty: false,
      isValid: false,
    });
  });
});

it("onStateChange updates state when form is valid", async () => {
  const stateChangeHandler = jest.fn();
  const { getByLabelText } = render(
    <MockForm onSubmit={jest.fn()} onStateChange={stateChangeHandler} />,
  );

  const input = getByLabelText("test form");
  await userEvent.type(input, "Bo");
  await userEvent.tab();

  await waitFor(() => {
    expect(stateChangeHandler).toHaveBeenCalledWith({
      isDirty: true,
      isValid: false,
    });
  });
});

it("initializes useFormState with proper state", async () => {
  const { getByText } = render(<MockFormWithState />);
  await waitFor(() => {
    expect(getByText("Dirty: false")).not.toBeNull();
    expect(getByText("Valid: false")).not.toBeNull();
  });
});

it("updates state with useFormState to proper state", async () => {
  const { getByText, getByLabelText } = render(<MockFormWithState />);

  await waitFor(() => {
    expect(getByText("Dirty: false")).not.toBeNull();
    expect(getByText("Valid: false")).not.toBeNull();
  });

  const input = getByLabelText("gimme a name");
  await userEvent.type(input, "Bob");
  await userEvent.tab();

  await waitFor(() => {
    expect(getByText("Dirty: true")).not.toBeNull();
    expect(getByText("Valid: false")).not.toBeNull();
  });
  await userEvent.clear(input);
  await userEvent.type(input, "Bobbert");
  await userEvent.tab();

  await waitFor(() => {
    expect(getByText("Dirty: true")).not.toBeNull();
    expect(getByText("Valid: true")).not.toBeNull();
  });
});

it("wraps the form in a form tag when the onSubmit is set", () => {
  const { getByTestId } = render(<Form onSubmit={jest.fn()}>Foo</Form>);
  expect(getByTestId("atlantis-form")).toBeInstanceOf(HTMLFormElement);
});

it("wraps the form in a div tag when the onSubmit is not set", () => {
  const { getByTestId } = render(<Form>Foo</Form>);
  expect(getByTestId("atlantis-form")).toBeInstanceOf(HTMLDivElement);
});

it("submit method can be used to successfully submit the form", async () => {
  const submitHandler = jest.fn();
  const { getByText, getByLabelText } = render(
    <MockFormValidate onSubmit={submitHandler} />,
  );

  const input = getByLabelText("test form");
  await userEvent.type(input, "Bo");
  await userEvent.click(getByText("submit"));

  await waitFor(() => {
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });
});

it("submit method can be used to trigger validation from outside the form", async () => {
  const submitHandler = jest.fn();
  const { getByText } = render(<MockFormValidate onSubmit={submitHandler} />);

  await userEvent.click(getByText("submit"));

  await waitFor(() => {
    expect(getByText("validation error")).not.toBeNull();
    expect(getByText("validation error")).toBeInstanceOf(HTMLParagraphElement);
  });
});

it("should focus on the first errored field", async () => {
  const { getByLabelText, getByText } = render(
    <MockForm onSubmit={jest.fn()} />,
  );

  const input = getByLabelText("test form");
  const inputTwo = getByLabelText("test input");

  await userEvent.click(inputTwo);
  await waitFor(() => {
    expect(inputTwo).toHaveFocus();
  });

  await userEvent.click(getByText("submit"));

  await waitFor(() => {
    expect(input).toHaveFocus();
  });

  await userEvent.type(input, "hello");
  await userEvent.click(getByText("submit"));

  await waitFor(() => {
    expect(inputTwo).toHaveFocus();
  });
});

interface MockFormValidateProps {
  onSubmit(): void;
  onStateChange?(): void;
}

function MockFormValidate({ onSubmit }: MockFormValidateProps) {
  const formRef = useRef() as MutableRefObject<FormRef>;

  return (
    <>
      <Form onSubmit={onSubmit} ref={formRef}>
        <InputText
          placeholder="test form"
          name="test"
          validations={{
            required: {
              value: true,
              message: "validation error",
            },
          }}
        />
      </Form>
      <button onClick={() => formRef.current.submit()}>submit</button>
    </>
  );
}

interface MockFormProps {
  onSubmit(): void;
  onStateChange?(): void;
}

function MockForm({ onSubmit, onStateChange }: MockFormProps) {
  return (
    <Form onSubmit={onSubmit} onStateChange={onStateChange}>
      <InputText
        placeholder="test form"
        name="test"
        validations={{
          required: {
            value: true,
            message: "validation error",
          },
          minLength: {
            value: 3,
            message: "short.",
          },
        }}
      />
      <InputText
        placeholder="test input"
        name="testInput"
        validations={{
          required: {
            value: true,
            message: "validation error when required",
          },
          minLength: {
            value: 3,
            message: "two short.",
          },
        }}
      />
      <button type="submit">submit</button>
    </Form>
  );
}

function MockFormWithState() {
  const [formState, setFormState] = useFormState();

  return (
    <Form onStateChange={setFormState}>
      <InputText
        placeholder="gimme a name"
        validations={{
          minLength: {
            value: 5,
            message: "to short",
          },
        }}
      />
      <Text>Dirty: {formState.isDirty ? "true" : "false"}</Text>
      <Text>Valid: {formState.isValid ? "true" : "false"}</Text>
    </Form>
  );
}

```

## Component Path

`/components/Form`

---

_Generated on 2025-08-21T17:35:16.361Z_
