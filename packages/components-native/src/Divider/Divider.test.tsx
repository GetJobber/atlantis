import React from "react";
import { render, renderHook } from "@testing-library/react-native";
import { Divider } from "./Divider";
import { useHorizontalStyles } from "./DividerHorizontal.style";
import { useVerticalStyles } from "./DividerVertical.style";

const dividerTestId = "Divider";

let horizontalStyles: ReturnType<typeof useHorizontalStyles>;
let verticalStyles: ReturnType<typeof useVerticalStyles>;

beforeAll(() => {
  horizontalStyles = renderHook(() => useHorizontalStyles()).result.current;
  verticalStyles = renderHook(() => useVerticalStyles()).result.current;
});

describe("Divider", () => {
  it("uses the given testID", () => {
    const dividerTestID = "divider-test";
    const { getByTestId } = render(<Divider testID={dividerTestID} />);
    expect(getByTestId(dividerTestID)).toBeDefined();
  });

  describe("Horizontal", () => {
    it("renders a default Divider", () => {
      const { getByTestId } = render(<Divider />);
      const dividerStyle = getByTestId(dividerTestId).props.style;
      expect(dividerStyle).toContainEqual(horizontalStyles.base);
      expect(dividerStyle).not.toContainEqual(horizontalStyles.large);
      expect(dividerStyle).not.toContainEqual(horizontalStyles.largest);
    });

    it("renders a large Divider", () => {
      const { getByTestId } = render(<Divider size="large" />);
      const dividerStyle = getByTestId(dividerTestId).props.style;
      expect(dividerStyle).toContainEqual(horizontalStyles.base);
      expect(dividerStyle).toContainEqual(horizontalStyles.large);
      expect(dividerStyle).not.toContainEqual(horizontalStyles.largest);
    });

    it("renders a largest Divider", () => {
      const { getByTestId } = render(<Divider size="largest" />);
      const dividerStyle = getByTestId(dividerTestId).props.style;
      expect(dividerStyle).toContainEqual(horizontalStyles.base);
      expect(dividerStyle).not.toContainEqual(horizontalStyles.large);
      expect(dividerStyle).toContainEqual(horizontalStyles.largest);
    });
  });

  describe("Vertical", () => {
    it("renders a default Divider", () => {
      const { getByTestId } = render(<Divider direction="vertical" />);
      const dividerStyle = getByTestId(dividerTestId).props.style;
      expect(dividerStyle).toContainEqual(verticalStyles.base);
      expect(dividerStyle).not.toContainEqual(verticalStyles.large);
      expect(dividerStyle).not.toContainEqual(verticalStyles.largest);
    });

    it("renders a large Divider", () => {
      const { getByTestId } = render(
        <Divider direction="vertical" size="large" />,
      );
      const dividerStyle = getByTestId(dividerTestId).props.style;
      expect(dividerStyle).toContainEqual(verticalStyles.base);
      expect(dividerStyle).toContainEqual(verticalStyles.large);
      expect(dividerStyle).not.toContainEqual(verticalStyles.largest);
    });

    it("renders a largest Divider", () => {
      const { getByTestId } = render(
        <Divider direction="vertical" size="largest" />,
      );
      const dividerStyle = getByTestId(dividerTestId).props.style;
      expect(dividerStyle).toContainEqual(verticalStyles.base);
      expect(dividerStyle).not.toContainEqual(verticalStyles.large);
      expect(dividerStyle).toContainEqual(verticalStyles.largest);
    });
  });
});
