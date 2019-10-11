import React from "react";
import renderer from "react-test-renderer";
// import { cleanup, fireEvent, render } from "@testing-library/react";
import { Autocomplete } from ".";

// afterEach(cleanup);

it("renders an Autocomplete", () => {
  const tree = renderer
    .create(
      <Autocomplete
        value="value"
        onChange={() => {}}
        getOptions={() => {
          return [];
        }}
        placeholder="placeholder_name"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should call the handler with the new value", () => {
  // const changeHandler = jest.fn();
  // const newValue = "Bar";
  // const { getByLabelText } = render(
  //   <Autocomplete
  //     value="value"
  //     onChange={changeHandler}
  //     getOptions={() => {
  //       return [];
  //     }}
  //     placeholder="placeholder_name"
  //   />,
  // );
  // fireEvent.change(getByLabelText(value), {
  //   target: { value: newValue },
  // });
  // expect(changeHandler).toHaveBeenCalledWith(newValue);
});
