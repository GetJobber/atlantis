import { useState } from "react";
import { v1 } from "react-native-uuid";

export function useTokenGenerator(): [() => string, RegExp] {
  let counter = 0;
  const [identifier] = useState(v1());
  return [
    () => `@__ELEMENT-${identifier}-${counter++}__@`,
    new RegExp(`(@__ELEMENT-${identifier}-\\d+__@)`, "g"),
  ];
}
