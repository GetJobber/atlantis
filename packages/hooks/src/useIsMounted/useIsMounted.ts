import { useRef } from "react";
import { useSafeLayoutEffect } from "../useSafeLayoutEffect";

/**
 * If you are using this hook in order to only perform an action once after mounting (for example sending
 * analytics events), use `useOnMount` instead
 *
 * Why does this work?
 *
 * The following is from the react docs:
 *    [The return function from `useLayoutEffect`] is the optional cleanup mechanism for effects.
 *    Every effect may return a function that cleans up after it.
 *
 *    When exactly does React clean up an effect? React performs the cleanup when the component unmounts.
 *    The cleanup for useLayoutEffect is called after component unmounts and before before browser painting
 *    the screen
 *
 * What does that mean for us? When this hook is initially loaded, we then trigger a `useLayoutEffect` that
 * sets the isMounted to true right after the component is mounted.
 * When the component unmounts, it calls the cleanup function that sets `isMounted` to false.
 * This `useLayoutEffect` hook will only be run once.
 */
export function useIsMounted(): { current: boolean } {
  const isMounted = useRef(false);

  useSafeLayoutEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
