export type TokenType =
  | "dimension"
  | "number"
  | "color"
  | "fontFamily"
  | "percentage"
  | "duration";
export type TransformValue = string | object | number;

export type TokenTree = Record<
  string,
  string | { $value: string } | object | number
>;
export interface OverrideTokenTree {
  platformOverrides: Record<"ios" | "android", TokenTree>;
}
export type Token = string | object | number;
export type Tokens = Record<string, Token>;
export type ParsedTokenValue = string | number;
export type ParsedTokens = Record<string, ParsedTokenValue>;
