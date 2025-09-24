import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Path } from "react-native-svg";
import type { EmptyStateProps } from "./EmptyState";
import { EmptyState } from "./EmptyState";

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

  render(<EmptyState {...props} />);
};

describe("EmptyState", () => {
  it("renders the title", () => {
    component();

    expect(screen.getByText(defaultProps.title)).toBeDefined();
  });

  it("renders the description", () => {
    component();

    expect(screen.getByText(defaultProps.description)).toBeDefined();
  });

  it("renders the icon with default color and large size", () => {
    component();
    const icon = screen.getByTestId(defaultProps.icon);
    const path = icon.findByType(Path);
    expect(path.props.fill).toBe("hsl(197, 90%, 12%)");
    expect(icon.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 32,
          height: 32,
        }),
      ]),
    );
  });

  it("renders the correct icon color when specified", async () => {
    component({ iconColor: "warning" });

    const icon = screen.getByTestId(defaultProps.icon);
    const pathElement = icon.findByType(Path);
    expect(pathElement.props.fill).toBe("hsl(51, 64%, 49%)");
  });

  it("renders the primary action and allows users to interact with it by clicking", () => {
    component();

    const button = screen.getByLabelText(defaultProps.primaryAction.label);
    expect(button).toBeDefined();
    fireEvent.press(button);
    expect(primaryOnPress).toHaveBeenCalledTimes(1);
  });

  it("renders the secondary action and allows users to interact with it by clicking", () => {
    component();

    const button = screen.getByLabelText(defaultProps.secondaryAction.label);
    expect(button).toBeDefined();
    fireEvent.press(button);
    expect(secondaryOnPress).toHaveBeenCalledTimes(1);
  });

  it("does render buttons if neither primary nor secondary action is passed in", () => {
    component({
      description: "No buttons",
      primaryAction: undefined,
      secondaryAction: undefined,
    });

    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
