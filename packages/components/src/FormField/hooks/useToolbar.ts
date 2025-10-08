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
    maxHeight: number;
    overflow: string;
  };
  toolbarAnimationStart: {
    opacity: number;
    maxHeight: string;
    overflow: string;
  };
}

export function useToolbar(props: UseToolBarProps): UseToolbar {
  const isToolbarVisible =
    props.toolbar !== undefined &&
    (props.toolbarVisibility === "always" || props.focused);
  const toolbarAnimationEnd = {
    opacity: 0,
    maxHeight: 0,
    overflow: "hidden",
  };
  const toolbarAnimationStart = {
    opacity: 1,
    maxHeight: "200px", // Set a reasonable max height
    overflow: "hidden",
  };

  return {
    isToolbarVisible,
    toolbarAnimationEnd,
    toolbarAnimationStart,
  };
}
