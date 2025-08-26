import styles from "./Popover.module.css";

export const usePopoverStyles = () => {
  return {
    container: styles.popover,
    dismissButton: styles.dismissButton,
    arrow: styles.arrow,
  };
};
