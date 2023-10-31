import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Option, Select } from ".";

it("renders a Select with no options", () => {
  const { container } = render(<Select />);
  expect(container).toMatchSnapshot();
});

// It seems dumb to test this, but the children type is
// ReactNode | ReactNode[] and it complains that ReactNode[] needs more than one
// element if you try to use just that as the type.
it("renders a Select with one option", () => {
  const { container } = render(
    <Select>
      <Option>Foo</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders a Select with many options", () => {
  const { container } = render(
    <Select>
      <Option>Foo</Option>
      <Option>Bar</Option>
      <Option>Baz</Option>
      <Option>Quux</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders correctly as small", () => {
  const { container } = render(
    <Select size="small">
      <Option>Foo</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders correctly as large", () => {
  const { container } = render(
    <Select size="large">
      <Option>Foo</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders correctly when disabled", () => {
  const { container } = render(
    <Select disabled>
      <Option>Foo</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders correctly when invalid", () => {
  const { container } = render(
    <Select invalid>
      <Option>Foo</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
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
  expect(changeHandler).toHaveBeenCalledWith(expectedValue, expect.any(Object));
});
