import { EmailMatch, Match, PhoneMatch } from "autolinker";
import { MessageDescriptor } from "react-intl";
import { Linking } from "react-native";
import { messages } from "./messages";
import { LinkType } from "./types";
import { copyTextToClipboard } from "./clipboard";

function hasPrefix(text: string, prefixes: string[]): boolean {
  return prefixes.some(prefix => text.includes(prefix));
}

export function shouldIgnoreURL(text: string, match: Match): boolean {
  const matchedText = match.getMatchedText().toLocaleLowerCase();
  const urlPrefixes = ["http://", "https://", "www."];
  const ignorePrefixes = ["file://", "ftp://"];
  const previousChar = text.charAt(match.getOffset() - 1);

  if (match.getType() === "url") {
    const hasUrlPrefix = hasPrefix(matchedText, urlPrefixes);
    const hasIgnorePrefix =
      hasPrefix(matchedText, ignorePrefixes) || previousChar === "/";

    return hasIgnorePrefix && !hasUrlPrefix;
  }

  return false;
}

export function getUrl(match: Match, immediateOpen = true): string {
  const matchType = match.getType();

  switch (matchType) {
    case "email":
      return immediateOpen
        ? `mailto:${encodeURIComponent((match as EmailMatch).getEmail())}`
        : (match as EmailMatch).getEmail();
    case "phone":
      return immediateOpen
        ? `tel:${(match as PhoneMatch).getNumber()}`
        : (match as PhoneMatch).getNumber();
    default:
      return match.getAnchorHref();
  }
}

export function onLongPressLink(
  match: Match,
  bottomTabsVisible: boolean,
  formatMessage: (message: MessageDescriptor) => string,
): void {
  const linkUrl = getUrl(match, false);

  const toastConfig = {
    message: formatMessage(messages[`${match.getType() as LinkType}Copied`]),
    bottomTabsVisible,
  };
  copyTextToClipboard(linkUrl, toastConfig);
}

export function onPressLink(match: Match): void {
  const linkUrl = getUrl(match);
  Linking.openURL(linkUrl);
}
