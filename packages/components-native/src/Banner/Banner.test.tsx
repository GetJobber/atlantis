import React from "react";
import { render } from "@testing-library/react-native";
import { Banner } from ".";

describe("Banner", () => {
  it("renders an error Banner", () => {
    const { getByText, getByTestId } = render(
      <Banner type="error" text="An error happened" />,
    );

    const icon = getByTestId("ATL-Banner-Icon");
    expect(getByText("An error happened")).toBeDefined();
    expect(icon.props.children.props.name).toBe("alert");
  });

  it("renders a warning Banner", () => {
    const { getByText, getByTestId } = render(
      <Banner type="warning" text="Here is a warning" />,
    );

    const icon = getByTestId("ATL-Banner-Icon");
    expect(getByText("Here is a warning")).toBeDefined();
    expect(icon.props.children.props.name).toBe("help");
  });

  it("renders a notice Banner", () => {
    const { getByText, getByTestId } = render(
      <Banner type="notice" text="Notice me" />,
    );

    const icon = getByTestId("ATL-Banner-Icon");
    expect(getByText("Notice me")).toBeDefined();
    expect(icon.props.children.props.name).toBe("starburst");
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
