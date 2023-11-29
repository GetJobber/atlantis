import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ViewStyle } from "react-native";
import { Switch } from "./Switch";

it("renders a labeled Switch with value true", () => {
  const { getByLabelText } = render(
    <Switch value={true} label="true switch" />,
  );
  const valueProp = getByLabelText("true switch").props.value;
  expect(valueProp).toEqual(true);
});

it("renders a labeled Switch with value false", () => {
  const { getByLabelText } = render(
    <Switch value={false} label="false switch" />,
  );
  const valueProp = getByLabelText("false switch").props.value;
  expect(valueProp).toEqual(false);
});

it("renders an unlabeled Switch with value true", () => {
  const { getByRole } = render(<Switch value={true} />);
  const valueProp = getByRole("switch").props.value;
  expect(valueProp).toEqual(true);
});

it("renders an unlabeled Switch with value false", () => {
  const { getByRole } = render(<Switch value={false} />);
  const valueProp = getByRole("switch").props.value;
  expect(valueProp).toEqual(false);
});

describe("description", () => {
  it("renders a Switch with label and description", () => {
    const { getByText } = render(
      <Switch label="Label" description="Description" />,
    );

    expect(getByText("Label")).toBeDefined();
    expect(getByText("Description")).toBeDefined();
  });

  it("matches the width of the label and description", () => {
    const { getByTestId } = render(
      <Switch label="Label" description="Description" />,
    );
    const labelView = getByTestId("switch-label-view");
    const descriptionView = getByTestId("switch-description-view");

    fireEvent(labelView, "onLayout", {
      nativeEvent: {
        layout: {
          width: 123,
        },
      },
    });

    const flattenedStyle = descriptionView.props.style.reduce(
      (style: ViewStyle, additionalStyles: ViewStyle) => ({
        ...style,
        ...additionalStyles,
      }),
      {},
    );
    expect(flattenedStyle).toEqual(
      expect.objectContaining({
        maxWidth: 123,
      }),
    );
  });
});

describe("accessibilityLabel", () => {
  it("uses accessibilityLabel if specified", () => {
    const { getByLabelText } = render(
      <Switch
        value={true}
        label="label"
        accessibilityLabel="accessibilityLabel"
      />,
    );

    expect(getByLabelText("accessibilityLabel")).toBeTruthy();
  });

  it("uses placeholder if unspecified", () => {
    const { getByLabelText } = render(<Switch value={true} label="label" />);

    expect(getByLabelText("label")).toBeTruthy();
  });

  it("unavailable if unspecified", () => {
    const { queryByLabelText } = render(<Switch value={true} />);

    expect(queryByLabelText("label")).not.toBeTruthy();
  });
});
