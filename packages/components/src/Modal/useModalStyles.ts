import classnames from "classnames";
import styles from "./Modal.module.css";
import sizes from "./ModalSizes.module.css";

export function useModalStyles(size?: keyof typeof sizes) {
  return {
    modal: classnames(styles.modal, size && sizes[size]),
    overlay: styles.overlay,
    container: styles.container,
  };
}
