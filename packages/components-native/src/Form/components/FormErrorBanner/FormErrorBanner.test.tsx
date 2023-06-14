import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import { useIntl } from "react-intl";
import { FormErrorBanner } from "./FormErrorBanner";
import { messages as formErrorBannerMessages } from "./messages";
import { defaultValues as contextDefaultValue } from "../../../AtlantisContext";
import * as atlantisContext from "../../../AtlantisContext/AtlantisContext";

describe("FormErrorBanner", () => {
  const atlantisContextSpy = jest.spyOn(atlantisContext, "useAtlantisContext");

  beforeEach(() => {
    atlantisContextSpy.mockReturnValue({
      ...contextDefaultValue,
      isOnline: true,
    });
  });

  const { formatMessage } = useIntl();
  const networkError = new Error();
  const userError = {
    title: "My error",
    messages: ["userError1", "userError2"],
  };
  const validationErrors = [
    "This is the first validation error",
    "This is the second validation error",
  ];

  it("should render Offline banner when offline", () => {
    atlantisContextSpy.mockReturnValue({
      ...contextDefaultValue,
      isOnline: false,
    });
    const { getByText, queryByText } = render(
      <FormErrorBanner
        // @ts-expect-error tsc-ci
        networkError={networkError}
        bannerError={userError}
        validationErrors={validationErrors}
        actionLabel="Action"
      />,
    );

    // Show: Offline Message
    expect(
      getByText(formatMessage(formErrorBannerMessages.offlineError)),
    ).toBeDefined();

    // Hide: Network Error, User Error, Validation Error
    expect(
      queryByText(formatMessage(formErrorBannerMessages.networkError)),
    ).toBeNull();

    expect(queryByText(userError.title)).toBeNull();
  });

  it("should render network error banner when online and network errors exist", () => {
    const { getByText, queryByText } = render(
      <FormErrorBanner
        // @ts-expect-error tsc-ci
        networkError={networkError}
        bannerError={userError}
        actionLabel="action"
      />,
    );

    // Show: Network Error
    expect(
      getByText(formatMessage(formErrorBannerMessages.networkError)),
    ).toBeDefined();

    // Hide: Offline Message, User Error, Validation Error
    expect(
      queryByText(formatMessage(formErrorBannerMessages.offlineError)),
    ).toBeNull();

    expect(queryByText(userError.title)).toBeNull();
  });

  it("should render user error banner when online and user errors exist", () => {
    const { getByText, queryByText } = render(
      <FormErrorBanner bannerError={userError} />,
    );

    // Show: User Error
    expect(getByText(userError.title)).toBeDefined();
    expect(getByText(userError.messages[0])).toBeDefined();
    expect(getByText(userError.messages[1])).toBeDefined();

    // Hide: Offline Message, Network Error, Validation Error
    expect(
      queryByText(formatMessage(formErrorBannerMessages.offlineError)),
    ).toBeNull();

    expect(
      queryByText(formatMessage(formErrorBannerMessages.networkError)),
    ).toBeNull();
  });

  it("should render user error banner with just title when online", () => {
    const userErrorJustTitle = {
      title: "My error",
    };
    const { getByText, queryByText } = render(
      <FormErrorBanner bannerError={userErrorJustTitle} />,
    );

    // Show: User Error
    expect(getByText(userErrorJustTitle.title)).toBeDefined();

    // Hide: Offline Message, Network Error, Validation Error
    expect(
      queryByText(formatMessage(formErrorBannerMessages.offlineError)),
    ).toBeNull();

    expect(
      queryByText(formatMessage(formErrorBannerMessages.networkError)),
    ).toBeNull();
  });
});

afterEach(jest.clearAllMocks);
afterEach(cleanup);
