import type { FormFieldProps } from "../FormFieldTypes";

interface UseToolBarProps {
  focused: boolean;
  toolbar: React.ReactNode;
  toolbarVisibility: FormFieldProps["toolbarVisibility"];
}

interface UseToolbar {
  isToolbarVisible: boolean;
  toolbarAnimationEnd: { opacity: number; height: number };
  toolbarAnimationStart: { opacity: number; height: string | number };
}

export function useToolbar(props: UseToolBarProps): UseToolbar {
  const isToolbarVisible =
    props.toolbar !== undefined &&
    (props.toolbarVisibility === "always" || props.focused);
  const toolbarAnimationEnd = { opacity: 0, height: 0 };
  const toolbarAnimationStart = { opacity: 1, height: "auto" };

  return {
    isToolbarVisible,
    toolbarAnimationEnd,
    toolbarAnimationStart,
  };
}
