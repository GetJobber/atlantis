import React from "react";
import { RenderAPI, fireEvent, render } from "@testing-library/react-native";
import { tokens } from "@jobber/design/foundation";
import { AccessibilityInfo } from "react-native";
import { Option, Select } from ".";
import { SelectInternalPicker } from "./components/SelectInternalPicker";

const A11yInfoSpy = jest.spyOn(AccessibilityInfo, "isScreenReaderEnabled");

const onChange = jest.fn();

beforeEach(() => {
  A11yInfoSpy.mockImplementation(() => Promise.resolve(false));
});

afterEach(() => {
  jest.resetAllMocks();
});

const defaultPlaceholder = "Select an option";

describe("Select", () => {
  it("renders a Select", () => {
    const component = render(
      <Select onChange={onChange}>
        <Option value={"one"}>one</Option>
        <Option value={"2"}>2</Option>
      </Select>,
    );
    expect(component.getByTestId("arrowDown")).toBeDefined();
    expect(
      component.getByText(defaultPlaceholder, {
        includeHiddenElements: true,
      }),
    ).toBeDefined();
  });

  it("renders a Select with a label", () => {
    const label = "Press me";
    const { getByText } = render(
      <Select onChange={onChange} label={label}>
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
      </Select>,
    );

    expect(getByText(label, { includeHiddenElements: true })).toBeDefined();
  });

  it("renders a Select with a placeholder", () => {
    const placeholder = "I am a placeholder";
    const { getByText } = render(
      <Select onChange={onChange} placeholder={placeholder}>
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
      </Select>,
    );

    expect(
      getByText(placeholder, { includeHiddenElements: true }),
    ).toBeDefined();
  });

  it("renders a Select with assistive text", () => {
    const assistiveText = "You need to pick something";
    const { getByText } = render(
      <Select onChange={onChange} assistiveText={assistiveText}>
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
      </Select>,
    );
    expect(
      getByText(assistiveText, { includeHiddenElements: true }),
    ).toBeDefined();
  });

  it("renders a disabled Select", () => {
    const labelText = "labelText";
    const { getByText } = render(
      <Select label={labelText} onChange={onChange} disabled={true}>
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
      </Select>,
    );
    expect(
      getByText(labelText, { includeHiddenElements: true }).props.style,
    ).toContainEqual({
      color: tokens["color-disabled"],
    });
  });

  it("renders a Select with a value provided", () => {
    const expectedValue = "That should be me";
    const { getByText } = render(
      <Select onChange={onChange} value={"2"}>
        <Option value={"1"}>1</Option>
        <Option value={"2"}>{expectedValue}</Option>
      </Select>,
    );

    expect(
      getByText(expectedValue, { includeHiddenElements: true }),
    ).toBeDefined();
  });

  it("renders a Select with a defaultValue provided", () => {
    const expectedValue = "It's the 3rd value";
    const { getByText } = render(
      <Select onChange={onChange} defaultValue={"3"}>
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
        <Option value={"3"}>{expectedValue}</Option>
      </Select>,
    );

    expect(
      getByText(expectedValue, { includeHiddenElements: true }),
    ).toBeDefined();
  });

  it("renders a Select with custom testID", () => {
    const testID = "testID";
    const { getByTestId } = render(
      <Select onChange={onChange} testID={testID}>
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
      </Select>,
    );

    expect(getByTestId(`ATL-${testID}-Select`)).toBeDefined();
  });

  it("renders an accessibilityLabel if provided", () => {
    const { getByLabelText } = render(
      <Select
        onChange={onChange}
        label="label"
        accessibilityLabel="accessibilityLabel"
      >
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
      </Select>,
    );

    expect(getByLabelText("accessibilityLabel")).toBeTruthy();
  });
  it("fires the onChange callback", () => {
    const { getByTestId } = render(
      <Select onChange={onChange} value={"2"}>
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
      </Select>,
    );

    const select = getByTestId("ATL-Select").findByType(SelectInternalPicker);
    expect(select).toBeTruthy();
    fireEvent(select, "onChange", "1");
    expect(onChange).toHaveBeenCalledWith("1");
  });
});

describe("when Select is invalid", () => {
  const labelText = "labelText";

  it("renders an invalid Select", () => {
    const { getByText } = render(
      <Select onChange={onChange} invalid={true} label={labelText}>
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
      </Select>,
    );
    expect(
      getByText(labelText, { includeHiddenElements: true }).props.style,
    ).toContainEqual({
      color: tokens["color-critical"],
    });
  });

  it("renders an invalid Select with placeholder", () => {
    const placeholder = "Place me in the holder";
    const { getByText } = render(
      <Select
        label={labelText}
        onChange={onChange}
        invalid={true}
        placeholder={placeholder}
      >
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
      </Select>,
    );

    expect(
      getByText(placeholder, { includeHiddenElements: true }),
    ).toBeDefined();
    expect(
      getByText(labelText, { includeHiddenElements: true }).props.style,
    ).toContainEqual({
      color: tokens["color-critical"],
    });
  });
});

describe("when validations are passed to the component", () => {
  describe("validations fail", () => {
    let tree: RenderAPI;
    const labelText = "labelText";
    const errorMsg = "Too short";
    beforeEach(() => {
      tree = render(
        <Select
          label={labelText}
          onChange={onChange}
          value={"Watermelon"}
          validations={{
            minLength: { value: 60, message: errorMsg },
          }}
        >
          <Option value={"Apple"}>Apple</Option>
          <Option value={"Watermelon"}>Watermelon</Option>
        </Select>,
      );
    });

    it("renders the error message when there is an error", async () => {
      const select = tree
        .getByTestId("ATL-Select")
        .findByType(SelectInternalPicker);
      fireEvent(select, "onChange", "Apple");
      expect(
        await tree.findByText(errorMsg, { includeHiddenElements: true }),
      ).toBeTruthy();
    });

    it("shows the invalid colours", async () => {
      const select = tree
        .getByTestId("ATL-Select")
        .findByType(SelectInternalPicker);
      fireEvent(select, "onChange", "Apple");
      expect(
        (await tree.findByText(labelText, { includeHiddenElements: true }))
          .props.style,
      ).toContainEqual({
        color: tokens["color-critical"],
      });
    });
  });

  describe("validations passes", () => {
    let tree: RenderAPI;
    const labelText = "labelText";
    const errorMsg = "Not too short";
    beforeEach(() => {
      tree = render(
        <Select
          label={labelText}
          onChange={onChange}
          value={"Watermelon"}
          validations={{
            minLength: { value: 4, message: errorMsg },
          }}
        >
          <Option value={"Apple"}>Apple</Option>
          <Option value={"Watermelon"}>Watermelon</Option>
        </Select>,
      );
    });

    it("does not render any error messages", () => {
      const select = tree
        .getByTestId("ATL-Select")
        .findByType(SelectInternalPicker);
      expect(select).toBeTruthy();
      fireEvent(select, "onChange", "Apple");
      expect(tree.queryByText(errorMsg)).toBeNull();
    });

    it("has non-critical colours", () => {
      const select = tree
        .getByTestId("ATL-Select")
        .findByType(SelectInternalPicker);
      fireEvent(select, "onChange", "Apple");
      expect(
        tree.getByText(labelText, { includeHiddenElements: true }).props.style,
      ).toContainEqual({
        color: tokens["color-text--secondary"],
      });
    });
  });
});
