import { useEffect, useRef } from "react";

export function usePreviousValue(value: number) {
  const ref = useRef<number>(0);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
