import { useEffect, useState } from "react";

export function usePreviousValue<T>(value: T) {
  const [previousValue, setPreviousValue] = useState<T>(value);

  useEffect(() => {
    setPreviousValue(value);
  }, [value]);

  return [previousValue, setPreviousValue] as const;
}
