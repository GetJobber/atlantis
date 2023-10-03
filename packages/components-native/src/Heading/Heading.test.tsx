import React from "react";
import { render } from "@testing-library/react-native";
import { Heading } from "./Heading";

describe("when Heading called with text as the only prop", () => {
  it("should match snapshot", () => {
    const view = render(<Heading>Default Heading</Heading>).toJSON();

    expect(view).toMatchSnapshot();
  });
});

describe("when Heading called with reverseTheme", () => {
  it("should match snapshot", () => {
    const view = render(
      <Heading reverseTheme>Reverse Theme Heading</Heading>,
    ).toJSON();

    expect(view).toMatchSnapshot();
  });
});

describe("when Heading called with title variation", () => {
  it("should match snapshot", () => {
    const view = render(
      <Heading level={"title"}>Title Heading</Heading>,
    ).toJSON();

    expect(view).toMatchSnapshot();
  });
});

describe("when Heading called with Subtitle variation", () => {
  it("should match snapshot", () => {
    const view = render(
      <Heading level={"subtitle"}>Subtitle</Heading>,
    ).toJSON();

    expect(view).toMatchSnapshot();
  });
});

describe("when Heading called with sub-heading variation", () => {
  it("should match snapshot", () => {
    const view = render(
      <Heading level={"subHeading"}>Sub-Heading</Heading>,
    ).toJSON();

    expect(view).toMatchSnapshot();
  });
});

describe("when Heading called with sub-heading variation and text-color", () => {
  it("should match snapshot", () => {
    const view = render(
      <Heading level={"subHeading"} variation={"subdued"}>
        Sub-Heading
      </Heading>,
    ).toJSON();

    expect(view).toMatchSnapshot();
  });
});

describe("when Heading called with an alignment", () => {
  it("should match snapshot", () => {
    const view = render(
      <Heading align={"end"}>Text Aligned Right</Heading>,
    ).toJSON();

    expect(view).toMatchSnapshot();
  });
});

describe("when Heading called with maxLines", () => {
  it("should match snapshot", () => {
    const view = render(
      <Heading maxLines="single">Text Aligned Right</Heading>,
    ).toJSON();

    expect(view).toMatchSnapshot();
  });
});
