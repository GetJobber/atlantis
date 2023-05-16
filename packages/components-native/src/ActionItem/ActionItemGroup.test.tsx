import React from "react";
import { render } from "@testing-library/react-native";
import { ActionItemGroup } from "./ActionItemGroup";
import { Text } from "../Text";

describe("ActionItemGroup", () => {
  const dividerTestId = "Divider";

  describe("Separate By Dividers", () => {
    it("should display dividers between children", () => {
      const text = "Get out of my swamp";
      const { queryAllByTestId } = render(
        <ActionItemGroup>
          <Text>{text}</Text>
          <Text>{text}</Text>
          <Text>{text}</Text>
        </ActionItemGroup>,
      );
      const dividers = queryAllByTestId(dividerTestId);
      expect(dividers).toHaveLength(2);
    });

    it("should not display divider when only 1 child", () => {
      const text = "Get out of my swamp";
      const { queryByTestId } = render(
        <ActionItemGroup>
          <Text>{text}</Text>
        </ActionItemGroup>,
      );
      const dividers = queryByTestId(dividerTestId);
      expect(dividers).toBeFalsy();
    });
  });
});
