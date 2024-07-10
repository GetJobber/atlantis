import type { CSSProperties, PropsWithChildren } from "react";
import type { tokens } from "@jobber/design";

export interface BoxProps
  extends PropsWithChildren,
    Pick<
      CSSProperties,
      "position" | "justifyContent" | "alignItems" | "alignSelf" | "overflow"
    >,
    Partial<Pick<HTMLElement, "tabIndex">> {
  readonly as?: "div" | "span" | "section" | "article" | "aside" | "main";
  readonly background?: Colors;
  readonly border?: BorderWidth | BoxBorderWidth;
  readonly borderColor?: Colors;
  readonly direction?: CSSProperties["flexDirection"];
  readonly gap?: Sizes;
  readonly height?: BoxDimension;
  readonly margin?: Sizes | BoxSpace;
  readonly padding?: Sizes | BoxSpace;
  readonly preserveWhiteSpace?: boolean;
  readonly radius?: Radii;
  readonly width?: BoxDimension;
}

type TokensType = keyof typeof tokens;

type Prefixes = TokensType extends `${infer Prefix}-${string}` ? Prefix : never;
type ExtractTokens<T extends string> = Extract<TokensType, `${T}-${string}`>;
type Tokenize<T extends Prefixes> =
  ExtractTokens<T> extends `${T}-${infer Value}` ? Value : never;

export type Sizes = Tokenize<"space">;
export type Radii = Tokenize<"radius">;
export type Colors = Tokenize<"color">;
export type BorderWidth = Tokenize<"border">;

interface BoxSpace {
  readonly bottom?: Sizes;
  readonly horizontal?: Sizes;
  readonly left?: Sizes;
  readonly right?: Sizes;
  readonly top?: Sizes;
  readonly vertical?: Sizes;
}

export type BoxDimension = number | `${string}%` | "auto" | "shrink" | "grow";

interface BoxBorderWidth {
  readonly bottom?: BorderWidth;
  readonly left?: BorderWidth;
  readonly right?: BorderWidth;
  readonly top?: BorderWidth;
}
