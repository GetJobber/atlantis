import React, {
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { AnimatedTextWord, SpamPillar } from "./components";
import { ClippyRef, Mood } from "./types";
import { Popover } from "../Popover";

interface BaseAssistant {
  mood?: Mood;
}
export interface ClippyProps<T extends BaseAssistant = BaseAssistant> {
  /**
   * Element the Popover will attach to and point at. A `useRef` must be attached to an html element
   * and passed as an attachTo prop in order for the Popover to function properly
   */
  readonly attachTo: Element | React.RefObject<Element | null>;

  /** The virtual assistant to use
   * @default SpamPillar
   */
  readonly virtualAssistant?: () => React.ReactElement<T>;

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
   * Set if Clippy is Angry by default
   * @default 'calm'
   */
  readonly defaultMood?: Mood;

  /**
   * What the virtual assistant is saying!
   */
  readonly dialog?: string;

  ref?: Ref<ClippyRef>;
}

export const Clippy = forwardRef(InternalClippy);

function InternalClippy<T extends BaseAssistant = BaseAssistant>(
  {
    onRequestClose,
    attachTo,
    open,
    preferredPlacement = "auto",
    defaultMood = "calm",
    dialog,
    virtualAssistant,
  }: ClippyProps<T>,
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
  const Assistant = virtualAssistant ?? SpamPillar;
  return (
    <Popover
      attachTo={attachTo}
      open={open}
      onRequestClose={onRequestClose}
      preferredPlacement={preferredPlacement}
    >
      <Assistant mood={mood} />
      {content}
    </Popover>
  );
}
