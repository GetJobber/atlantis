import Autolinker, { Match } from "autolinker";
import { useTokenGenerator } from "./useTokenGenerator";
import { shouldIgnoreURL } from "../utils";

export function useCreateLinkedText({
  text = "",
  email = true,
  phone = true,
  urls = true,
}) {
  const [generateToken, tokenRegexp] = useTokenGenerator();

  const matches: { [token: string]: Match } = {};

  const linkedText = Autolinker.link(text, {
    email,
    phone,
    urls,
    replaceFn: match => {
      if (shouldIgnoreURL(text, match)) return false;

      const token = generateToken();
      matches[token] = match;
      return token;
    },
  });

  const splitText = splitLinkedText(linkedText, tokenRegexp);

  return { splitText, matches };
}

function splitLinkedText(linkedText: string, tokenRegexp: RegExp): string[] {
  return linkedText.split(tokenRegexp).filter(part => Boolean(part));
}
