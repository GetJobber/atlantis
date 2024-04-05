import { FormFieldProps } from "../FormFieldTypes";

interface UseToolBarProps {
  focused: boolean;
  toolbar: React.ReactNode;
  toolbarVisibility: FormFieldProps["toolbarVisibility"];
}

interface UseToolbar {
  isToolbarVisible: boolean;
  animationInitial: boolean | { opacity: number; height: number };
}

export function useToolbar(props: UseToolBarProps): UseToolbar {
  const isToolbarVisible =
    props.toolbar !== undefined &&
    (props.toolbarVisibility === "always" || props.focused);
  const animationInitial =
    props.toolbarVisibility === "always" ? false : { opacity: 0, height: 0 };

  return {
    isToolbarVisible,
    animationInitial,
  };
}
