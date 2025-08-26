import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { InputText } from ".";
import type { InputTextRef } from "./InputText.types";

describe("InputText Version 1", () => {
  it("renders a regular input for text and numbers", () => {
    const { container } = render(<InputText placeholder="Favourite colour" />);
    expect(container).toMatchSnapshot();
  });

  it("renders a textarea", () => {
    const { container } = render(
      <InputText placeholder="Describe your favourite colour?" multiline />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders a textarea with 4 rows", () => {
    const { container } = render(
      <InputText
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
        onChange={changeHandler}
        placeholder={placeholder}
      />,
    );

    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newValue },
    });
    expect(changeHandler).toHaveBeenCalledWith(newValue);

    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newerValue },
    });
    expect(changeHandler).toHaveBeenCalledWith(newerValue);
  });

  it("should handle inserting text", () => {
    const initial = "Got milk?";
    const result = `${initial}YUP`;
    const secondResult = `${initial}YUPsure`;

    const textRef = React.createRef<InputTextRef>();
    const changeHandler = jest.fn();

    render(
      <InputText value={initial} onChange={changeHandler} ref={textRef} />,
    );

    textRef.current?.insert("YUP");
    expect(changeHandler).toHaveBeenCalledWith(result);

    textRef.current?.insert("sure");
    expect(changeHandler).toHaveBeenCalledWith(secondResult);
  });

  describe("focusing", () => {
    it("should focus input text", () => {
      const placeholder = "Got milk?";

      const textRef = React.createRef<InputTextRef>();

      const { getByLabelText } = render(
        <InputText placeholder={placeholder} ref={textRef} />,
      );

      textRef.current?.focus();
      expect(getByLabelText(placeholder)).toHaveFocus();
    });

    it("supports the autofocus attribute", async () => {
      const placeholder = "Got milk?";

      const { getByLabelText } = render(
        <InputText placeholder={placeholder} autofocus />,
      );

      expect(getByLabelText(placeholder)).toHaveFocus();
    });
  });

  it("should scroll into view input text", () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const placeholder = "Got milk?";

    const textRef = React.createRef<InputTextRef>();

    render(<InputText placeholder={placeholder} ref={textRef} />);

    textRef.current?.scrollIntoView();
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  describe("toolbar", () => {
    describe("without toolbar", () => {
      it("should not render toolbar", () => {
        render(<InputText placeholder="Favourite colour" />);
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
});

describe("InputText V2", () => {
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

    it("supports the autofocus attribute", async () => {
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
});
