import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import {
  InternalButtonLoading,
  darkPattern,
  lightPattern,
} from "./InternalButtonLoading";
import { ButtonType, ButtonVariation } from "../../types";

afterEach(cleanup);

describe("Loading pattern", () => {
  it.each<[string, ButtonType, ButtonVariation]>([
    [lightPattern, "primary", "work"],
    [lightPattern, "primary", "destructive"],
    [lightPattern, "primary", "learning"],
    [darkPattern, "primary", "cancel"],
    [darkPattern, "secondary", "cancel"],
    [darkPattern, "secondary", "work"],
    [darkPattern, "secondary", "destructive"],
    [darkPattern, "secondary", "learning"],
    [darkPattern, "tertiary", "cancel"],
    [darkPattern, "tertiary", "work"],
    [darkPattern, "tertiary", "destructive"],
    [darkPattern, "tertiary", "learning"],
  ])(
    "should render a %s pattern on %s %s combination",
    (pattern, type, variation) => {
      const { getByTestId } = render(
        <InternalButtonLoading type={type} variation={variation} />,
      );

      const component = getByTestId("loadingImage");
      expect(component.props.source).toMatchObject({
        uri: expect.stringContaining(pattern),
      });
    },
  );
});
