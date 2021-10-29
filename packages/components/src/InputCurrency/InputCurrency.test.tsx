import React from "react";
import renderer from "react-test-renderer";
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from "@testing-library/react";
import { InputCurrency, InputCurrencyRef } from "./InputCurrency";

afterEach(cleanup);

const defaultProps = {
  placeholder: "Currency Input",
  value: 1.23,
};

describe("InputCurrency", () => {
  it("renders an input field", () => {
    const tree = renderer.create(<InputCurrency {...defaultProps} />);
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="wrapper right miniLabel"
        style={
          Object {
            "--formField-maxLength": undefined,
          }
        }
      >
        <div
          className="inputWrapper"
        >
          <label
            className="label"
            htmlFor="123e4567-e89b-12d3-a456-426655440001"
          >
            Currency Input
          </label>
          <input
            className="input"
            id="123e4567-e89b-12d3-a456-426655440001"
            inputMode="numeric"
            onBlur={[Function]}
            onChange={[Function]}
            onFocus={[Function]}
            onKeyDown={[Function]}
            type="text"
            value="1.23"
          />
        </div>
      </div>
    `);
  });

  it("should default to 0 if value was not provided", () => {
    const { getByLabelText } = render(
      <InputCurrency {...defaultProps} value={undefined} />,
    );

    expect(
      (getByLabelText(defaultProps.placeholder) as HTMLInputElement).value,
    ).toBe("0.00");
  });

  it("should rerender with updated values", () => {
    const { getByLabelText, rerender } = render(
      <InputCurrency {...defaultProps} />,
    );

    rerender(<InputCurrency {...defaultProps} value={2} />);

    expect(
      (getByLabelText(defaultProps.placeholder) as HTMLInputElement).value,
    ).toBe("2.00");
  });

  describe("when changing the input", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onChange = jest.fn((_: number) => undefined);
    let rendered: RenderResult;

    beforeEach(() => {
      onChange.mockReset();

      rendered = render(
        <InputCurrency {...defaultProps} onChange={onChange} />,
      );
    });

    it("should not fire onChange for the same value after input masking", () => {
      fireEvent.change(rendered.getByLabelText(defaultProps.placeholder), {
        target: { value: "$1.23" },
      });

      expect(onChange).not.toHaveBeenCalled();
      expect(
        (rendered.getByLabelText(defaultProps.placeholder) as HTMLInputElement)
          .value,
      ).toBe("1.23");
    });

    it("should not fire onChange for an equivalent value", () => {
      fireEvent.change(rendered.getByLabelText(defaultProps.placeholder), {
        target: { value: "1.230" },
      });

      expect(onChange).not.toHaveBeenCalled();
      expect(
        (rendered.getByLabelText(defaultProps.placeholder) as HTMLInputElement)
          .value,
      ).toBe("1.230");
    });

    it("should fire onChange if the new value is substantially different", () => {
      fireEvent.change(rendered.getByLabelText(defaultProps.placeholder), {
        target: { value: "$2.341" },
      });

      expect(onChange).toHaveBeenCalledWith(2.341);
      expect(
        (rendered.getByLabelText(defaultProps.placeholder) as HTMLInputElement)
          .value,
      ).toBe("2.341");
    });

    it("should round the changed value", () => {
      fireEvent.change(rendered.getByLabelText(defaultProps.placeholder), {
        target: { value: "0.123456" },
      });

      expect(onChange).toHaveBeenCalledWith(0.12346);
    });

    it("should zero out for entirely unusable input", () => {
      fireEvent.change(rendered.getByLabelText(defaultProps.placeholder), {
        target: { value: "-$i.am.not.a.number" },
      });

      expect(onChange).toHaveBeenCalledWith(0);
    });

    it("should let the user type '-' without immediately resetting", () => {
      fireEvent.change(rendered.getByLabelText(defaultProps.placeholder), {
        target: { value: "-" },
      });

      // Pretend we're now rerendering based on what was passed to the onChange function
      const newValue = onChange.mock.calls[0][0];
      rendered.rerender(
        <InputCurrency
          {...defaultProps}
          value={newValue}
          onChange={onChange}
        />,
      );

      expect(
        (rendered.getByLabelText(defaultProps.placeholder) as HTMLInputElement)
          .value,
      ).toBe("-");
    });

    it("should correctly convert currency values with a comma thousands separator", () => {
      fireEvent.change(rendered.getByLabelText(defaultProps.placeholder), {
        target: { value: "$1,234.56" },
      });

      expect(onChange).toHaveBeenCalledWith(1234.56);
      expect(
        (rendered.getByLabelText(defaultProps.placeholder) as HTMLInputElement)
          .value,
      ).toBe("1234.56");
    });
  });

  describe("with custom decimalPlaces", () => {
    it("should show a minimum number of decimal places", () => {
      const { getByLabelText } = render(
        <InputCurrency {...defaultProps} decimalPlaces={1} value={1} />,
      );

      expect(
        (getByLabelText(defaultProps.placeholder) as HTMLInputElement).value,
      ).toBe("1.0");
    });

    it("should round off after a maxmimum number of decimal places", () => {
      const { getByLabelText } = render(
        <InputCurrency
          {...defaultProps}
          maximumDecimalPlaces={3}
          value={0.111555}
        />,
      );

      expect(
        (getByLabelText(defaultProps.placeholder) as HTMLInputElement).value,
      ).toBe("0.112");
    });

    it("should increase the maximum decimals if the normal amount is larger", () => {
      const { getByLabelText } = render(
        <InputCurrency
          {...defaultProps}
          decimalPlaces={2}
          maximumDecimalPlaces={1}
          value={0.1111}
        />,
      );

      expect(
        (getByLabelText(defaultProps.placeholder) as HTMLInputElement).value,
      ).toBe("0.11");
    });
  });

  describe("when using a ref", () => {
    it("should be focussable", () => {
      const inputRef = React.createRef<InputCurrencyRef>();

      const { getByLabelText } = render(
        <InputCurrency {...defaultProps} ref={inputRef} />,
      );

      if (inputRef.current) {
        inputRef.current.focus();
      }

      expect(document.activeElement).toBe(
        getByLabelText(defaultProps.placeholder),
      );
    });

    it("should be blurrable", () => {
      const inputRef = React.createRef<InputCurrencyRef>();

      const { getByLabelText } = render(
        <InputCurrency {...defaultProps} ref={inputRef} />,
      );

      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.blur();
      }

      expect(document.activeElement).not.toBe(
        getByLabelText(defaultProps.placeholder),
      );
    });

    it("should call the blurHandler when blurred", () => {
      const inputRef = React.createRef<InputCurrencyRef>();
      const blurHandler = jest.fn();

      render(
        <InputCurrency {...defaultProps} ref={inputRef} onBlur={blurHandler} />,
      );

      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.blur();
      }

      expect(blurHandler).toHaveBeenCalledTimes(1);
    });
  });
});
