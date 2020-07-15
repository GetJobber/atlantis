import React from "react";
import renderer from "react-test-renderer";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { Autocomplete, Option } from ".";

afterEach(cleanup);

function returnOptions(options: Option[]) {
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

it("renders an Autocomplete", () => {
  const tree = renderer
    .create(
      <Autocomplete
        value={undefined}
        initialOptions={options}
        onChange={jest.fn()}
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
  await act(async () => {
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
