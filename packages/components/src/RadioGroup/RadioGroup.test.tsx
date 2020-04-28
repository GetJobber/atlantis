import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { RadioGroup } from ".";

afterEach(cleanup);

test("renders a RadioGroup", () => {
  const tree = renderer
    .create(
      <RadioGroup
        name="Foo"
        value={() => alert("foo value")}
        header="foo header"
        onChange={() => alert("foo!")}
      >
        Foo
      </RadioGroup>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should call the handler with the new value", () => {
  const handleOnChange = jest.fn();

  const { getByText } = render(
    <RadioGroup
      name="dedicatedPhoneNumber"
      header="some text about the options"
      onChange={setCompany}
      value={company}
    >
      <RadioOption
        value="apple"
        name="dedicatedPhoneNumber"
        checked={company === "apple"}
        setSelected={changeEvent => handleOnChange}
      >
        {" "}
        Apple{" "}
      </RadioOption>
      <RadioOption
        value="google"
        name="dedicatedPhoneNumber"
        checked={company === "google"}
        setSelected={changeEvent => handleOnChange}
      >
        {" "}
        Google{" "}
      </RadioOption>
    </RadioGroup>,
  );

  fireEvent.click(getByText(text));
  expect(clickHandler).toHaveBeenCalled();

  // E.g. If you need a change event, rather than a click event:
  //
  // fireEvent.change(getByLabelText(placeholder), {
  //   target: { value: newValue },
  // });
  // expect(changeHandler).toHaveBeenCalledWith(newValue);
});
