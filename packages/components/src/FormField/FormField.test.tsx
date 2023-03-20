import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { FormField } from ".";

afterEach(cleanup);

// eslint-disable-next-line max-statements
describe("FormField", () => {
  describe("with no props", () => {
    it("renders", () => {
      const { container } = render(<FormField />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("with a placeholder", () => {
    it("renders", () => {
      const placeholder = "The best placeholder!";
      const { getByLabelText } = render(
        <FormField placeholder={placeholder} />,
      );
      expect(getByLabelText(placeholder)).toBeInTheDocument();
    });
  });

  describe("when small", () => {
    it("renders", () => {
      const { container } = render(<FormField size="small" />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("when readonly", () => {
    it("renders", () => {
      const { getByRole } = render(<FormField readonly />);
      expect(getByRole("textbox")).toHaveAttribute("readonly");
    });
  });

  describe("when disabled", () => {
    it("renders", () => {
      const { getByRole } = render(<FormField disabled />);
      expect(getByRole("textbox")).toHaveAttribute("disabled");
    });
  });

  describe("with a description", () => {
    const label = "This is a hint!";

    it("renders", () => {
      const { getByText } = render(<FormField description={label} />);
      expect(getByText(label)).toBeInTheDocument();
    });

    it("should have assistive descriptor `aria-describedby`", () => {
      const { getByRole } = render(<FormField description={label} />);
      expect(getByRole("textbox")).toHaveAttribute("aria-describedby");
    });

    describe("and inline", () => {
      it("shouldn't display description", () => {
        const { queryByText } = render(
          <FormField description={label} inline />,
        );
        expect(queryByText(label)).not.toBeInTheDocument();
      });

      it("shouldn't have assistive descriptor `aria-describedby`", () => {
        const { getByRole } = render(<FormField description={label} inline />);
        expect(getByRole("textbox")).not.toHaveAttribute("aria-describedby");
      });
    });
  });

  describe("with a controlled value", () => {
    it("should set the value", () => {
      const value = "Look, some words!";
      const { getByDisplayValue } = render(<FormField value={value} />);

      expect(getByDisplayValue(value)).toBeDefined();
    });
  });

  describe("on keystroke", () => {
    describe("enter key", () => {
      it("should trigger onEnter", () => {
        const enterHandler = jest.fn();
        const placeholder = "Milk heals bones";

        const { getByLabelText } = render(
          <FormField
            name="Enter the milk house"
            onEnter={enterHandler}
            placeholder={placeholder}
          />,
        );

        fireEvent.keyDown(getByLabelText(placeholder), {
          key: "Enter",
          code: "Enter",
        });

        expect(enterHandler).toHaveBeenCalledTimes(1);

        fireEvent.keyDown(getByLabelText(placeholder), {
          key: "Enter",
          code: "Enter",
        });

        expect(enterHandler).toHaveBeenCalledTimes(2);
      });
    });

    describe("enter key + shift key", () => {
      it("should not trigger onEnter", () => {
        const enterHandler = jest.fn();
        const placeholder = "Milk heals bones";

        const { getByLabelText } = render(
          <FormField
            name="Enter the milk house"
            onEnter={enterHandler}
            placeholder={placeholder}
          />,
        );

        fireEvent.keyDown(getByLabelText(placeholder), {
          key: "Enter",
          code: "Enter",
          shiftKey: true,
        });

        expect(enterHandler).toHaveBeenCalledTimes(0);
      });
    });

    describe("enter key + ctrl key", () => {
      it("should not trigger onEnter", () => {
        const enterHandler = jest.fn();
        const placeholder = "Milk heals bones";

        const { getByLabelText } = render(
          <FormField
            name="Enter the milk house"
            onEnter={enterHandler}
            placeholder={placeholder}
          />,
        );

        fireEvent.keyDown(getByLabelText(placeholder), {
          key: "Enter",
          code: "Enter",
          ctrlKey: true,
        });

        expect(enterHandler).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("when triggering change", () => {
    it("should trigger onChange", () => {
      const placeholder = "I hold places.";
      const newValue =
        "The snake which cannot cast its skin has to die. As well the minds which are prevented from changing their opinions; they cease to be mind.";
      const newerValue =
        "They always say time changes things, but you actually have to change them yourself.";
      const changeHandler = jest.fn();
      const { getByLabelText } = render(
        <FormField
          name="Got milk?"
          onChange={changeHandler}
          placeholder={placeholder}
        />,
      );

      fireEvent.change(getByLabelText(placeholder), {
        target: { value: newValue },
      });
      expect(changeHandler).toHaveBeenCalledWith(newValue, expect.any(Object));

      fireEvent.change(getByLabelText(placeholder), {
        target: { value: newerValue },
      });
      expect(changeHandler).toHaveBeenCalledWith(
        newerValue,
        expect.any(Object),
      );
    });

    describe("without validation errors", () => {
      it("should trigger onValidation with undefined", () => {
        const validationHandler = jest.fn();

        render(
          <FormField
            name="Got milk?"
            onValidation={validationHandler}
            placeholder="I hold places."
          />,
        );

        expect(validationHandler).toHaveBeenCalled();
        expect(validationHandler).toHaveBeenCalledWith("");
      });
    });

    describe("with validation errors", () => {
      it("should trigger onValidation with error message", async () => {
        const validationHandler = jest.fn();
        const validate = val => (val == "Bob" ? "message" : "foo");

        const { getByLabelText } = render(
          <FormField
            type="text"
            name="Got milk?"
            onValidation={validationHandler}
            placeholder="I hold places"
            validations={{
              validate,
            }}
          />,
        );

        getByLabelText("I hold places").focus();
        fireEvent.change(getByLabelText("I hold places"), {
          target: { value: "Bob" },
        });
        getByLabelText("I hold places").blur();

        await waitFor(() => {
          expect(validationHandler).toHaveBeenCalledWith("message");
        });
      });
    });
  });

  describe("name attribute", () => {
    it("should not have one by default", () => {
      const { getByLabelText } = render(<FormField placeholder="foo" />);
      expect(getByLabelText("foo")).not.toHaveAttribute("name");
    });

    describe("when set", () => {
      it("should set the name", () => {
        const { getByLabelText } = render(
          <FormField placeholder="foo" name="dillan" />,
        );
        expect(getByLabelText("foo")).toHaveAttribute("name", "dillan");
      });
    });

    describe("with validations enabled", () => {
      it("should set the name", () => {
        const { getByLabelText } = render(
          <FormField placeholder="foo" validations={{ required: true }} />,
        );
        const input = getByLabelText("foo");
        const name = input.getAttribute("name");
        expect(name).toContain("generatedName--");
      });
    });
  });

  describe("with keyboard mode", () => {
    it("should set the keyboard inputMode", () => {
      const keyboardMode = "numeric";
      const { getByLabelText } = render(
        <FormField placeholder="foo" keyboard={keyboardMode} />,
      );
      const input = getByLabelText("foo");
      const name = input.getAttribute("inputMode");
      expect(name).toContain(keyboardMode);
    });
  });

  describe("when loading", () => {
    it("should render the spinner", () => {
      const { getByLabelText } = render(
        <FormField placeholder="foo" type="text" loading={true} />,
      );
      const spinner = getByLabelText("loading");

      expect(spinner).toBeInTheDocument();
    });
  });

  describe("when autocomplete", () => {
    describe("when one-time-code", () => {
      it("should set the autocomplete type", () => {
        const { getByLabelText } = render(
          <FormField placeholder="foo" autocomplete={"one-time-code"} />,
        );
        const input = getByLabelText("foo");
        expect(input).toHaveAttribute("autocomplete", "one-time-code");
      });
    });
    describe("when address-line1", () => {
      it("should set the autocomplete type", () => {
        const { getByLabelText } = render(
          <FormField placeholder="foo" autocomplete={"address-line1"} />,
        );
        const input = getByLabelText("foo");
        expect(input).toHaveAttribute("autocomplete", "address-line1");
      });
    });
    describe("when address-line2", () => {
      it("should set the autocomplete type", () => {
        const { getByLabelText } = render(
          <FormField placeholder="foo" autocomplete={"address-line2"} />,
        );
        const input = getByLabelText("foo");
        expect(input).toHaveAttribute("autocomplete", "address-line2");
      });
    });

    describe("when off", () => {
      it("should set the autocomplete type", () => {
        const { getByLabelText } = render(
          <FormField placeholder="foo" autocomplete={false} />,
        );
        const input = getByLabelText("foo");
        expect(input).toHaveAttribute("autocomplete", "off");
      });
    });
  });

  describe("with a prefix", () => {
    it("should render the icon", () => {
      const { getByTestId } = render(<FormField prefix={{ icon: "home" }} />);

      expect(getByTestId("home")).toBeInstanceOf(SVGElement);
    });
  });

  describe("with a suffix", () => {
    it("should render the icon", () => {
      const { getByTestId } = render(<FormField suffix={{ icon: "home" }} />);

      expect(getByTestId("home")).toBeInstanceOf(SVGElement);
    });

    describe("with an onClick", () => {
      it("should trigger", () => {
        const clickHandler = jest.fn();
        const { getByTestId } = render(
          <FormField
            suffix={{
              ariaLabel: "Go home",
              icon: "home",
              onClick: clickHandler,
            }}
          />,
        );

        const icon = getByTestId("home");
        fireEvent.click(icon);

        expect(clickHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
