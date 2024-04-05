import { FormFieldProps } from "../FormFieldTypes";

interface UseToolBarProps {
  focused: boolean;
  toolbarVisibility: FormFieldProps["toolbarVisibility"];
}

interface UseToolbar {
  isToolbarVisible: boolean;
  animationInitial: boolean | { opacity: number; height: number };
}

export function useToolbar(props: UseToolBarProps): UseToolbar {
  const isToolbarVisible =
    toolbar && (props.toolbarVisibility === "always" || props.focused);
  const animationInitial =
    props.toolbarVisibility === "always" ? false : { opacity: 0, height: 0 };

  return {
    isToolbarVisible,
    animationInitial,
  };
}
