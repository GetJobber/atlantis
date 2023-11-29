import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

export function useViewLayoutHeight(): {
  readonly handleLayout: ({ nativeEvent }: LayoutChangeEvent) => void;
  readonly height: number;
  readonly heightKnown: boolean;
} {
  const [heightKnown, setHeightKnown] = useState(false);
  const [height, setHeight] = useState(0);

  const handleLayout = ({ nativeEvent }: LayoutChangeEvent): void => {
    setHeightKnown(true);
    setHeight(nativeEvent.layout.height);
  };

  return { handleLayout, height, heightKnown } as const;
}
