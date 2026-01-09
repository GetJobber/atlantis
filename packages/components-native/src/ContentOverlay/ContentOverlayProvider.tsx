import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

interface ContentOverlayProviderProps {
  readonly children: React.ReactNode;
}

export function ContentOverlayProvider({
  children,
}: ContentOverlayProviderProps) {
  return <BottomSheetModalProvider>{children}</BottomSheetModalProvider>;
}
