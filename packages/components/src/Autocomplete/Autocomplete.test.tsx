import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { AnyOption, Autocomplete } from ".";

afterEach(cleanup);

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

it("renders an Autocomplete", () => {
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

test("it should call the getOptions handler with the new value", async () => {
  const placeholder = "my_placeholder";
  const changeHandler = jest.fn();
  const changeOptionsHandler = jest.fn();
  changeOptionsHandler.mockReturnValue(Promise.resolve([]));
  const newValue = "new search value";
  const { getByLabelText } = render(
    <Autocomplete
      value={undefined}
      onChange={changeHandler}
      getOptions={changeOptionsHandler}
      placeholder={placeholder}
    />,
  );
  await waitFor(() => {
    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newValue },
    });
    expect(changeOptionsHandler).toHaveBeenCalledWith(newValue);
  });
});

test("it should call the handler when an option is selected", () => {
  const changeHandler = jest.fn();
  const { getByText, getByRole } = render(
    <Autocomplete
      value={undefined}
      onChange={changeHandler}
      initialOptions={options}
      getOptions={returnOptions(options)}
      placeholder="placeholder_name"
    />,
  );
  fireEvent.focus(getByRole("textbox"));
  fireEvent(
    getByText(`option_${options[0].value}`),
    new KeyboardEvent("keydown", {
      key: "ArrowDown",
      bubbles: true,
      cancelable: false,
    }),
  );
  fireEvent(
    getByText(`option_${options[0].value}`),
    new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: false,
    }),
  );

  expect(changeHandler).toHaveBeenCalledWith(options[1]);
});

test("it should display headers when headers are passed in", () => {
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

test("it should call the handler skipping headings when an option is selected", () => {
  const changeHandler = jest.fn();
  const { getByRole } = render(
    <Autocomplete
      value={undefined}
      onChange={changeHandler}
      initialOptions={headingOptions}
      getOptions={returnOptions(options)}
      placeholder="placeholder_name"
    />,
  );
  fireEvent.focus(getByRole("textbox"));
  fireEvent(
    getByRole("textbox"),
    new KeyboardEvent("keydown", {
      key: "ArrowDown",
      bubbles: true,
      cancelable: false,
    }),
  );
  fireEvent(
    getByRole("textbox"),
    new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: false,
    }),
  );

  expect(changeHandler).toHaveBeenCalledWith(headingOptions[1].options[0]);
});

it("should remove the menu when blurred", async () => {
  const changeHandler = jest.fn();
  const { getByRole, getByText, queryByText } = render(
    <Autocomplete
      value={undefined}
      onChange={changeHandler}
      initialOptions={options}
      getOptions={returnOptions(options)}
      placeholder="placeholder_name"
    />,
  );

  const input = getByRole("textbox");

  input.focus();

  await waitFor(() => {
    expect(getByText("option_0")).toBeInstanceOf(HTMLParagraphElement);
  });

  input.blur();

  await waitFor(() => {
    expect(queryByText("option_0")).toBeNull();
  });
});

it("should call onBlur callback when blurred", async () => {
  const blurHandler = jest.fn();
  const { getByRole } = render(
    <Autocomplete
      value={undefined}
      onChange={jest.fn()}
      initialOptions={options}
      getOptions={returnOptions(options)}
      placeholder="placeholder_name"
      onBlur={blurHandler}
    />,
  );

  const input = getByRole("textbox");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(blurHandler).toHaveBeenCalledTimes(1);
  });
});

it("should call onChange with undefined if allowFreeForm is false and not matched", async () => {
  const changeHandler = jest.fn();
  const { getByRole } = render(
    <Autocomplete
      value={undefined}
      onChange={changeHandler}
      initialOptions={options}
      getOptions={returnOptions(options)}
      placeholder="placeholder_name"
      allowFreeForm={false}
    />,
  );

  const input = getByRole("textbox");

  input.focus();

  fireEvent.input(input, {
    target: {
      value: "opt",
    },
  });

  input.blur();

  await waitFor(() => {
    expect(changeHandler).toHaveBeenCalledWith(undefined);
  });
});

it("sets the input value to blank if allowFreeForm is false and not matched", async () => {
  const changeHandler = jest.fn();
  const { getByRole } = render(
    <Autocomplete
      value={undefined}
      onChange={changeHandler}
      initialOptions={options}
      getOptions={returnOptions(options)}
      placeholder="placeholder_name"
      allowFreeForm={false}
    />,
  );

  const input = getByRole("textbox") as HTMLInputElement;

  input.focus();

  fireEvent.input(input, {
    target: {
      value: "opt",
    },
  });

  input.blur();

  await waitFor(() => {
    expect(input.value).toBe("");
  });
});

it("passes the invalid prop to the InputText", () => {
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
