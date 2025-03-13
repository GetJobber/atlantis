import React, { PropsWithChildren, createContext, useContext } from "react";
import { ButtonSize } from "./Button.types";

interface ButtonContextProps {
  size: ButtonSize;
}

const ButtonContext = createContext<ButtonContextProps>({
  size: "base",
});

export function ButtonProvider({
  children,
  size = "base",
}: PropsWithChildren<{
  readonly size?: ButtonSize;
}>) {
  return (
    <ButtonContext.Provider value={{ size }}>{children}</ButtonContext.Provider>
  );
}

export function useButton() {
  return useContext(ButtonContext);
}
