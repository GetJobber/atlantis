import React from "react";
import { render } from "@testing-library/react-native";
import { Banner } from ".";
import { tokens } from "../utils/design";

describe("Banner", () => {
  it("renders an error Banner", () => {
    const { getByText, getByRole } = render(
      <Banner type="error" text="An error happened" />,
    );
    const alertPressable = getByRole("alert");
    expect(getByText("An error happened")).toBeDefined();
    expect(alertPressable.props.style).toContainEqual({
      backgroundColor: tokens["color-critical--surface"],
    });
  });

  it("renders a warning Banner", () => {
    const { getByText, getByRole } = render(
      <Banner type="warning" text="Here is a warning" />,
    );

    const alertPressable = getByRole("alert");
    expect(getByText("Here is a warning")).toBeDefined();
    expect(alertPressable.props.style).toContainEqual({
      backgroundColor: tokens["color-warning--surface"],
    });
  });

  it("renders a Banner with details", () => {
    const tree = render(
      <Banner type="error" text="You are disconnected" details={["details"]} />,
    );

    expect(tree.getByText("You are disconnected")).toBeDefined();
    expect(tree.getByText("details")).toBeDefined();
  });

  it("renders a Banner with multiple details", () => {
    const tree = render(
      <Banner
        type="error"
        text="You are disconnected"
        details={["details", "etc"]}
      />,
    );

    expect(tree.getByText("details")).toBeDefined();
    expect(tree.getByText("etc")).toBeDefined();
  });
});
