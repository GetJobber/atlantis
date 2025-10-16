import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Modalize } from "react-native-modalize";
import type { IHandles } from "react-native-modalize/lib/options";

type Props = React.ComponentProps<typeof Modalize>;

// DON'T USE THIS COMPONENT DIRECTLY.
// It exists only so that the deprecated ContentOverlay component can use this along with the
// newer one contained in this lib.
// This is a temporary solution for new architecture. JOB-137549 plans to replace modalize entirely.
export const UNSAFE_WrappedModalize = forwardRef<IHandles, Props>(
  (props, ref) => {
    const innerRef = useRef<IHandles | null>(null);
    const [openRenderId, setOpenRenderId] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        open(dest) {
          setOpenRenderId(id => id + 1);
          // Open on a fresh tick for additional safety
          requestAnimationFrame(() => {
            innerRef.current?.open(dest);
          });
        },
        close(dest) {
          innerRef.current?.close(dest);
        },
      }),
      [],
    );

    // Use a unique key to force a remount, ensuring we get fresh gesture handler nodes within modalize
    return (
      <Modalize key={`modalize-${openRenderId}`} ref={innerRef} {...props} />
    );
  },
);

UNSAFE_WrappedModalize.displayName = "UNSAFE_WrappedModalize";
