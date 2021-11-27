import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputPhoneNumber } from ".";

afterEach(cleanup);
//TODO: do we want to keep this?
it("renders a InputPhoneNumber", () => {
  const tree = renderer
    .create(<InputPhoneNumber country={"NorthAmerica"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("will only accept numerical characters", () => {
  const rendered = render(
    <InputPhoneNumber
      country={"NorthAmerica"}
      placeholder="Phone Number"
      data-testid="custom-element"
    />,
  );
  const numberInput = rendered.getByLabelText(
    "Phone Number",
  ) as HTMLInputElement;

  fireEvent.click(numberInput);
  fireEvent.change(numberInput, {
    target: { value: "abcde~!@#$%^&*()_+={}[]\\|`?/\"-'`" },
  });

  expect(numberInput.value).toBe(" (___) ___-____");
});

it("will return the correct phone number with formatting", () => {
  const onChangeHandler = jest.fn();
  const rendered = render(
    <InputPhoneNumber
      country={"NorthAmerica"}
      placeholder="Phone Number"
      data-testid="custom-element"
      onChange={onChangeHandler}
    />,
  );
  const numberInput = rendered.getByLabelText(
    "Phone Number",
  ) as HTMLInputElement;

  fireEvent.click(numberInput);
  fireEvent.change(numberInput, {
    target: { value: "7802424496" },
  });

  expect(onChangeHandler).toHaveBeenCalledWith(" (780) 242-4496");
});

it("will return the correct phone number with formatting for Great Britain and the Country Code", () => {
  const onChangeHandler = jest.fn();
  const rendered = render(
    <InputPhoneNumber
      country={"GreatBritain"}
      placeholder="Phone Number"
      data-testid="custom-element"
      onChange={onChangeHandler}
      showCountryCode={true}
    />,
  );
  const numberInput = rendered.getByLabelText(
    "Phone Number",
  ) as HTMLInputElement;

  fireEvent.click(numberInput);
  fireEvent.change(numberInput, {
    target: { value: "020 7183 8750" },
  });

  expect(onChangeHandler).toHaveBeenCalledWith("+44 (020) 7183 8750");
});

it("will hide the mask until the user begins to enter valid input", () => {
  const rendered = render(
    <InputPhoneNumber
      country={"NorthAmerica"}
      placeholder="Phone Number"
      data-testid="custom-element"
      alwaysShowMask={false}
    />,
  );
  const numberInput = rendered.getByLabelText(
    "Phone Number",
  ) as HTMLInputElement;

  expect(numberInput.value).toBe("");

  fireEvent.click(numberInput);
  fireEvent.change(numberInput, {
    target: { value: "7802424496" },
  });

  expect(numberInput.value).toBe(" (780) 242-4496");
});
