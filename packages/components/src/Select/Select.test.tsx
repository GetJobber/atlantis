import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Option, Select } from ".";

afterEach(cleanup);

it("renders a Select with no options", () => {
  const tree = renderer.create(<Select />).toJSON();
  expect(tree).toMatchSnapshot();
});

// It seems dumb to test this, but the children type is
// ReactNode | ReactNode[] and it complains that ReactNode[] needs more than one
// element if you try to use just that as the type.
it("renders a Select with one option", () => {
  const tree = renderer
    .create(
      <Select>
        <Option>Foo</Option>
      </Select>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Select with many options", () => {
  const tree = renderer
    .create(
      <Select>
        <Option>Foo</Option>
        <Option>Bar</Option>
        <Option>Baz</Option>
        <Option>Quux</Option>
      </Select>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly as small", () => {
  const tree = renderer
    .create(
      <Select size="small">
        <Option>Foo</Option>
      </Select>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly as large", () => {
  const tree = renderer
    .create(
      <Select size="large">
        <Option>Foo</Option>
      </Select>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when disabled", () => {
  const tree = renderer
    .create(
      <Select disabled>
        <Option>Foo</Option>
      </Select>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when invalid", () => {
  const tree = renderer
    .create(
      <Select invalid>
        <Option>Foo</Option>
      </Select>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders the defaultValue when set.", () => {
  const { container } = render(
    <Select defaultValue="bar">
      <Option value="foo">Foo</Option>
      <Option value="bar">Bar</Option>
    </Select>,
  );

  const select = container.querySelector("select") as HTMLSelectElement;

  expect(select.options[select.selectedIndex].value).toBe("bar");
});

it("renders the value when set.", () => {
  const { container } = render(
    <Select value="bar">
      <Option value="foo">Foo</Option>
      <Option value="bar">Bar</Option>
    </Select>,
  );

  const select = container.querySelector("select") as HTMLSelectElement;

  expect(select.options[select.selectedIndex].value).toBe("bar");
});

it("should pass the new value to the onChange handler when the selected option changes.", () => {
  const changeHandler = jest.fn();

  const expectedValue = "bar";

  const { container } = render(
    <Select onChange={changeHandler}>
      <Option value="foo">Foo</Option>
      <Option value="bar">Bar</Option>
    </Select>,
  );

  const select = container.querySelector("select") as HTMLSelectElement;

  fireEvent.change(select, {
    target: { value: expectedValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(expectedValue);
});
