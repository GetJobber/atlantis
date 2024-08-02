import TimingTokens from "../../tokens/timing.tokens.json" assert { type: "json" };
import OpacityTokens from "../../tokens/opacity.tokens.json" assert { type: "json" };
import ElevationTokens from "../../tokens/elevation.tokens.json" assert { type: "json" };
import BaseColourTokens from "../../tokens/baseColor.tokens.json" assert { type: "json" };
import ColourTokens from "../../tokens/color.tokens.json" assert { type: "json" };
import SemanticColourTokens from "../../tokens/semanticColor.tokens.json" assert { type: "json" };
import WorkflowTokens from "../../tokens/workflow.tokens.json" assert { type: "json" };
import TypographyTokens from "../../tokens/typography.tokens.json" assert { type: "json" };
import RadiusTokens from "../../tokens/radius.tokens.json" assert { type: "json" };
import BorderTokens from "../../tokens/border.tokens.json" assert { type: "json" };
import SpaceTokens from "../../tokens/space.tokens.json" assert { type: "json" };
import ShadowTokens from "../../tokens/shadow.tokens.json" assert { type: "json" };
import DarkTokens from "../../tokens/dark.tokens.json" assert { type: "json" };
import DarkElevatedTokens from "../../tokens/darkElevated.tokens.json" assert { type: "json" };

export const tokenMap = {
  color: ColourTokens,
  "semantic-color": SemanticColourTokens,
  workflow: WorkflowTokens,
  radius: RadiusTokens,
  space: SpaceTokens,
  shadow: ShadowTokens,
  timing: TimingTokens,
  opacity: OpacityTokens,
  elevation: ElevationTokens,
  typography: TypographyTokens,
  border: BorderTokens,
  "base-color": BaseColourTokens,
  dark: DarkTokens,
  "dark-elevated": DarkElevatedTokens,
};

export type TokenTypes = keyof typeof tokenMap;

export const CompleteTokenList = [
  BorderTokens,
  BaseColourTokens,
  ColourTokens,
  SemanticColourTokens,
  WorkflowTokens,
  RadiusTokens,
  SpaceTokens,
  ShadowTokens,
  TimingTokens,
  OpacityTokens,
  ElevationTokens,
  TypographyTokens,
];
