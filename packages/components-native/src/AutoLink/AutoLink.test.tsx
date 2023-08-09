import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { copyTextToClipboard } from "./clipboard";
import { AutoLink } from "./AutoLink";
import { messages } from "./messages";

const mockOpenUrl = jest.fn();
jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openURL: mockOpenUrl,
}));

jest.mock("./clipboard", () => {
  return {
    copyTextToClipboard: jest.fn(),
  };
});

describe("AutoLink", () => {
  beforeEach(() => {
    mockOpenUrl.mockClear();
  });

  describe("Urls", () => {
    it("should find and link url amongst other text", () => {
      const linkText = "getjobber.com";
      const nonLinkText = "The best website is ";
      const { getByText } = render(
        <AutoLink>{`${nonLinkText}${linkText}`}</AutoLink>,
      );
      fireEvent.press(getByText(linkText));
      expect(mockOpenUrl).toHaveBeenCalledWith(`http://${linkText}`);
    });

    it("should find and link a url without other text around it", () => {
      const linkText = "getjobber.com";
      const { getByText } = render(<AutoLink>{linkText}</AutoLink>);
      fireEvent.press(getByText(linkText));
      expect(mockOpenUrl).toHaveBeenCalled();
    });

    it("should copy link onLongPress", () => {
      const linkText = "getjobber.com";
      const nonLinkText = "The best website is ";
      const { getByText } = render(
        <AutoLink>{`${nonLinkText}${linkText}`}</AutoLink>,
      );

      fireEvent(getByText(linkText), "onLongPress");

      const expectedToastConfig = {
        message: messages.urlCopied.defaultMessage,
        bottomTabsVisible: true,
      };
      expect(copyTextToClipboard).toHaveBeenCalledWith(
        `http://${linkText}`,
        expectedToastConfig,
      );
      expect(mockOpenUrl).not.toHaveBeenCalled();
    });

    it("should skip linking url if linkUrls is false", () => {
      const linkText = "getjobber.com";
      const nonLinkText = "The best website is ";
      const { getByText } = render(
        <AutoLink urls={false}>{`${nonLinkText}${linkText}`}</AutoLink>,
      );
      fireEvent.press(getByText(RegExp(linkText, "i")));

      expect(mockOpenUrl).not.toHaveBeenCalled();
    });
  });

  describe("Emails", () => {
    it("should find and link emails in text", () => {
      const nonEmailText = "The best email is ";
      const emailText = "test@example.com";
      const { getByText } = render(
        <AutoLink>{`${nonEmailText}${emailText}`}</AutoLink>,
      );

      fireEvent.press(getByText(emailText));
      expect(mockOpenUrl).toHaveBeenCalledWith(
        `mailto:${encodeURIComponent(emailText)}`,
      );
    });

    it("should find and link an email without other text around it", () => {
      const emailText = "test@example.com";
      const { getByText } = render(<AutoLink>{emailText}</AutoLink>);

      fireEvent.press(getByText(emailText));
      expect(mockOpenUrl).toHaveBeenCalledWith(
        `mailto:${encodeURIComponent(emailText)}`,
      );
    });

    it("should copy email onLongPress", () => {
      const nonEmailText = "The best email is ";
      const emailText = "test@example.com";
      const { getByText } = render(
        <AutoLink>{`${nonEmailText}${emailText}`}</AutoLink>,
      );

      fireEvent(getByText(emailText), "onLongPress");

      const expectedToastConfig = {
        message: messages.emailCopied.defaultMessage,
        bottomTabsVisible: true,
      };
      expect(copyTextToClipboard).toHaveBeenCalledWith(
        emailText,
        expectedToastConfig,
      );
      expect(mockOpenUrl).not.toHaveBeenCalled();
    });

    it("should skip linking email if linkEmails is false", () => {
      const nonEmailText = "The best email is ";
      const emailText = "test@example.com";
      const { getByText } = render(
        <AutoLink email={false}>{`${nonEmailText}${emailText}`}</AutoLink>,
      );
      fireEvent.press(getByText(RegExp(emailText, "i")));

      expect(mockOpenUrl).not.toHaveBeenCalled();
    });
  });

  describe("Phone Numbers", () => {
    it("should find and link phone numbers in text", () => {
      const nonPhoneText = "The best phone number is ";
      const phoneText = "902-555-5555";
      const { getByText } = render(
        <AutoLink>{`${nonPhoneText}${phoneText}`}</AutoLink>,
      );

      const expectedPhone = phoneText.replace(/-/g, "");
      fireEvent.press(getByText(phoneText));
      expect(mockOpenUrl).toHaveBeenCalledWith(`tel:${expectedPhone}`);
    });

    it("should find and link a phone number without other text around it", () => {
      const phoneText = "902-555-5555";
      const { getByText } = render(<AutoLink>{phoneText}</AutoLink>);

      const expectedPhone = phoneText.replace(/-/g, "");
      fireEvent.press(getByText(phoneText));
      expect(mockOpenUrl).toHaveBeenCalledWith(`tel:${expectedPhone}`);
    });

    it("should copy phone number onLongPress", () => {
      const nonPhoneText = "The best phone number is ";
      const phoneText = "902-555-5555";
      const { getByText } = render(
        <AutoLink>{`${nonPhoneText}${phoneText}`}</AutoLink>,
      );

      fireEvent(getByText(phoneText), "onLongPress");

      const expectedToastConfig = {
        message: messages.phoneCopied.defaultMessage,
        bottomTabsVisible: true,
      };
      expect(copyTextToClipboard).toHaveBeenCalledWith(
        phoneText.replace(/-/g, ""),
        expectedToastConfig,
      );
      expect(mockOpenUrl).not.toHaveBeenCalled();
    });

    it("should skip linking phone number if linkPhones is false", () => {
      const nonPhoneText = "The best phone number is ";
      const phoneText = "902-555-5555";
      const { getByText } = render(
        <AutoLink phone={false}>{`${nonPhoneText}${phoneText}`}</AutoLink>,
      );
      fireEvent.press(getByText(RegExp(phoneText, "i")));

      expect(mockOpenUrl).not.toHaveBeenCalled();
    });
  });

  it("should properly link a combination of urls, emails and phone numbers", () => {
    const phoneText = "902-555-5555";
    const emailText = "test@example.com";
    const urlText = "getjobber.com";
    const { getByText } = render(
      <AutoLink>{`${phoneText} ${emailText} ${urlText}`}</AutoLink>,
    );

    const expectedPhone = phoneText.replace(/-/g, "");
    fireEvent.press(getByText(phoneText));
    expect(mockOpenUrl).toHaveBeenCalledWith(`tel:${expectedPhone}`);

    fireEvent.press(getByText(emailText));
    expect(mockOpenUrl).toHaveBeenCalledWith(
      `mailto:${encodeURIComponent(emailText)}`,
    );

    fireEvent.press(getByText(urlText));
    expect(mockOpenUrl).toHaveBeenCalledWith(`http://${urlText}`);
  });
});
