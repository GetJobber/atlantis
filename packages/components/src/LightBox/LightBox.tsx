import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useBreakpoints, useIsMounted } from "@jobber/hooks";
import classNames from "classnames";
import styles from "./LightBox.module.css";
import type { LightBoxNavigationProps, LightBoxProps } from "./LightBox.types";
import { imageTransition, slideVariants } from "./LightBox.constants";
import { LightBoxProvider, useLightBoxContext } from "./LightBoxContext";
import { ButtonDismiss } from "../ButtonDismiss";
import { Text } from "../Text";
import { Button } from "../Button";
import { Heading } from "../Heading";
import { AtlantisThemeContextProvider } from "../AtlantisThemeContext";

export function LightBoxContent() {
  const { open, lightboxRef, handleMouseMove } = useLightBoxContext();

  const mounted = useIsMounted();

  const template = (
    <>
      {open && (
        <div
          className={styles.lightboxWrapper}
          tabIndex={0}
          aria-label="Lightbox"
          key="Lightbox"
          ref={lightboxRef}
          onMouseMove={handleMouseMove}
        >
          <LightBoxBackground />
          <LightBoxOverlay />
          <LightBoxToolbar />
          <LightBoxSlides />
          <LightBoxNavigation />
          <LightBoxCaption />
          <LightBoxThumbnails />
        </div>
      )}
    </>
  );

  return mounted.current
    ? ReactDOM.createPortal(template, document.body)
    : template;
}

interface NavButtonProps {
  readonly onClick: () => void;
  readonly hideButton: boolean;
  readonly className: string;
}

function PreviousButton({ onClick, hideButton, className }: NavButtonProps) {
  const { mediumAndUp } = useBreakpoints();

  return (
    <div
      className={`${className} ${
        hideButton ? styles.buttonHidden : styles.buttonVisible
      }`}
    >
      <Button
        size={mediumAndUp ? "large" : "small"}
        variation="subtle"
        type="secondary"
        icon="arrowLeft"
        ariaLabel="Previous image"
        onClick={onClick}
      />
    </div>
  );
}

function NextButton({ onClick, hideButton, className }: NavButtonProps) {
  const { mediumAndUp } = useBreakpoints();

  return (
    <div
      className={`${className} ${
        hideButton ? styles.buttonHidden : styles.buttonVisible
      }`}
    >
      <Button
        size={mediumAndUp ? "large" : "small"}
        variation="subtle"
        type="secondary"
        icon="arrowRight"
        ariaLabel="Next image"
        onClick={onClick}
      />
    </div>
  );
}

/**
 * Blurred, desaturated copy of the current image rendered as a full-bleed
 * background behind the lightbox. Pass `className` to apply additional styles.
 */
export function LightBoxBackground({
  className,
}: {
  readonly className?: string;
}) {
  const { images, currentImageIndex } = useLightBoxContext();

  return (
    <div
      className={classNames(styles.backgroundImage, className)}
      style={{
        backgroundImage: `url("${images[currentImageIndex].url}")`,
      }}
    />
  );
}

/**
 * Semi-transparent blur backdrop. Clicking it calls `onRequestClose`.
 * Pass `className` to apply additional styles.
 */
export function LightBoxOverlay({
  className,
}: {
  readonly className?: string;
}) {
  const { handleRequestClose } = useLightBoxContext();

  return (
    <div
      className={classNames(styles.blurOverlay, className)}
      onClick={handleRequestClose}
    />
  );
}

/**
 * Top bar showing the current image counter (`1/3`) and a close button.
 * Styled for dark backgrounds.
 */
export function LightBoxToolbar() {
  const { images, currentImageIndex, handleRequestClose } =
    useLightBoxContext();

  return (
    <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
      <div className={styles.toolbar}>
        <div className={styles.slideNumber}>
          <Text>{`${currentImageIndex + 1}/${images.length}`}</Text>
        </div>
        <div className={styles.closeButton}>
          <ButtonDismiss ariaLabel="Close" onClick={handleRequestClose} />
        </div>
      </div>
    </AtlantisThemeContextProvider>
  );
}

/**
 * The animated hero image with swipe-to-navigate and slide animation.
 *
 * Pass `className` to add styles to the image wrapper. Supports
 * swipe-to-navigate (drag). Keyboard arrow navigation is handled by
 * `LightBox.Provider`.
 *
 * @example
 * ```tsx
 * <LightBox.Slides className={styles.imageArea} />
 * <LightBox.Navigation
 *   prevButtonClassName={styles.prev}
 *   nextButtonClassName={styles.next}
 * />
 * ```
 */
export function LightBoxSlides({ className }: { readonly className?: string }) {
  const { images, currentImageIndex, directionRef, handleOnDragEnd } =
    useLightBoxContext();

  return (
    <div className={classNames(styles.imageArea, className)}>
      <AnimatePresence initial={false}>
        <motion.img
          key={currentImageIndex}
          variants={slideVariants}
          src={images[currentImageIndex].url}
          custom={directionRef}
          className={styles.image}
          initial="enter"
          alt={
            images[currentImageIndex].alt ||
            images[currentImageIndex].title ||
            ""
          }
          animate="center"
          exit="exit"
          transition={imageTransition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleOnDragEnd}
        />
      </AnimatePresence>
    </div>
  );
}

/**
 * Previous and next navigation buttons. Returns `null` when the image set
 * has only one image.
 *
 * Use `prevButtonClassName` and `nextButtonClassName` to override the styles
 * on each button's wrapper for custom layouts.
 *
 * @example
 * ```tsx
 * <LightBox.Navigation
 *   prevButtonClassName={styles.prev}
 *   nextButtonClassName={styles.next}
 * />
 * ```
 */
export function LightBoxNavigation({
  prevButtonClassName,
  nextButtonClassName,
}: LightBoxNavigationProps) {
  const {
    images,
    mouseIsStationary,
    debouncedHandleNext,
    debouncedHandlePrevious,
  } = useLightBoxContext();

  if (images.length <= 1) return null;

  return (
    <>
      <PreviousButton
        onClick={debouncedHandlePrevious}
        hideButton={mouseIsStationary}
        className={classNames(styles.prev, prevButtonClassName)}
      />
      <NextButton
        onClick={debouncedHandleNext}
        hideButton={mouseIsStationary}
        className={classNames(styles.next, nextButtonClassName)}
      />
    </>
  );
}

/**
 * Title and caption text for the current image. Only renders when the current
 * image has a `title` or `caption`. Styled for dark backgrounds.
 */
export function LightBoxCaption() {
  const { images, currentImageIndex } = useLightBoxContext();
  const { title, caption } = images[currentImageIndex];

  if (!title && !caption) return null;

  return (
    <div className={styles.captionWrapper}>
      <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
        {title && (
          <div className={styles.title}>
            <Heading level={4}>{title}</Heading>
          </div>
        )}
        {caption && <Text size="large">{caption}</Text>}
      </AtlantisThemeContextProvider>
    </div>
  );
}

/**
 * Scrollable thumbnail strip. Only renders when there are two or more images.
 */
export function LightBoxThumbnails() {
  const {
    images,
    currentImageIndex,
    boxSizing,
    selectedThumbnailRef,
    handleThumbnailClick,
  } = useLightBoxContext();

  if (images.length <= 1) return null;

  return (
    <div
      className={styles.thumbnailBar}
      style={{ "--lightbox--box-sizing": boxSizing } as React.CSSProperties}
      data-testid="ATL-Thumbnail-Bar"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={classNames(styles.thumbnail, {
            [styles.selected]: index === currentImageIndex,
          })}
          onClick={() => handleThumbnailClick(index)}
          ref={index === currentImageIndex ? selectedThumbnailRef : null}
        >
          <img
            key={index}
            src={image.url}
            alt={image.alt || image.title || ""}
            className={styles.thumbnailImage}
          />
        </div>
      ))}
    </div>
  );
}

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
 * <LightBox.Provider
 *   open={true}
 *   images={images}
 *   imageIndex={activeIndex}
 *   onImageChange={onImageChange}
 * >
 *   <div className={styles.lightboxWrapper} onMouseMove={handleMouseMove}>
 *     <LightBox.Background className={styles.backgroundImage} />
 *     <LightBox.Overlay className={styles.blurOverlay} />
 *     <LightBox.Slides className={styles.imageArea} />
 *     <LightBox.Navigation
 *       prevButtonClassName={styles.prev}
 *       nextButtonClassName={styles.next}
 *     />
 *   </div>
 * </LightBox.Provider>
 * ```
 */
export function LightBox(props: LightBoxProps) {
  return (
    <LightBoxProvider {...props}>
      <LightBoxContent />
    </LightBoxProvider>
  );
}

LightBox.Provider = LightBoxProvider;
LightBox.Content = LightBoxContent;
LightBox.Background = LightBoxBackground;
LightBox.Overlay = LightBoxOverlay;
LightBox.Toolbar = LightBoxToolbar;
LightBox.Slides = LightBoxSlides;
LightBox.Navigation = LightBoxNavigation;
LightBox.Caption = LightBoxCaption;
LightBox.Thumbnails = LightBoxThumbnails;
