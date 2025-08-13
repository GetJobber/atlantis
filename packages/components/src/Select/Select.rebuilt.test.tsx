import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Option } from "./Option";
import { SelectRebuilt } from "./Select.rebuilt";
import { OptionGroup } from "./OptionGroup";

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
    render(
      <SelectRebuilt version={2} value="bar">
        <Option value="foo">Foo</Option>
        <Option value="bar">Bar</Option>
      </SelectRebuilt>,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("bar");
  });

  it("should set the selected value when given 'value'", () => {
    const expectedValue = "baz";

    render(
      <SelectRebuilt version={2} value={expectedValue}>
        <Option value="foo">Foo</Option>
        <Option value="bar">Bar</Option>
        <Option value="baz">Baz</Option>
      </SelectRebuilt>,
    );

    const selectElement = screen.getByRole("combobox");

    // Verify the value is correctly set
    expect(selectElement).toHaveValue(expectedValue);

    // Verify the correct option is selected
    const select = selectElement as HTMLSelectElement;
    expect(select.options[select.selectedIndex]).toHaveTextContent("Baz");
  });

  describe("Action handlers", () => {
    it("should pass the new value to the onChange handler when the selected option changes", async () => {
      const changeHandler = jest.fn();
      const expectedValue = "bar";

      render(
        <SelectRebuilt version={2} onChange={changeHandler}>
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
        </SelectRebuilt>,
      );

      const selectElement = screen.getByRole("combobox");
      await userEvent.selectOptions(selectElement, expectedValue);

      expect(changeHandler).toHaveBeenCalledWith(
        expectedValue,
        expect.any(Object),
      );
    });

    it("should call onChange with the correct value when selecting a different option", async () => {
      const changeHandler = jest.fn();

      render(
        <SelectRebuilt version={2} onChange={changeHandler} value="foo">
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
          <Option value="baz">Baz</Option>
        </SelectRebuilt>,
      );

      const selectElement = screen.getByRole("combobox");

      // Initial value should be "foo"
      expect(selectElement).toHaveValue("foo");

      // Change to "baz"
      await userEvent.selectOptions(selectElement, "baz");

      // Handler should be called with the new value
      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledWith("baz", expect.any(Object));
    });

    it("should call onFocus when the select is focused", async () => {
      const focusHandler = jest.fn();

      render(
        <SelectRebuilt version={2} onFocus={focusHandler}>
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
        </SelectRebuilt>,
      );

      const selectElement = screen.getByRole("combobox");
      await userEvent.click(selectElement);

      expect(focusHandler).toHaveBeenCalledTimes(1);
    });

    it("should call onBlur when the select loses focus", async () => {
      const blurHandler = jest.fn();

      render(
        <>
          <SelectRebuilt version={2} onBlur={blurHandler}>
            <Option value="foo">Foo</Option>
            <Option value="bar">Bar</Option>
          </SelectRebuilt>
          <button type="button" data-testid="other-element">
            Other element
          </button>
        </>,
      );

      // First focus the select element
      const selectElement = screen.getByRole("combobox");
      await userEvent.click(selectElement);

      // Then focus another element to trigger blur
      const otherElement = screen.getByTestId("other-element");
      await userEvent.click(otherElement);

      expect(blurHandler).toHaveBeenCalledTimes(1);
    });

    describe("combined events", () => {
      it("should handle focus event correctly", async () => {
        const focusHandler = jest.fn();

        render(
          <SelectRebuilt version={2} onFocus={focusHandler} value="foo">
            <Option value="foo">Foo</Option>
            <Option value="bar">Bar</Option>
            <Option value="baz">Baz</Option>
          </SelectRebuilt>,
        );

        const selectElement = screen.getByRole("combobox");
        await userEvent.click(selectElement);
        expect(focusHandler).toHaveBeenCalledTimes(1);
      });

      it("should handle change event correctly", async () => {
        const changeHandler = jest.fn();

        render(
          <SelectRebuilt version={2} onChange={changeHandler} value="foo">
            <Option value="foo">Foo</Option>
            <Option value="bar">Bar</Option>
            <Option value="baz">Baz</Option>
          </SelectRebuilt>,
        );

        const selectElement = screen.getByRole("combobox");
        await userEvent.selectOptions(selectElement, "bar");
        expect(changeHandler).toHaveBeenCalledTimes(1);
        expect(changeHandler).toHaveBeenCalledWith("bar", expect.any(Object));
      });

      it("should handle blur event correctly", async () => {
        const blurHandler = jest.fn();

        render(
          <>
            <SelectRebuilt version={2} onBlur={blurHandler} value="foo">
              <Option value="foo">Foo</Option>
              <Option value="bar">Bar</Option>
              <Option value="baz">Baz</Option>
            </SelectRebuilt>
            <button type="button" data-testid="other-element">
              Other element
            </button>
          </>,
        );

        // Focus the select element
        const selectElement = screen.getByRole("combobox");
        await userEvent.click(selectElement);

        // Click on another element to trigger blur
        const otherElement = screen.getByTestId("other-element");
        await userEvent.click(otherElement);

        expect(blurHandler).toHaveBeenCalledTimes(1);
      });
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

      render(
        <SelectRebuilt version={2} inputRef={ref}>
          <Option>Foo</Option>
        </SelectRebuilt>,
      );

      const selectElement = screen.getByRole("combobox");

      const focusSpy = jest.spyOn(selectElement, "focus");
      const blurSpy = jest.spyOn(selectElement, "blur");

      act(() => {
        ref.current?.focus();
      });
      act(() => {
        ref.current?.blur();
      });

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(blurSpy).toHaveBeenCalledTimes(1);

      focusSpy.mockRestore();
      blurSpy.mockRestore();
    });
  });

  describe("OptionGroup integration", () => {
    it("renders an optgroup with accessible label", () => {
      render(
        <SelectRebuilt version={2}>
          <OptionGroup label="Group A">
            <Option value="one">One</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );

      const group = screen.getByRole("group", { name: "Group A" });
      expect(group).toBeInTheDocument();
      expect(group).toHaveAccessibleName("Group A");
    });

    it("renders children options within a group", () => {
      render(
        <SelectRebuilt version={2}>
          <OptionGroup label="Group B">
            <Option value="one">One</Option>
            <Option value="two">Two</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );

      expect(screen.getByRole("option", { name: "One" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Two" })).toBeInTheDocument();
    });

    it("supports disabled optgroup state", () => {
      render(
        <SelectRebuilt version={2}>
          <OptionGroup label="Disabled Group" disabled>
            <Option value="x">X</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );

      const group = screen.getByRole("group", { name: "Disabled Group" });
      expect(group).toBeDisabled();
    });

    it("applies UNSAFE_className to the optgroup container", () => {
      const { container } = render(
        <SelectRebuilt version={2}>
          <OptionGroup label="Custom Group" UNSAFE_className="custom-class">
            <Option value="x">X</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );

      const group = container.querySelector("optgroup");
      expect(group).toHaveClass("custom-class");
    });

    it("applies UNSAFE_style.container to the optgroup", () => {
      render(
        <SelectRebuilt version={2}>
          <OptionGroup
            label="Styled Group"
            UNSAFE_style={{ container: { fontWeight: "bold" } }}
          >
            <Option value="x">X</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );

      const group = screen.getByRole("group", { name: "Styled Group" });
      expect(group).toHaveStyle({ fontWeight: "bold" });
    });

    it("does not apply custom select class unless enableCustomSelect is true", () => {
      const { container: nativeContainer } = render(
        <SelectRebuilt version={2}>
          <OptionGroup label="Group">
            <Option value="1">One</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );
      const nativeSelect = nativeContainer.querySelector("select");
      expect(nativeSelect).not.toHaveClass("select");

      const { container: customContainer } = render(
        <SelectRebuilt version={2} enableCustomSelect>
          <OptionGroup label="Group">
            <Option value="1">One</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );
      const customSelect = customContainer.querySelector("select");
      expect(customSelect).toHaveClass("select");
    });
  });
});
