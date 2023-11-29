import React from "react";
import { render } from "@testing-library/react-native";
import { FormErrorBanner } from "./FormErrorBanner";
import { atlantisContextDefaultValues } from "../../../AtlantisContext";
import * as atlantisContext from "../../../AtlantisContext/AtlantisContext";

afterEach(jest.clearAllMocks);

describe("FormErrorBanner", () => {
  const atlantisContextSpy = jest.spyOn(atlantisContext, "useAtlantisContext");

  beforeEach(() => {
    atlantisContextSpy.mockReturnValue({
      ...atlantisContextDefaultValues,
      isOnline: true,
    });
  });

  const networkError = "An error occurred";
  const userError = {
    title: "My error",
    messages: ["userError1", "userError2"],
  };
  const couldNotSavechanges = "Could not save changes";

  it("should render network error banner when online and network errors exist", () => {
    const { getByText, queryByText } = render(
      <FormErrorBanner networkError={networkError} bannerError={userError} />,
    );

    // Show: Network Error only
    expect(getByText(couldNotSavechanges)).toBeDefined();
    expect(queryByText(userError.title)).toBeNull();
  });

  it("should render user error banner when online and user errors exist", () => {
    const { getByText, queryByText } = render(
      <FormErrorBanner bannerError={userError} />,
    );

    // Show: User Error only
    expect(getByText(userError.title)).toBeDefined();
    expect(getByText(userError.messages[0])).toBeDefined();
    expect(getByText(userError.messages[1])).toBeDefined();
    expect(queryByText(couldNotSavechanges)).toBeNull();
  });

  it("should render user error banner with just title when online", () => {
    const userErrorJustTitle = {
      title: "My error",
    };
    const { getByText, queryByText } = render(
      <FormErrorBanner bannerError={userErrorJustTitle} />,
    );

    // Show: User Error only
    expect(getByText(userErrorJustTitle.title)).toBeDefined();
    expect(queryByText(couldNotSavechanges)).toBeNull();
  });
});
