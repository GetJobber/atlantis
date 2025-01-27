import { tokens } from "@jobber/design";

export type ButtonVariation = "work" | "cancel" | "destructive" | "learning";
export type ButtonType = "primary" | "secondary" | "tertiary";
export type ButtonSize = "small" | "base";
export type CommonButtonBorderColor = keyof typeof tokens;
