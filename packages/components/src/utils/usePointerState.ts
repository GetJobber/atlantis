import { useEffect, useRef } from "react";

type PointerEventCallback = (evt: PointerEvent) => void;

const subscribers = new Set<PointerEventCallback>();
let globalPointerDown = false;

function initPointerEvents() {
  function handlePointerDown() {
    globalPointerDown = true;
  }

  function handlePointerUp(evt: PointerEvent) {
    globalPointerDown = false;
    subscribers.forEach(callback => callback(evt));
  }

  if (globalThis.document) {
    const eventOptions: AddEventListenerOptions = { capture: true };
    const { addEventListener } = globalThis.document;
    addEventListener("pointerdown", handlePointerDown, eventOptions);
    addEventListener("pointerup", handlePointerUp, eventOptions);
  }
}

initPointerEvents();

export function usePointerState() {
  const onPointerUpRef = useRef<PointerEventCallback[]>([]);

  useEffect(() => {
    const handler = (evt: PointerEvent) => {
      onPointerUpRef.current.forEach(cb => cb(evt));
      onPointerUpRef.current = [];
    };

    subscribers.add(handler);

    return () => {
      subscribers.delete(handler);
    };
  }, []);

  return {
    /**
     * Whether the pointer is currently down.
     */
    isPointerDown() {
      return globalPointerDown;
    },
    /**
     * Add a callback to be called when the pointerup event fires.
     */
    onPointerUp: (cb: PointerEventCallback) => {
      onPointerUpRef.current.push(cb);
    },
  };
}
