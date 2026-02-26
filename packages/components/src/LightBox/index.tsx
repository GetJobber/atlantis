import React from "react";
import {
  LightBoxBackground,
  LightBoxCaption,
  LightBoxContent,
  LightBoxNavigation,
  LightBoxOverlay,
  LightBoxSlides,
  LightBoxThumbnails,
  LightBoxToolbar,
} from "./LightBox";
import type { LightBoxProps } from "./LightBox";
import { LightBoxProvider } from "./LightBoxContext";

export type { LightBoxProps } from "./LightBox";
export type { LightBoxProviderProps, PresentedImage } from "./LightBoxContext";
export { useLightBoxContext } from "./LightBoxContext";

/**
 * LightBox displays images in a fullscreen overlay.
 *
 * **Self-contained (legacy) usage:**
 * ```tsx
 * <LightBox
 *   open={isOpen}
 *   images={images}
 *   imageIndex={imageIndex}
 *   onRequestClose={({ lastPosition }) => { setIsOpen(false); }}
 * />
 * ```
 *
 * **Full composable (fullscreen) usage:**
 * ```tsx
 * <LightBox.Provider open={isOpen} images={images} onRequestClose={onClose}>
 *   <LightBox.Content />
 * </LightBox.Provider>
 * ```
 *
 * **Inline gallery usage (no overlay, no close):**
 * ```tsx
 * <LightBox.Provider images={images}>
 *   <div style={{ position: "relative", height: 400 }}>
 *     <LightBox.Slides />
 *     <LightBox.Navigation />
 *   </div>
 *   <LightBox.Thumbnails />
 * </LightBox.Provider>
 * ```
 */
function LightBox(props: LightBoxProps) {
  return (
    <LightBoxProvider {...props}>
      <LightBoxContent />
    </LightBoxProvider>
  );
}

LightBox.Provider = LightBoxProvider;
LightBox.Background = LightBoxBackground;
LightBox.Overlay = LightBoxOverlay;
LightBox.Toolbar = LightBoxToolbar;
LightBox.Slides = LightBoxSlides;
LightBox.Navigation = LightBoxNavigation;
LightBox.Caption = LightBoxCaption;
LightBox.Thumbnails = LightBoxThumbnails;

export { LightBox };
