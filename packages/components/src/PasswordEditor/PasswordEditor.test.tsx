import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { PasswordEditor } from ".";

afterEach(cleanup);

test.skip("renders", () => {
  const tree = renderer
    .create(<PasswordEditor value="foo" onChange={jest.fn()} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip("renders with custom placeholder", () => {});

test.skip("renders an error message when given an insecure value", () => {});

test("it should call the handler with a new secure value", () => {
  const changeHandler = jest.fn();
  const newPassword = "oh, look a password";

  const { getByLabelText } = render(
    <PasswordEditor value="" onChange={changeHandler} />,
  );

  fireEvent.change(getByLabelText("Password"), {
    target: { value: newPassword },
  });
  expect(changeHandler).toHaveBeenCalledWith([newPassword, true]);
});

test.skip("it should call the handler with a new insecure value", () => {});

test("it should display an appropriate strength gauge", () => {
  const changeHandler = jest.fn();

  const { queryByLabelText } = render(
    <PasswordEditor value="passwordBuddy" onChange={changeHandler} />,
  );

  expect(queryByLabelText("Level 0")).not.toBeInstanceOf(HTMLElement);
  expect(queryByLabelText("Level 1")).toBeInstanceOf(HTMLElement);
  expect(queryByLabelText("Level 2")).not.toBeInstanceOf(HTMLElement);
  expect(queryByLabelText("Level 3")).not.toBeInstanceOf(HTMLElement);
  expect(queryByLabelText("Level 4")).not.toBeInstanceOf(HTMLElement);
});
