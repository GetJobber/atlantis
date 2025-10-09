import { useEffect, useRef } from "react";

type PointerEventCallback = (evt: PointerEvent) => undefined;

export function usePointerState() {
  const pointerStateRef = useRef(false);
  const onPointerUpRef = useRef<PointerEventCallback[]>([]);

  useEffect(() => {
    const handlePointerDown = () => {
      pointerStateRef.current = true;
    };

    const handlePointerUp = (evt: PointerEvent) => {
      pointerStateRef.current = false;
      onPointerUpRef.current.forEach(cb => cb(evt));
      onPointerUpRef.current = [];
    };

    const options: AddEventListenerOptions = {
      capture: true,
    };

    // TODO: optimize this by using a single global event listener instead of N for N usePointerState instances
    document.addEventListener("pointerdown", handlePointerDown, options);
    document.addEventListener("pointerup", handlePointerUp, options);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, options);
      document.removeEventListener("pointerup", handlePointerUp, options);
    };
  }, []);

  return {
    /**
     * Whether the pointer is currently down.
     */
    isPointerDown() {
      return pointerStateRef.current;
    },
    /**
     * Add a callback to be called when the pointerup event fires.
     */
    onPointerUp: (cb: (evt: PointerEvent) => undefined) => {
      onPointerUpRef.current.push(cb);
    },
  };
}
