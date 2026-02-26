import type { CSSProperties } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useBreakpoints, useIsMounted } from "@jobber/hooks";
import classNames from "classnames";
import styles from "./LightBox.module.css";
import type { PresentedImage, RequestCloseOptions } from "./LightBoxContext";
import { useLightBoxContext } from "./LightBoxContext";
import { ButtonDismiss } from "../ButtonDismiss";
import { Text } from "../Text";
import { Button } from "../Button";
import { Heading } from "../Heading";
import { AtlantisThemeContextProvider } from "../AtlantisThemeContext";

export type { PresentedImage, RequestCloseOptions };

export interface LightBoxProps {
  /**
   * Specify if the Lightbox is open or closed.
   */
  readonly open: boolean;
  /**
   * Images is an array of objects defining a LightBox image. This object consists of
   * `title`, `caption`, `alt` and `url`. `title`, `alt` and `caption` are optional, `url` is
   * required, for each image.
   */
  readonly images: PresentedImage[];
  /**
   * Use this to specify which image in `images` to initialize the lightbox with.
   * This is useful when you have a collection of thumbnails as you only need one
   * collection of image urls, order doesn't matter.
   */
  readonly imageIndex?: number;
  /**
   * This function must set open to false in order to close the lightbox. Note there
   * is a 300ms easing animation on lightbox close that occurs before this function
   * is called.
   * This function receives an object as an argument with the key `lastPosition`
   * that has the index of the image the user was on when LightBox was closed.
   */
  onRequestClose(options: RequestCloseOptions): void;
  /**
   * Sets the box-sizing for the thumbnails in the lightbox. This is a solution for a problem where
   * tailwind was setting the box-sizing to `border-box` and causing issues with the lightbox.
   * @default "content-box"
   */
  readonly boxSizing?: CSSProperties["boxSizing"];
}

export const slideVariants = {
  enter: (directionRef: React.RefObject<number>) => ({
    x: directionRef.current > 0 ? "150%" : "-150%",
  }),
  center: {
    x: 0,
  },
  exit: (directionRef: React.RefObject<number>) => ({
    x: directionRef.current < 0 ? "150%" : "-150%",
  }),
};

const imageTransition = {
  x: { duration: 0.65, ease: [0.42, 0, 0, 1.03] },
};

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
 * background behind the lightbox.
 */
export function LightBoxBackground() {
  const { images, currentImageIndex } = useLightBoxContext();

  return (
    <div
      className={styles.backgroundImage}
      style={{
        backgroundImage: `url("${images[currentImageIndex].url}")`,
      }}
    />
  );
}

/**
 * Semi-transparent blur backdrop. Clicking it calls `onRequestClose`.
 */
export function LightBoxOverlay() {
  const { handleRequestClose } = useLightBoxContext();

  return <div className={styles.blurOverlay} onClick={handleRequestClose} />;
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
 * Pass a `className` to override the wrapper styles (e.g. to use
 * `styles.imageArea` inside `LightBox.Content`).
 *
 * Supports swipe-to-navigate (drag). Keyboard arrow navigation is handled
 * by `LightBox.Provider`.
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
    <div className={className ?? styles.imageArea}>
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

export interface LightBoxNavigationProps {
  /**
   * The class name to apply to the previous button.
   */
  readonly prevButtonClassName?: string;
  /**
   * The class name to apply to the next button.
   */
  readonly nextButtonClassName?: string;
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
        className={prevButtonClassName ?? styles.prev}
      />
      <NextButton
        onClick={debouncedHandleNext}
        hideButton={mouseIsStationary}
        className={nextButtonClassName ?? styles.next}
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
