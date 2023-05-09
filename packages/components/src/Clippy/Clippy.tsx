import React, {
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";
import { Sammy } from "./components";
import { ClippyRef, Mood } from "./types";
import { Popover } from "../Popover";

const AnimatedTextWord = ({ text }: { text: string }) => {
  const words = text.split(" ");

  // Variants for Container of words.
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each word.

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      style={{
        width: "auto",
        padding: "var(--base-unit)",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{
            marginRight: "5px",
            // overflowWrap: "break-word",
          }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export interface ClippyProps {
  /**
   * Element the Popover will attach to and point at. A `useRef` must be attached to an html element
   * and passed as an attachTo prop in order for the Popover to function properly
   */
  readonly attachTo: Element | React.RefObject<Element | null>;

  /**
   * Control Popover visibility.
   */
  readonly open: boolean;

  /**
   * Callback executed when the user wants to close/dismiss the Popover
   */
  readonly onRequestClose?: () => void;

  /**
   * Describes the preferred placement of the Popover.
   * @default 'auto'
   */
  readonly preferredPlacement?: "top" | "bottom" | "left" | "right" | "auto";

  /**
   * Describes how much Sammy will pester the SP.
   * @default 'base'
   */

  readonly pesteringLevel?: "none" | "low" | "base" | "high";

  /**
   * Set if Clippy is Angry by default
   * @default 'calm'
   */
  readonly defaultMood?: Mood;

  readonly dialog?: string;

  readonly onLazer?: () => void;
  readonly onCalm?: () => void;
  readonly onCool?: () => void;

  ref?: Ref<ClippyRef>;
}

export const Clippy = forwardRef(InternalClippy);

function InternalClippy(
  {
    onRequestClose,
    attachTo,
    open,
    preferredPlacement = "auto",
    defaultMood = "calm",
    dialog,
    onLazer,
    onCalm,
    onCool,
  }: ClippyProps,
  ref: Ref<ClippyRef>,
) {
  const [mood, setMood] = useState(defaultMood);

  useImperativeHandle(
    ref,
    () => ({
      makeLazer: () => setMood("lazer"),
      makeCalm: () => setMood("calm"),
      makeCool: () => setMood("cool"),
      mood,
    }),
    [open],
  );
  const content = useMemo(() => {
    return dialog ? <AnimatedTextWord text={dialog} /> : undefined;
  }, [dialog]);

  return (
    <>
      <Popover
        attachTo={attachTo}
        open={open}
        onRequestClose={onRequestClose}
        preferredPlacement={preferredPlacement}
      >
        <Sammy mood={mood} />
        {content}
      </Popover>
    </>
  );
}
