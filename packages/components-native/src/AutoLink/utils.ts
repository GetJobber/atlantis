import { EmailMatch, Match, PhoneMatch } from "autolinker";
import { Linking } from "react-native";
import { copyTextToClipboard } from "./clipboard";
import { I18nKeys, useAtlantisI18nValue } from "../hooks/useAtlantisI18n";

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
  t: useAtlantisI18nValue["t"],
): void {
  const linkUrl = getUrl(match, false);

  const toastConfig = {
    message: t(getMessageKey(match)),
    bottomTabsVisible,
  };
  copyTextToClipboard(linkUrl, toastConfig);
}

export function onPressLink(match: Match): void {
  const linkUrl = getUrl(match);
  Linking.openURL(linkUrl);
}

function getMessageKey(match: Match): I18nKeys {
  switch (match.getType()) {
    case "email":
      return "AutoLink.emailCopied";
    case "phone":
      return "AutoLink.phoneCopied";
    default:
      return "AutoLink.urlCopied";
  }
}
