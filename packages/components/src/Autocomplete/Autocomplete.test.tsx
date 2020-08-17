import React from "react";
import renderer from "react-test-renderer";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
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
  const tree = renderer
    .create(
      <Autocomplete
        value={undefined}
        initialOptions={options}
        onChange={() => {}}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
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
  await act(() => {
    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newValue },
    });
  });
  expect(changeOptionsHandler).toHaveBeenCalledWith(newValue);
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
  const tree = renderer
    .create(
      <Autocomplete
        value={undefined}
        onChange={() => {}}
        initialOptions={headingOptions}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
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

  expect(changeHandler).toHaveBeenCalledWith(headingOptions[0].options[0]);
});
