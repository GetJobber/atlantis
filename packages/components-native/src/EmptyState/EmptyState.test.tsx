import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { EmptyState, EmptyStateProps } from "./EmptyState";
import * as IconComponent from "../Icon/Icon";

const primaryOnPress = jest.fn();
const secondaryOnPress = jest.fn();

const defaultProps = {
  icon: "home",
  title: "Title",
  description: "Description",
  primaryAction: {
    label: "Click Me",
    onPress: primaryOnPress,
  },
  secondaryAction: {
    label: "Don't Forget About Me",
    onPress: secondaryOnPress,
  },
};

const component = (overrideProps?: Partial<EmptyStateProps>) => {
  const props = {
    ...(defaultProps as EmptyStateProps),
    ...overrideProps,
  };

  return render(<EmptyState {...props} />);
};

const iconSpy = jest.spyOn(IconComponent, "Icon");

afterEach(() => jest.clearAllMocks());

describe("EmptyState", () => {
  it("renders the title", () => {
    const { getByText } = component();

    expect(getByText(defaultProps.title)).toBeDefined();
  });

  it("renders the description", () => {
    const { getByText } = component();

    expect(getByText(defaultProps.description)).toBeDefined();
  });

  it("renders the icon", () => {
    const { getByTestId } = component();

    expect(getByTestId(defaultProps.icon)).toBeDefined();
  });

  it("calls icon with correct default params", () => {
    component();

    expect(iconSpy).toHaveBeenCalledWith(
      {
        color: "blue",
        name: defaultProps.icon,
        size: "large",
      },
      {},
    );
  });

  it("calls icon with correct params", () => {
    component({ iconColor: "greyBlue", icon: "link" });

    expect(iconSpy).toHaveBeenCalledWith(
      {
        color: "greyBlue",
        name: "link",
        size: "large",
      },
      {},
    );
  });

  it("renders the primary action and allows users to interact with it by clicking", () => {
    const { getByLabelText } = component();

    const button = getByLabelText(defaultProps.primaryAction.label);
    expect(button).toBeDefined();
    fireEvent.press(button);
    expect(primaryOnPress).toHaveBeenCalledTimes(1);
  });

  it("renders the secondary action and allows users to interact with it by clicking", () => {
    const { getByLabelText } = component();

    const button = getByLabelText(defaultProps.secondaryAction.label);
    expect(button).toBeDefined();
    fireEvent.press(button);
    expect(secondaryOnPress).toHaveBeenCalledTimes(1);
  });

  it("does render buttons if neither primary nor secondary action is passed in", () => {
    const { queryAllByRole } = component({
      description: "No buttons",
      primaryAction: undefined,
      secondaryAction: undefined,
    });

    expect(queryAllByRole("button")).toHaveLength(0);
  });
});
