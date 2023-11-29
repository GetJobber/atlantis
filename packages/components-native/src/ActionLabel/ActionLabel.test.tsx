import React, { CSSProperties } from "react";
import { render } from "@testing-library/react-native";
import { ReactTestInstance } from "react-test-renderer";
import { ActionLabel } from "./ActionLabel";
import { tokens } from "../utils/design";

const defaultStyles = {
  fontFamily: "inter-extrabold",
  color: tokens["color-interactive"],
  textAlign: "center",
  fontSize: tokens["typography--fontSize-base"],
  lineHeight: tokens["typography--lineHeight-tight"],
  letterSpacing: tokens["typography--letterSpacing-loose"],
};

describe("ActionLabel", () => {
  it("renders the default action label", () => {
    const text = "Default Action Label";
    const { getByText } = render(<ActionLabel>{text}</ActionLabel>);

    const el = getByText(text);
    expect(el).toBeDefined();
    expect(getStyleObject(el)).toMatchObject(defaultStyles);
  });

  describe("Variations", () => {
    it("renders a destructive variation", () => {
      const text = "Destructive Action Label";
      const { getByText } = render(
        <ActionLabel variation="destructive">{text}</ActionLabel>,
      );

      expect(getStyleObject(getByText(text))).toMatchObject({
        ...defaultStyles,
        color: tokens["color-destructive"],
      });
    });

    it("renders a learning variation", () => {
      const text = "Learning Action Label";
      const { getByText } = render(
        <ActionLabel variation="learning">{text}</ActionLabel>,
      );

      expect(getStyleObject(getByText(text))).toMatchObject({
        ...defaultStyles,
        color: tokens["color-informative"],
      });
    });

    it("renders a subtle variation", () => {
      const text = "Subtle Action Label";
      const { getByText } = render(
        <ActionLabel variation="subtle">{text}</ActionLabel>,
      );

      expect(getStyleObject(getByText(text))).toMatchObject({
        ...defaultStyles,
        color: tokens["color-interactive--subtle"],
      });
    });

    it("renders an onPrimary variation", () => {
      const text = "onPrimary Action Label";
      const { getByText } = render(
        <ActionLabel variation="onPrimary">{text}</ActionLabel>,
      );

      expect(getStyleObject(getByText(text))).toMatchObject({
        ...defaultStyles,
        color: tokens["color-surface"],
      });
    });
  });

  describe("when action label is disabled", () => {
    it("renders text with disabled color, overriding variation", () => {
      const text = "Disabled Action Label";
      const { getByText } = render(
        <ActionLabel disabled variation="destructive">
          {text}
        </ActionLabel>,
      );

      const styles = getStyleObject(getByText(text));
      expect(styles).toMatchObject({
        ...defaultStyles,
        color: tokens["color-disabled"],
      });
      expect(styles).not.toHaveProperty("color", tokens["color-destructive"]);
    });
  });

  describe("when action label is aligned", () => {
    it("renders text with left alignment", () => {
      const text = "Left Aligned Action Label";
      const { getByText } = render(
        <ActionLabel align="start">{text}</ActionLabel>,
      );

      expect(getStyleObject(getByText(text))).toMatchObject({
        ...defaultStyles,
        textAlign: "left",
      });
    });

    it("renders text with right alignment", () => {
      const text = "Right Aligned Action Label";
      const { getByText } = render(
        <ActionLabel align="end">{text}</ActionLabel>,
      );

      expect(getStyleObject(getByText(text))).toMatchObject({
        ...defaultStyles,
        textAlign: "right",
      });
    });
  });
});

function getStyleObject(el: ReactTestInstance) {
  return el.props.style.reduce(
    (mergedStyles: CSSProperties, additionalStyles: CSSProperties) => ({
      ...mergedStyles,
      ...additionalStyles,
    }),
    {},
  );
}
