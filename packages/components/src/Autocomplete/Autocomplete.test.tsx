import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Autocomplete } from ".";

afterEach(cleanup);

interface Option {
  value: string | number;
  label: string;
}

function returnOptions(options: Option[]) {
  // This test mock doesn't need string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (text: string) => {
    return Promise.resolve(options);
  };
}

it("renders an Autocomplete", () => {
  const tree = renderer
    .create(
      <Autocomplete
        value={undefined}
        onChange={() => {}}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should call the getOptions handler with the new value", () => {
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
  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newValue },
  });
  expect(changeOptionsHandler).toHaveBeenCalledWith(newValue);
});

test("it should call the handler when an option is selected", () => {
  const changeHandler = jest.fn();
  const options = [
    {
      value: "1",
      label: "option_1",
    },
  ];
  const { getByText } = render(
    <Autocomplete
      value={undefined}
      onChange={changeHandler}
      initialOptions={options}
      getOptions={returnOptions(options)}
      placeholder="placeholder_name"
    />,
  );
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

  expect(changeHandler).toHaveBeenCalledWith(options[0]);
});
