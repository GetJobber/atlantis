import { useEffect, useRef } from "react";
import { useCallbackRef } from "../useCallbackRef";

/**
 * A custom hook that will call the provided function only once when the component mounts. Useful for emitting
 * analytics tracking events on component mount.
 */
export const useOnMount = (fn: () => void) => {
  const mountedRef = useRef<boolean>(false);
  const callback = useCallbackRef(fn);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      callback();
    }
  }, [callback]);
};
