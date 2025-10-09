import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePointerState } from "@jobber/components/utils/usePointerState";
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
    } else if (isPointerDown()) {
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
