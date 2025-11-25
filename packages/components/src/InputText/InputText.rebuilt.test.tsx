import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputText } from ".";
import type { InputTextRef } from "./InputText.types";

// eslint-disable-next-line max-statements
describe("InputText V2 (Rebuilt)", () => {
  const value = "";

  it("renders a regular input for text and numbers", () => {
    const { container } = render(
      <InputText
        value={value}
        version={2}
        placeholder="Describe your favourite colour?"
        multiline
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("renders a textarea with 4 rows", () => {
    const { container } = render(
      <InputText
        value={value}
        version={2}
        placeholder="Describe your favourite colour?"
        multiline
        rows={4}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should call the handler with the new value", async () => {
    const placeholder = "I hold places.";
    const newValue =
      "The snake which cannot cast its skin has to die. As well the minds which are prevented from changing their opinions; they cease to be mind.";
    const newerValue =
      "They always say time changes things, but you actually have to change them yourself.";
    const changeHandler = jest.fn();

    const { getByLabelText } = render(
      <InputText
        name="Got milk?"
        value={value}
        version={2}
        onChange={changeHandler}
        placeholder={placeholder}
      />,
    );

    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newValue },
    });
    expect(changeHandler).toHaveBeenCalledWith(newValue, expect.anything());

    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newerValue },
    });
    expect(changeHandler).toHaveBeenCalledWith(newerValue, expect.anything());
  });

  it("should render text description", () => {
    const description = "This is a description";
    render(
      <InputText
        value={value}
        version={2}
        placeholder="Favourite colour"
        description={description}
      />,
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should render markup description", () => {
    const testId = "i-am-a-description";
    const element = <div data-testid={testId} />;
    render(
      <InputText
        value={value}
        version={2}
        placeholder="Favourite colour"
        description={element}
      />,
    );
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  describe("focusing", () => {
    it("should focus input text", () => {
      const placeholder = "Got milk?";

      const textRef = React.createRef<InputTextRef>();

      const { getByLabelText } = render(
        <InputText
          placeholder={placeholder}
          ref={textRef}
          version={2}
          value={value}
        />,
      );

      textRef.current?.focus();
      expect(getByLabelText(placeholder)).toHaveFocus();
    });

    it("supports the autoFocus attribute", async () => {
      const placeholder = "Got milk?";

      const { getByLabelText } = render(
        <InputText
          placeholder={placeholder}
          autoFocus
          version={2}
          value={value}
        />,
      );

      expect(getByLabelText(placeholder)).toHaveFocus();
    });
  });

  it("should scroll into view input text", () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const placeholder = "Got milk?";

    const textRef = React.createRef<InputTextRef>();

    render(
      <InputText
        version={2}
        value={value}
        placeholder={placeholder}
        ref={textRef}
      />,
    );

    textRef.current?.scrollIntoView();
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  describe("toolbar", () => {
    describe("without toolbar", () => {
      it("should not render toolbar", () => {
        render(
          <InputText
            placeholder="Favourite colour"
            version={2}
            value={value}
          />,
        );
        expect(
          screen.queryByTestId("ATL-InputText-Toolbar"),
        ).not.toBeInTheDocument();
      });
    });
    describe("with toolbar and toolbarVisibility always", () => {
      it("should always render toolbar", () => {
        render(
          <InputText
            placeholder="Favourite movie"
            version={2}
            value={value}
            toolbar={<h1>Bar Of Tool</h1>}
            toolbarVisibility="always"
          />,
        );
        expect(screen.getByTestId("ATL-InputText-Toolbar")).toBeInTheDocument();
      });
    });

    describe("with toolbar and toolbarVisibility focus-within", () => {
      it("should only render toolbar when focused", () => {
        render(
          <InputText
            version={2}
            value={value}
            placeholder="Favourite movie"
            toolbar={<h1>Bar Of Tool</h1>}
          />,
        );
        expect(
          screen.queryByTestId("ATL-InputText-Toolbar"),
        ).not.toBeInTheDocument();

        const input = screen.getByLabelText("Favourite movie");
        fireEvent.focus(input);

        expect(screen.getByTestId("ATL-InputText-Toolbar")).toBeInTheDocument();
      });
    });
    describe("with multiline", () => {
      describe("with toolbar and toolbarVisibility focus-within", () => {
        it("should only render toolbar when focused", () => {
          render(
            <InputText
              version={2}
              value={value}
              placeholder="Favourite movie"
              toolbar={<h1>Bar Of Tool</h1>}
              multiline
            />,
          );
          expect(
            screen.queryByTestId("ATL-InputText-Toolbar"),
          ).not.toBeInTheDocument();

          const input = screen.getByLabelText("Favourite movie");
          fireEvent.focus(input);

          expect(
            screen.getByTestId("ATL-InputText-Toolbar"),
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("Shared HTMLInputBaseProps", () => {
    it("should render with id attribute", () => {
      render(
        <InputText version={2} value={value} placeholder="Text" id="text-id" />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "text-id");
    });

    it("should render with name attribute", () => {
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          name="text-name"
        />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "text-name");
    });

    it("should be disabled when disabled prop is true", () => {
      render(
        <InputText version={2} value={value} placeholder="Text" disabled />,
      );
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("should not allow typing when disabled", async () => {
      const changeHandler = jest.fn();
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          disabled
          onChange={changeHandler}
        />,
      );
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "test");
      expect(changeHandler).not.toHaveBeenCalled();
    });

    it("should be read-only when readOnly prop is true", () => {
      render(
        <InputText version={2} value="some text" placeholder="Text" readOnly />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    });

    it("should not allow typing when readOnly", async () => {
      const changeHandler = jest.fn();
      render(
        <InputText
          version={2}
          value="some text"
          placeholder="Text"
          readOnly
          onChange={changeHandler}
        />,
      );
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "more");
      expect(changeHandler).not.toHaveBeenCalled();
    });

    it("should render with pattern attribute", () => {
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          pattern="[A-Za-z]+"
        />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "pattern",
        "[A-Za-z]+",
      );
    });

    it("should render with inputMode attribute", () => {
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          inputMode="numeric"
        />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "inputmode",
        "numeric",
      );
    });

    it("should render with tabIndex attribute", () => {
      render(
        <InputText version={2} value={value} placeholder="Text" tabIndex={5} />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute("tabindex", "5");
    });
  });

  describe("Shared RebuiltInputCommonProps", () => {
    it("should display error message", () => {
      const errorMessage = "Invalid input";
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          error={errorMessage}
        />,
      );
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("should apply invalid styling when invalid prop is true", () => {
      const { container } = render(
        <InputText version={2} value={value} placeholder="Text" invalid />,
      );
      const wrapper = container.querySelector('[class*="wrapper"]');
      expect(wrapper).toHaveClass("invalid");
    });

    it("should apply loading spinner class when loading prop is true", () => {
      const { container } = render(
        <InputText version={2} value={value} placeholder="Text" loading />,
      );
      expect(container.querySelector('[class*="spinner"]')).toBeTruthy();
    });

    it("should render with clearable always", async () => {
      const changeHandler = jest.fn();
      render(
        <InputText
          version={2}
          value="some text"
          placeholder="Text"
          clearable="always"
          onChange={changeHandler}
        />,
      );
      const clearButton = screen.getByTestId("ATL-FormField-clearButton");
      await userEvent.click(clearButton);
      expect(changeHandler).toHaveBeenCalledWith("");
    });

    it("should apply small size class", () => {
      const { container } = render(
        <InputText version={2} value={value} placeholder="Text" size="small" />,
      );
      const wrapper = container.querySelector('[class*="wrapper"]');
      expect(wrapper).toHaveClass("small");
    });

    it("should apply large size class", () => {
      const { container } = render(
        <InputText version={2} value={value} placeholder="Text" size="large" />,
      );
      const wrapper = container.querySelector('[class*="wrapper"]');
      expect(wrapper).toHaveClass("large");
    });

    it("should apply inline class", () => {
      const { container } = render(
        <InputText version={2} value={value} placeholder="Text" inline />,
      );
      const containerEl = container.querySelector('[class*="container"]');
      expect(containerEl).toHaveClass("inline");
    });

    it("should render with prefix", () => {
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          prefix={{ label: "$" }}
        />,
      );
      expect(screen.getByText("$")).toBeInTheDocument();
    });

    it("should render with suffix", () => {
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          suffix={{ label: "USD" }}
        />,
      );
      expect(screen.getByText("USD")).toBeInTheDocument();
    });
  });

  describe("Event handlers", () => {
    it("should call onFocus when input is focused", async () => {
      const focusHandler = jest.fn();
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          onFocus={focusHandler}
        />,
      );
      await userEvent.click(screen.getByRole("textbox"));
      expect(focusHandler).toHaveBeenCalledTimes(1);
    });

    it("should call onBlur when input loses focus", async () => {
      const blurHandler = jest.fn();
      render(
        <>
          <InputText
            version={2}
            value={value}
            placeholder="Text"
            onBlur={blurHandler}
          />
          <button type="button" data-testid="other-element">
            Other
          </button>
        </>,
      );
      const input = screen.getByRole("textbox");
      await userEvent.click(input);
      await userEvent.click(screen.getByTestId("other-element"));
      expect(blurHandler).toHaveBeenCalledTimes(1);
    });

    it("should call onKeyDown when key is pressed", async () => {
      const keyDownHandler = jest.fn();
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          onKeyDown={keyDownHandler}
        />,
      );
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "a");
      expect(keyDownHandler).toHaveBeenCalled();
    });

    it("should call onKeyUp when key is released", async () => {
      const keyUpHandler = jest.fn();
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          onKeyUp={keyUpHandler}
        />,
      );
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "a");
      expect(keyUpHandler).toHaveBeenCalled();
    });
  });

  describe("ARIA attributes", () => {
    it("should render with aria-label", () => {
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          aria-label="Custom label"
        />,
      );
      expect(screen.getByRole("textbox")).toHaveAccessibleName("Custom label");
    });

    it("should render with aria-describedby", () => {
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          aria-describedby="description-id"
        />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        "description-id",
      );
    });

    it("should render with aria-required", () => {
      render(
        <InputText
          version={2}
          value={value}
          placeholder="Text"
          aria-required="true"
        />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-required",
        "true",
      );
    });
  });
});
