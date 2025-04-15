import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Option } from "./Option";
import { SelectRebuilt } from "./Select.rebuilt";

describe("SelectRebuilt", () => {
  it("renders a SelectRebuilt with no options", () => {
    const { container } = render(<SelectRebuilt version={2} />);
    expect(container).toMatchSnapshot();
  });

  it("renders a SelectRebuilt with one option", () => {
    const { container } = render(
      <SelectRebuilt version={2}>
        <Option>Foo</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders a SelectRebuilt with many options", () => {
    const { container } = render(
      <SelectRebuilt version={2}>
        <Option>Foo</Option>
        <Option>Bar</Option>
        <Option>Baz</Option>
        <Option>Quux</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly as small", () => {
    const { container } = render(
      <SelectRebuilt version={2} size="small">
        <Option>Foo</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly as large", () => {
    const { container } = render(
      <SelectRebuilt version={2} size="large">
        <Option>Foo</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when disabled", () => {
    const { container } = render(
      <SelectRebuilt version={2} disabled>
        <Option>Foo</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when invalid", () => {
    const { container } = render(
      <SelectRebuilt version={2} invalid>
        <Option>Foo</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the value when set", () => {
    const { container } = render(
      <SelectRebuilt version={2} value="bar">
        <Option value="foo">Foo</Option>
        <Option value="bar">Bar</Option>
      </SelectRebuilt>,
    );

    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select.options[select.selectedIndex].value).toBe("bar");
  });

  it("should set the selected value when given 'value'", () => {
    const expectedValue = "baz";

    const { container } = render(
      <SelectRebuilt version={2} value={expectedValue}>
        <Option value="foo">Foo</Option>
        <Option value="bar">Bar</Option>
        <Option value="baz">Baz</Option>
      </SelectRebuilt>,
    );

    const select = container.querySelector("select") as HTMLSelectElement;

    // Verify the value is correctly set
    expect(select.value).toBe(expectedValue);

    // Verify the correct option is selected
    expect(select.selectedIndex).toBe(2);
    expect(select.options[select.selectedIndex].text).toBe("Baz");
  });

  describe("Action handlers", () => {
    it("should pass the new value to the onChange handler when the selected option changes", () => {
      const changeHandler = jest.fn();
      const expectedValue = "bar";

      const { container } = render(
        <SelectRebuilt version={2} onChange={changeHandler}>
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
        </SelectRebuilt>,
      );

      const select = container.querySelector("select") as HTMLSelectElement;
      fireEvent.change(select, {
        target: { value: expectedValue },
      });

      expect(changeHandler).toHaveBeenCalledWith(
        expectedValue,
        expect.any(Object),
      );
    });

    it("should call onChange with the correct value when selecting a different option", () => {
      const changeHandler = jest.fn();

      const { container } = render(
        <SelectRebuilt version={2} onChange={changeHandler} value="foo">
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
          <Option value="baz">Baz</Option>
        </SelectRebuilt>,
      );

      const select = container.querySelector("select") as HTMLSelectElement;

      // Initial value should be "foo"
      expect(select.value).toBe("foo");

      // Change to "baz"
      fireEvent.change(select, { target: { value: "baz" } });

      // Handler should be called with the new value
      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledWith("baz", expect.any(Object));
    });

    it("should call onFocus when the select is focused", () => {
      const focusHandler = jest.fn();

      const { container } = render(
        <SelectRebuilt version={2} onFocus={focusHandler}>
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
        </SelectRebuilt>,
      );

      const select = container.querySelector("select") as HTMLSelectElement;
      fireEvent.focus(select);

      expect(focusHandler).toHaveBeenCalledTimes(1);
    });

    it("should call onBlur when the select loses focus", () => {
      const blurHandler = jest.fn();

      const { container } = render(
        <SelectRebuilt version={2} onBlur={blurHandler}>
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
        </SelectRebuilt>,
      );

      const select = container.querySelector("select") as HTMLSelectElement;
      fireEvent.blur(select);

      expect(blurHandler).toHaveBeenCalledTimes(1);
    });

    it("should handle all events correctly when they are combined", () => {
      const changeHandler = jest.fn();
      const focusHandler = jest.fn();
      const blurHandler = jest.fn();

      const { container } = render(
        <SelectRebuilt
          version={2}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          value="foo"
        >
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
          <Option value="baz">Baz</Option>
        </SelectRebuilt>,
      );

      const select = container.querySelector("select") as HTMLSelectElement;

      // Test focus
      fireEvent.focus(select);
      expect(focusHandler).toHaveBeenCalledTimes(1);

      // Test change
      fireEvent.change(select, { target: { value: "bar" } });
      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledWith("bar", expect.any(Object));

      // Test blur
      fireEvent.blur(select);
      expect(blurHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("inputRef", () => {
    it("forwards inputRef to the select element", () => {
      const ref = React.createRef<HTMLSelectElement>();

      render(
        <SelectRebuilt version={2} inputRef={ref}>
          <Option>Foo</Option>
        </SelectRebuilt>,
      );

      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it("can access native select methods through inputRef", () => {
      const ref = React.createRef<HTMLSelectElement>();

      const { container } = render(
        <SelectRebuilt version={2} inputRef={ref}>
          <Option>Foo</Option>
        </SelectRebuilt>,
      );

      const selectElement = container.querySelector("select");

      // Setup mocks
      if (selectElement) {
        selectElement.focus = jest.fn();
        selectElement.blur = jest.fn();
      }

      // Call native methods through ref
      if (ref.current) {
        ref.current.focus();
        ref.current.blur();
      }

      // Verify
      expect(selectElement?.focus).toHaveBeenCalled();
      expect(selectElement?.blur).toHaveBeenCalled();
    });
  });
});
