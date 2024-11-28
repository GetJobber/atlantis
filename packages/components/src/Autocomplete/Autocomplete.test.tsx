import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import pickBy from "lodash/pickBy";
import { FormProvider, useForm } from "react-hook-form";
import isEmpty from "lodash/isEmpty";
import { AnyOption, Autocomplete } from ".";
import { InputTextRef } from "../InputText";

function returnOptions(options: AnyOption[]) {
  return async () => {
    return Promise.resolve(options);
  };
}

const options = [
  {
    value: "0",
    label: "option_0",
  },
  {
    value: "1",
    label: "option_1",
  },
];

const headingOptions = [
  {
    label: "first_heading",
    options: [
      {
        value: "0",
        label: "option_0",
      },
    ],
  },
  {
    label: "second_heading",
    options: [
      {
        value: "1",
        label: "option_1",
      },
      {
        value: "2",
        label: "option_2",
      },
    ],
  },
];

// eslint-disable-next-line max-statements
describe("Autocomplete", () => {
  it("renders an Autocomplete", async () => {
    const { container } = render(
      <Autocomplete
        value={undefined}
        initialOptions={options}
        onChange={jest.fn()}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should call the getOptions handler with the new value", async () => {
    const placeholder = "my_placeholder";
    const changeHandler = jest.fn();
    const changeOptionsHandler = jest.fn();
    changeOptionsHandler.mockReturnValue(Promise.resolve([]));
    const newValue = "new search value";
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        getOptions={changeOptionsHandler}
        placeholder={placeholder}
      />,
    );

    await userEvent.type(screen.getByLabelText(placeholder), newValue);
    await waitFor(() => {
      expect(changeOptionsHandler).toHaveBeenCalledWith(newValue);
    });
  });

  it("should call the handler when an option is selected", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
      />,
    );
    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(changeHandler).toHaveBeenCalledWith(options[1]);
  });

  it("should display headers when headers are passed in", async () => {
    const { container } = render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={headingOptions}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should call the handler skipping headings when an option is selected", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={headingOptions}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
      />,
    );

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.keyboard("{ArrowDown}{Enter}");

    expect(changeHandler).toHaveBeenCalledWith(headingOptions[1].options[0]);
  });

  it("should remove the menu when blurred", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
      />,
    );

    const input = screen.getByRole("textbox");

    await userEvent.click(input);

    expect(screen.getByText("option_0")).toBeInstanceOf(HTMLParagraphElement);

    await userEvent.tab();

    await waitFor(() => {
      expect(screen.queryByText("option_0")).toBeNull();
    });
  });

  it("should call onBlur callback when blurred", async () => {
    const blurHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
        onBlur={blurHandler}
      />,
    );

    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.tab();

    await waitFor(() => {
      expect(blurHandler).toHaveBeenCalledTimes(1);
    });
  });

  it("should call onChange with undefined if allowFreeForm is false and not matched", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
        allowFreeForm={false}
      />,
    );

    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.type(input, "opt");
    await userEvent.tab();

    await waitFor(() => {
      expect(changeHandler).toHaveBeenCalledWith(undefined);
    });
  });

  it("sets the input value to blank if allowFreeForm is false and not matched", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
        allowFreeForm={false}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.type(input, "opt");
    await userEvent.tab();

    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  it("passes the invalid prop to the InputText", async () => {
    const { container } = render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
        invalid
      />,
    );

    const invalid = container.querySelector(".invalid");

    expect(invalid).toBeInstanceOf(HTMLDivElement);
  });

  it("should focus input text", async () => {
    const placeholder = "Got milk?";

    const textRef = React.createRef<InputTextRef>();
    render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder={placeholder}
        allowFreeForm={false}
        ref={textRef}
      />,
    );
    textRef.current?.focus();

    await waitFor(() => {
      expect(screen.getByLabelText(placeholder)).toHaveFocus();
    });
  });

  it("should scroll into view input text", async () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const placeholder = "Got milk?";

    const textRef = React.createRef<InputTextRef>();

    render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder={placeholder}
        allowFreeForm={false}
        ref={textRef}
      />,
    );

    textRef.current?.scrollIntoView();
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});

it("should support uncontrolled inputs", async () => {
  render(
    <Autocomplete
      initialOptions={options}
      getOptions={returnOptions(options)}
      placeholder="placeholder_name"
    />,
  );
  await userEvent.click(screen.getByRole("textbox"));
  await userEvent.keyboard("{ArrowDown}{Enter}");
  expect(screen.getByRole("textbox")).toHaveValue(options[1].label);
});

describe("react-hook-form support", () => {
  describe("with named inputs", () => {
    it("should update the form state when the value changes", async () => {
      const { mockOnSubmit, mockOnError } = await renderAutocompleteForm();
      const detailsInput = screen.getByRole("textbox", {
        name: "Details Value",
      });
      await userEvent.click(detailsInput);
      await userEvent.keyboard("new value");

      await userEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(mockOnError).not.toHaveBeenCalled();

      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          detailsValue: { label: "new value" },
        }),
      );
    });
  });

  describe("with unnamed inputs", () => {
    it("should update the form state when the value changes", async () => {
      const { mockOnError, mockOnSubmit } = await renderAutocompleteForm();
      const sectionInput = screen.getByLabelText("Unnamed Input");

      await userEvent.click(sectionInput);
      await userEvent.keyboard("{ArrowDown}{Enter}");

      await userEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(mockOnError).not.toHaveBeenCalled();
      const lastMockOnSubmitCall = mockOnSubmit.mock.calls[0];
      const unnamedInputValue = pickBy(
        lastMockOnSubmitCall[0],
        value => value.label === headingOptions[1].options[0].label,
      );
      expect(isEmpty(unnamedInputValue)).toBe(false);
    });
  });

  it("should call onError when the value is invalid", async () => {
    const { mockOnError, mockOnValidation } = await renderAutocompleteForm(
      true,
    );

    await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(mockOnError).toHaveBeenCalled();
    const errorMessages = screen.getAllByText("This value is required");
    expect(errorMessages).toHaveLength(2);
    expect(mockOnValidation).toHaveBeenCalledWith("This value is required");
  });
});

async function renderAutocompleteForm(enabledValidations = false) {
  const mockOnSubmit = jest.fn();
  const mockOnError = jest.fn();
  const mockOnValidation = jest.fn();
  render(
    <AutocompleteFormTemplate
      onSubmit={mockOnSubmit}
      onError={mockOnError}
      onValidation={mockOnValidation}
      enableValidations={enabledValidations}
    />,
  );

  return { mockOnSubmit, mockOnError, mockOnValidation };
}

function AutocompleteFormTemplate({
  onSubmit,
  onError,
  enableValidations = false,
  onValidation,
}: {
  readonly onSubmit: (data: unknown) => void;
  readonly onError: (data: unknown) => void;
  readonly enableValidations?: boolean;
  readonly onValidation: (message: string) => void;
}) {
  function getSectionOptions(text: string) {
    if (text === "") {
      return headingOptions;
    }
    const filterRegex = new RegExp(text, "i");

    return headingOptions.map(section => ({
      ...section,
      options: section?.options?.filter(option =>
        option.label.match(filterRegex),
      ),
    }));
  }

  function getOptions(text: string) {
    if (text === "") {
      return options;
    }
    const filterRegex = new RegExp(text, "i");

    return options.filter(option => option.label.match(filterRegex));
  }
  const form = useForm();

  const { handleSubmit } = form;
  const validations = enableValidations
    ? { required: { message: "This value is required", value: true } }
    : undefined;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(data => onSubmit(data), onError)}>
        <Autocomplete
          placeholder="Unnamed Input"
          initialOptions={headingOptions}
          defaultValue={headingOptions[0].options[0]}
          getOptions={getSectionOptions}
          validations={validations}
        />
        <Autocomplete
          placeholder="Details Value"
          name="detailsValue"
          validations={validations}
          onValidation={onValidation}
          getOptions={getOptions}
          initialOptions={options}
        />

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
