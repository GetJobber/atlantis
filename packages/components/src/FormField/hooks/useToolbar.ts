import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { FormFieldProps } from "../FormFieldTypes";

interface UseToolBarProps {
  focused: boolean;
  toolbar: React.ReactNode;
  toolbarVisibility: FormFieldProps["toolbarVisibility"];
}

interface UseToolbar {
  isToolbarVisible: boolean;
  toolbarAnimationEnd: {
    opacity: number;
    height?: number;
  };
  toolbarAnimationStart: {
    opacity: number;
    height?: string;
  };
}

export function useToolbar(props: UseToolBarProps): UseToolbar {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { isPointerDown, onPointerUp } = usePointerState();

  const isToolbarVisible =
    props.toolbar !== undefined &&
    (props.toolbarVisibility === "always" || visible);

  useEffect(() => {
    if (props.focused) {
      setVisible(true);
    } else if (isPointerDown) {
      onPointerUp(() => {
        setVisible(false);
      });
    } else {
      setVisible(false);
    }
  }, [props.focused]);
  const toolbarAnimationEnd = !shouldReduceMotion
    ? {
        opacity: 0,
        height: 0,
      }
    : { opacity: 0 };
  const toolbarAnimationStart = !shouldReduceMotion
    ? {
        opacity: 1,
        height: "auto",
      }
    : { opacity: 1 };

  return {
    isToolbarVisible,
    toolbarAnimationEnd,
    toolbarAnimationStart,
  };
}

type PointerEventCallback = (evt: PointerEvent) => undefined;

export function usePointerState() {
  const [pointerDown, setPointerDown] = useState(false);
  const onPointerUpRef = useRef<PointerEventCallback[]>([]);

  useEffect(() => {
    const handlePointerDown = () => {
      setPointerDown(true);
    };

    const handlePointerUp = (evt: PointerEvent) => {
      setPointerDown(false);
      onPointerUpRef.current.forEach(cb => cb(evt));
      onPointerUpRef.current = [];
    };

    // TODO: optimize this by using a single global event listener instead of N for N usePointerState instances
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return {
    /**
     * Whether the pointer is currently down
     */
    isPointerDown: pointerDown,
    /**
     * A callback to be called when the pointerup event fires.
     */
    onPointerUp: (cb: (evt: PointerEvent) => undefined) => {
      onPointerUpRef.current.push(cb);
    },
  };
}
