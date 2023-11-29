import { useShowClear } from "./useShowClear";
import { Clearable } from "..";

interface UseShowClearParameters {
  clearable: Clearable;
  hasValue: boolean;
  focused: boolean;
  multiline: boolean;
  disabled: boolean;
  expected: boolean;
}

describe("useShowClear", () => {
  describe.each<UseShowClearParameters>([
    {
      clearable: "always",
      hasValue: true,
      focused: false,
      multiline: false,
      disabled: false,
      expected: true,
    },
    {
      clearable: "always",
      hasValue: true,
      focused: true,
      multiline: false,
      disabled: false,
      expected: true,
    },
    {
      clearable: "always",
      hasValue: true,
      focused: false,
      multiline: false,
      disabled: true,
      expected: false,
    },
    {
      clearable: "always",
      hasValue: false,
      focused: false,
      multiline: false,
      disabled: true,
      expected: false,
    },
    {
      clearable: "while-editing",
      hasValue: true,
      focused: false,
      multiline: false,
      disabled: false,
      expected: false,
    },
    {
      clearable: "while-editing",
      hasValue: true,
      focused: true,
      multiline: false,
      disabled: false,
      expected: true,
    },
    {
      clearable: "while-editing",
      hasValue: false,
      focused: false,
      multiline: false,
      disabled: true,
      expected: false,
    },
    {
      clearable: "while-editing",
      hasValue: true,
      focused: false,
      multiline: false,
      disabled: true,
      expected: false,
    },
    {
      clearable: "never",
      hasValue: true,
      focused: false,
      multiline: false,
      disabled: false,
      expected: false,
    },
    {
      clearable: "never",
      hasValue: true,
      focused: true,
      multiline: false,
      disabled: false,
      expected: false,
    },
    {
      clearable: "never",
      hasValue: false,
      focused: false,
      multiline: false,
      disabled: true,
      expected: false,
    },
    {
      clearable: "never",
      hasValue: true,
      focused: false,
      multiline: false,
      disabled: true,
      expected: false,
    },
  ])(
    "%j",
    ({
      clearable,
      hasValue,
      focused,
      multiline,
      disabled,
      expected,
    }: UseShowClearParameters) => {
      it(`returns ${expected}`, () => {
        expect(
          useShowClear({ clearable, multiline, focused, hasValue, disabled }),
        ).toEqual(expected);
      });
    },
  );

  it("throws an error if multiline is true and clearable isn't never", () => {
    expect(() => {
      useShowClear({
        clearable: "always",
        multiline: true,
        focused: true,
        hasValue: true,
        disabled: false,
      });
    }).toThrow();
    expect(() => {
      useShowClear({
        clearable: "while-editing",
        multiline: true,
        focused: true,
        hasValue: true,
        disabled: false,
      });
    }).toThrow();
    expect(() => {
      useShowClear({
        clearable: "never",
        multiline: true,
        focused: true,
        hasValue: true,
        disabled: false,
      });
    }).not.toThrow();
  });
});
