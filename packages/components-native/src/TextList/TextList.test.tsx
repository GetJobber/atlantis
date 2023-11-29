import React from "react";
import { render } from "@testing-library/react-native";
import { TextList } from "./TextList";

describe("TextList", () => {
  describe("when the bulletItems is provided", () => {
    it("displays the text list", () => {
      const items = ["this is list item uno", "this is list item dos"];
      const tree = render(<TextList items={items} />);

      expect(tree.toJSON()).toMatchSnapshot();
    });

    it("displays will not display a bulleted list", () => {
      const tree = render(<TextList />);

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
