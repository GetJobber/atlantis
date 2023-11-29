import { ReactNode } from "react";
import { Modalize } from "react-native-modalize";

export interface ContentOverlayProps {
  /**
   * Content to be passed into the overlay
   */
  readonly children: ReactNode;
  /**
   * Title of overlay, appears in the header next to the close button.
   */
  readonly title: string;
  /**
   * Optional accessibilityLabel describing the overlay.
   * This will read out when the overlay is opened.
   * @default "Close {title} modal"
   */
  readonly accessibilityLabel?: string;
  /**
   * Force overlay height to fill the screen.
   * Width not impacted.
   * @default false
   */
  readonly fullScreen?: boolean;
  /**
   * Display the dismiss button in the header of the overlay.
   * @default false
   */
  readonly showDismiss?: boolean;
  /**
   * If false, hides the handle and turns off dragging.
   * @default true
   */
  readonly isDraggable?: boolean;
  /**
   * If true, automatically adjusts the overlay height to the content height.
   * This will disable the ability to drag the overlay to fullscreen when
   * `isDraggable` is true.
   * @default false
   */
  readonly adjustToContentHeight?: boolean;
  /**
   * Allows taps to be registered behind keyboard if enabled
   * @default false
   */
  readonly keyboardShouldPersistTaps?: boolean;
  /**
   * Enables scrolling in the content body of overlay
   */
  readonly scrollEnabled?: boolean;
  /**
   * Set the background color of the modal window
   * @default "surface"
   */
  readonly modalBackgroundColor?: ModalBackgroundColor;
  /**
   * Callback that is called when the overlay is closed.
   */
  readonly onClose?: () => void;
  /**
   * Callback that is called when the overlay is opened.
   */
  readonly onOpen?: () => void;

  /**
   * Callback that is called between overlay is closed and when the "x" button is pressed
   */
  readonly onBeforeExit?: () => void;

  /**
   * Define the behavior of the keyboard when having inputs inside the modal.
   * @default padding
   */
  readonly keyboardAvoidingBehavior?: "height" | "padding" | "position";

  /**
   * Boolean to show a disabled state
   * @default false
   */
  readonly loading?: boolean;

  /**
   * Define keyboard's Android behavior like iOS's one.
   * @default Platform.select({ ios: true, android: false })
   */
  readonly avoidKeyboardLikeIOS?: boolean;
}

export type ModalBackgroundColor = "surface" | "background";

export type ContentOverlayRef =
  | {
      open?: Modalize["open"];
      close?: Modalize["close"];
    }
  | undefined;
