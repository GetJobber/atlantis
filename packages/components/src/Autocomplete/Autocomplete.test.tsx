import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnyOption, CustomOptionsMenuProp } from ".";
import { Autocomplete } from ".";
import type { InputTextRef } from "../InputText";
import { Text } from "../Text";

function returnOptions(options: AnyOption[]) {
  return async () => {
    return Promise.resolve(options);
  };
}

const options = [
  {
    value: "0",
    label: "option_0",
  },
  {
    value: "1",
    label: "option_1",
  },
];

const headingOptions = [
  {
    label: "first_heading",
    options: [
      {
        value: "0",
        label: "option_0",
      },
    ],
  },
  {
    label: "second_heading",
    options: [
      {
        value: "1",
        label: "option_1",
      },
      {
        value: "2",
        label: "option_2",
      },
    ],
  },
];

// eslint-disable-next-line max-statements
describe("Autocomplete", () => {
  it("renders an Autocomplete", async () => {
    const { container } = render(
      <Autocomplete
        value={undefined}
        initialOptions={options}
        onChange={jest.fn()}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should call the getOptions handler with the new value", async () => {
    const placeholder = "my_placeholder";
    const changeHandler = jest.fn();
    const changeOptionsHandler = jest.fn();
    changeOptionsHandler.mockReturnValue(Promise.resolve([]));
    const newValue = "new search value";
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        getOptions={changeOptionsHandler}
        placeholder={placeholder}
      />,
    );

    await userEvent.type(screen.getByLabelText(placeholder), newValue);
    await waitFor(() => {
      expect(changeOptionsHandler).toHaveBeenCalledWith(newValue);
    });
  });

  it("should call the handler when an option is selected", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
      />,
    );
    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(changeHandler).toHaveBeenCalledWith(options[1]);
  });

  it("should display headers when headers are passed in", async () => {
    const { container } = render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={headingOptions}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should call the handler skipping headings when an option is selected", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={headingOptions}
        getOptions={returnOptions(headingOptions)}
        placeholder="placeholder_name"
      />,
    );

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.keyboard("{ArrowDown}{Enter}");

    expect(changeHandler).toHaveBeenCalledWith(headingOptions[1].options[0]);
  });

  it("should remove the menu when blurred", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
      />,
    );

    const input = screen.getByRole("textbox");

    await userEvent.click(input);

    expect(screen.getByText("option_0")).toBeInstanceOf(HTMLParagraphElement);

    await userEvent.tab();

    await waitFor(() => {
      expect(screen.queryByText("option_0")).toBeNull();
    });
  });

  it("should call onBlur callback when blurred", async () => {
    const blurHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
        onBlur={blurHandler}
      />,
    );

    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.tab();

    await waitFor(() => {
      expect(blurHandler).toHaveBeenCalledTimes(1);
    });
  });

  it("should call onChange with undefined if allowFreeForm is false and not matched", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
        allowFreeForm={false}
      />,
    );

    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.type(input, "opt");
    await userEvent.tab();

    await waitFor(() => {
      expect(changeHandler).toHaveBeenCalledWith(undefined);
    });
  });

  it("sets the input value to blank if allowFreeForm is false and not matched", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
        allowFreeForm={false}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.type(input, "opt");
    await userEvent.tab();

    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  it("passes the invalid prop to the InputText", async () => {
    const { container } = render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
        invalid
      />,
    );

    const invalid = container.querySelector(".invalid");

    expect(invalid).toBeInstanceOf(HTMLDivElement);
  });

  it("should focus input text", async () => {
    const placeholder = "Got milk?";

    const textRef = React.createRef<InputTextRef>();

    render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder={placeholder}
        allowFreeForm={false}
        ref={textRef}
      />,
    );

    await waitFor(() => {
      textRef.current?.focus();
      expect(screen.getByLabelText(placeholder)).toHaveFocus();
    });
  });

  it("should scroll into view input text", async () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const placeholder = "Got milk?";

    const textRef = React.createRef<InputTextRef>();

    render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder={placeholder}
        allowFreeForm={false}
        ref={textRef}
      />,
    );

    textRef.current?.scrollIntoView();
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  function RenderCustomMenu({
    options: customOptions,
    MenuWrapper,
  }: CustomOptionsMenuProp) {
    return (
      <MenuWrapper visible={true}>
        {customOptions.map(option => (
          <Text key={option.label}>{option.label}</Text>
        ))}
      </MenuWrapper>
    );
  }
  describe("Custom Menu", () => {
    it("should render the options", () => {
      render(
        <Autocomplete
          value={undefined}
          onChange={jest.fn()}
          placeholder="placeholder_name"
          initialOptions={options}
          getOptions={returnOptions(options)}
          customRenderMenu={props => <RenderCustomMenu {...props} />}
        />,
      );

      expect(screen.getByText(options[0].label)).toBeInstanceOf(
        HTMLParagraphElement,
      );
      expect(screen.getByText(options[0].label)).toBeInstanceOf(
        HTMLParagraphElement,
      );
    });

    it("should provide the inputFocused prop", async () => {
      const mockCustomRenderMenu = jest.fn();
      render(
        <Autocomplete
          value={undefined}
          onChange={jest.fn()}
          placeholder="placeholder_name"
          initialOptions={options}
          getOptions={returnOptions(options)}
          customRenderMenu={mockCustomRenderMenu}
        />,
      );
      const input = screen.getByRole("textbox");

      expect(mockCustomRenderMenu).toHaveBeenCalledWith(
        expect.objectContaining({
          inputFocused: false,
        }),
      );

      await userEvent.click(input);

      expect(mockCustomRenderMenu).toHaveBeenCalledWith(
        expect.objectContaining({
          inputFocused: true,
        }),
      );
    });
  });
});
